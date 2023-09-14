import { Admin, Manager, PrismaClient, User } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import cookie, { serialize } from "cookie";
import { jwtGetToken, jwtSign, jwtVerify } from "../utils/jwt";

export const adminRouter = express.Router();
const prisma = new PrismaClient();

// 관리자 생성
adminRouter.post("/", async (req, res) => {
  console.log("/admin, POST");
  const reqData = req.body;
  const salt = await bcrypt.genSalt();

  // TODO : 관리자 회원가입, 유효성 검사 필요

  try {
    const admin: Admin = await prisma.admin.create({
      data: {
        ...reqData,
        password: bcrypt.hashSync(reqData.password, salt),
      },
    });

    return res.status(200).json({
      msg: "관리자 회원가입 완료",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 회원가입 오류",
      error: error,
    });
  }
});

// 관리자 로그인
adminRouter.post("/login", async (req, res) => {
  console.log("/admin/login, POST");
  const reqData = req.body;

  // TODO : 관리자 로그인, 유효성 검사 필요

  try {
    const admin: Admin | null = await prisma.admin.findUnique({
      where: { account: reqData.account },
    });

    if (admin && bcrypt.compareSync(reqData.password, admin.password)) {
      // 토큰 발행
      const token: string = await jwtSign(admin);

      if (token === "error") {
        return res.status(400).json({
          msg: "관리자 토큰 발행 오류",
        });
      }

      // 쿠키 첨부
      await res.setHeader(
        "Set-Cookie",
        cookie.serialize("admin", token, {
          maxAge: 6 * 60 * 60,
          path: "/",
          sameSite: "lax",
        }),
      );

      return res.status(200).json({
        msg: "관리자 로그인 성공",
        data: [admin, token],
      });
    } else {
      // 이메일 또는 비밀번호가 틀림
      return res.status(400).json({
        msg: "관리자 로그인 오류",
        error: "이메일 또는 비밀번호가 틀림",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 로그인 오류",
      error: error,
    });
  }
});

// 관리자 로그아웃
adminRouter.post("/logout", async (req, res) => {
  console.log("/admin/logout, POST");
  const cookie: string = await new Promise((resolve, reject) => {
    const value = serialize("admin", "", {
      maxAge: -1,
      path: "/",
    });
    resolve(value);
  });

  await res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({
    msg: "관리자 로그아웃 완료",
  });
});

// 관리자 정보 조회
adminRouter.get("/me", async (req, res) => {
  console.log("/admin/me, GET");

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "관리자 정보 조회 오류 : 토큰 찾기 실패",
      error: "관리자 정보 조회 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const adminToken: any = await jwtVerify(token);

  if (adminToken === "error") {
    return res.status(400).json({
      msg: "관리자 토큰 인증 오류",
    });
  }

  if (!adminToken.id || !adminToken.account) {
    return res.status(400).json({
      msg: "관리자 정보 조회 오류 : 토큰 인증 실패",
      error: "관리자 정보 조회 오류 : 토큰 인증 실패",
    });
  }
  try {
    const admin: Admin | null = await prisma.admin.findUnique({
      where: {
        account: adminToken.account,
      },
    });

    return res.status(200).json({
      msg: "관리자 정보 조회 완료",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 정보 조회 오류",
      error: error,
    });
  }
});

// 관리자 목록 조회
adminRouter.get("/", async (req, res) => {
  console.log("/admin, GET");

  // TODO : 관리자 목록 조회, 관리자 권한 인증 필요
  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const admin: [number, Admin[]] = await prisma.$transaction([
      prisma.admin.count({
        where: {
          ...(query["business-name"] && {
            businessName: {
              contains: query["business-name"],
            },
          }),
          ...(query["city-name"] && {
            city: {
              is: {
                name: query["city-name"],
              },
            },
          }),
        },
      }),
      prisma.admin.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        orderBy: {
          createDate: "desc",
        },
        where: {
          ...(query["business-name"] && {
            businessName: {
              contains: query["business-name"],
            },
          }),
          ...(query["city-name"] && {
            city: {
              is: {
                name: query["city-name"],
              },
            },
          }),
        },
      }),
    ]);
    return res.status(200).json({
      msg: "관리자 목록 조회 완료",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 목록 조회 오류",
      error: error,
    });
  }
});

// 사용자 업데이트
adminRouter.patch("/user/:userId", async (req, res) => {
  console.log("/admin/user/:userId, PATCH");

  const userId = req.params.userId;
  const reqData = req.body;
  const salt = await bcrypt.genSalt();

  try {
    const userLog = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        managerId: true,
      },
    });
    const user: User | null = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        ...reqData,
        ...(reqData.password && {
          password: bcrypt.hashSync(reqData.password, salt),
        }),
      },
    });

    if (userLog && userLog.managerId !== user.managerId) {
      prisma.invoiceUserLog.deleteMany({
        where: {
          userId: Number(userId),
        },
      });
    }

    return res.status(200).json({
      msg: "사용자 업데이트 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "사용자 업데이트 오류",
      error: error,
    });
  }
});

// 매니저 업데이트
adminRouter.patch("/manager/:managerId", async (req, res) => {
  console.log("/admin/manager/:managerId, PATCH");

  const managerId = req.params.managerId;
  const reqData = req.body;
  const salt = await bcrypt.genSalt();

  try {
    const manager: Manager | null = await prisma.manager.update({
      where: {
        id: Number(managerId),
      },
      data: {
        ...reqData,
        ...(reqData.password && {
          password: bcrypt.hashSync(reqData.password, salt),
        }),
      },
    });
    return res.status(200).json({
      msg: "매니저 업데이트 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "매니저 업데이트 오류",
      error: error,
    });
  }
});

// 관리자 조회
adminRouter.get("/:account", async (req, res) => {
  console.log("/admin/:account, GET");

  // TODO : 관리자 조회, 관리자 권한 인증 필요
  const account = req.params.account;

  try {
    const admin: Admin | null = await prisma.admin.findUnique({
      where: {
        account: account,
      },
    });
    return res.status(200).json({
      msg: "관리자 조회 완료",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 조회 오류",
      error: error,
    });
  }
});

// 관리자 업데이트
adminRouter.patch("/:account", async (req, res) => {
  console.log("/admin/:account, PATCH");
  // TODO : 관리자 업데이트, 관리자 권한에 따라 분기 필요

  const account = req.params.account;
  const reqData = req.body;
  const salt = await bcrypt.genSalt();

  try {
    const admin: Admin = await prisma.admin.update({
      where: {
        account: account,
      },
      data: {
        ...reqData,
        ...(reqData.password && {
          password: bcrypt.hashSync(reqData.password, salt),
        }),
      },
    });

    return res.status(200).json({
      msg: "관리자 업데이트 완료",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 업데이트 오류",
      error: error,
    });
  }
});

// 관리자 삭제
// TODO : 아카이브로 변경 예정
adminRouter.delete("/:account", async (req, res) => {
  console.log("/admin/:account, DELETE");
  // TODO : 관리자 삭제, 관리자 권한에 따라 분기 필요

  const account = req.params.account;

  try {
    const admin: Admin = await prisma.admin.delete({
      where: {
        account: account,
      },
    });

    return res.status(200).json({
      msg: "관리자 삭제 완료",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 삭제 오류",
      error: error,
    });
  }
});
