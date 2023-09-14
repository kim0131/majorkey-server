import { Manager, PrismaClient, User } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import cookie, { serialize } from "cookie";
import { jwtGetToken, jwtSign, jwtVerify } from "../utils/jwt";
import {
  ManagerCreate,
  ManagerLogin,
  ManagerUpdate,
} from "../interfaces/manager";

export const managerRouter = express.Router();
const prisma = new PrismaClient();

// 매니저 생성
managerRouter.post("/", async (req, res) => {
  console.log("/manager, POST");
  const reqData: ManagerCreate = req.body;
  const salt = await bcrypt.genSalt();

  // TODO : 매니저 회원가입, 유효성 검사 필요

  try {
    const manager: Manager = await prisma.manager.create({
      data: {
        ...reqData,
        password: bcrypt.hashSync(reqData.password, salt),
      },
    });

    // 매니저 정보 토큰 생성
    const token: string = await jwtSign(manager);

    if (token === "error") {
      return res.status(400).json({
        msg: "매니저 토큰 발행 오류",
      });
    }

    // 토큰을 쿠키에 집어 넣는다.
    await res.setHeader(
      "Set-Cookie",
      cookie.serialize("manager", token, {
        maxAge: 6 * 60 * 60,
        path: "/",
        sameSite: "lax",
      }),
    );

    return res.status(200).json({
      msg: "매니저 회원가입 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "매니저 회원가입 오류",
      error: error,
    });
  }
});

// 매니저 계정 체크
managerRouter.post("/check-account", async (req, res) => {
  console.log("/manager/check-account, POST");
  const reqData: { account: string } = req.body;

  try {
    const manager: Manager | null = await prisma.manager.findUnique({
      where: {
        account: reqData.account,
      },
    });

    return res.status(200).json({
      msg: "매니저 계정 체크 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "매니저 계정 체크 오류",
      error: error,
    });
  }
});

// 매니저 로그인
managerRouter.post("/login", async (req, res) => {
  console.log("/manager/login, POST");
  const reqData: ManagerLogin = req.body;

  // TODO : 매니저 로그인, 유효성 검사 필요

  try {
    const manager: Manager | null = await prisma.manager.findUnique({
      where: { account: reqData.account },
      include: {
        city: true,
      },
    });

    if (manager?.state) {
      if (manager && bcrypt.compareSync(reqData.password, manager.password)) {
        // 토큰 발행
        const token: string = await jwtSign(manager);

        if (token === "error") {
          return res.status(400).json({
            msg: "매니저 토큰 발행 오류",
          });
        }

        // 쿠키 첨부
        await res.setHeader(
          "Set-Cookie",
          cookie.serialize("manager", token, {
            maxAge: 6 * 60 * 60,
            path: "/",
            sameSite: "lax",
          }),
        );

        return res.status(200).json({
          msg: "매니저 로그인 성공",
          data: [manager, token],
        });
      } else {
        // 이메일 또는 비밀번호가 틀림
        return res.status(400).json({
          msg: "매니저 로그인 오류",
          error: "이메일 또는 비밀번호가 틀림",
        });
      }
    } else {
      return res.status(400).json({
        msg: "매니저 로그인 오류",
        error: "관리자 승인 필요",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "매니저 로그인 오류",
      error: error,
    });
  }
});

// 매니저 로그아웃
managerRouter.post("/logout", async (req, res) => {
  console.log("/manager/logout, POST");
  const cookie: string = await new Promise((resolve, reject) => {
    const value = serialize("manager", "", {
      maxAge: -1,
      path: "/",
    });
    resolve(value);
  });

  await res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({
    msg: "매니저 로그아웃 완료",
  });
});

// 내 정보 조회
managerRouter.get("/me", async (req, res) => {
  console.log("/manager/me, GET");

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "내 정보 조회 오류 : 토큰 찾기 실패",
      error: "내 정보 조회 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const managerToken: any = await jwtVerify(token);

  if (managerToken === "error") {
    return res.status(400).json({
      msg: "매니저 토큰 인증 오류",
    });
  }

  if (!managerToken.id || !managerToken.account) {
    return res.status(400).json({
      msg: "내 정보 조회 오류 : 토큰 인증 실패",
      error: "내 정보 조회 오류 : 토큰 인증 실패",
    });
  }
  try {
    const manager: Manager | null = await prisma.manager.findUnique({
      where: {
        account: managerToken.account,
      },
      include: {
        city: true,
      },
    });

    return res.status(200).json({
      msg: "내 정보 조회 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "내 정보 조회 오류",
      error: error,
    });
  }
});

// 매니저 목록 조회
managerRouter.get("/", async (req, res) => {
  console.log("/manager, GET");

  // TODO : 매니저 목록 조회, 관리자 권한 인증 필요
  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const manager: [number, Manager[]] = await prisma.$transaction([
      prisma.manager.count({
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
      prisma.manager.findMany({
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
        include: {
          city: true,
          user: {
            where: {
              managerState: 2,
            },
          },
        },
      }),
    ]);
    return res.status(200).json({
      msg: "매니저 목록 조회 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "매니저 목록 조회 오류",
      error: error,
    });
  }
});

// 사용자 업데이트
managerRouter.patch("/user/:userId", async (req, res) => {
  console.log("/manager/user/:userId, PATCH");

  const userId = req.params.userId;
  const reqData = req.body;

  try {
    const user: User | null = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: reqData,
    });
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

// 사용자 승인
managerRouter.patch("/:account/accept-user", async (req, res) => {
  console.log("/manager/:account/accept-user, PATCH");

  const account = req.params.account;
  const reqData = req.body;

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "사용자 승인 오류 : 토큰 찾기 실패",
      error: "사용자 승인 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const managerToken: any = await jwtVerify(token);

  if (managerToken === "error") {
    return res.status(400).json({
      msg: "매니저 토큰 인증 오류",
    });
  }

  if (
    !managerToken.id ||
    !managerToken.account ||
    managerToken.account !== account
  ) {
    return res.status(400).json({
      msg: "사용자 승인 오류 : 토큰 인증 실패",
      error: "사용자 승인 오류 : 토큰 인증 실패",
    });
  }

  try {
    const manager = await prisma.$transaction([
      prisma.manager.update({
        where: {
          account: account,
        },
        data: {
          user: {
            update: reqData.userIds.map((userId: number) => ({
              where: {
                id: userId,
              },
              data: {
                managerState: 2,
              },
            })),
          },
        },
      }),
      prisma.invoiceUserLog.createMany({
        data: reqData.userIds.map((userId: number) => ({
          userId: userId,
          managerId: Number(managerToken.id),
        })),
      }),
    ]);
    return res.status(200).json({
      msg: "사용자 승인 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "사용자 승인 오류",
      error: error,
    });
  }
});

// 사용자 대기
managerRouter.patch("/:account/except-user/:id", async (req, res) => {
  console.log("/manager/:account/delete-user, PATCH");

  const account = req.params.account;
  const userId = Number(req.params.id);

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "사용자 대기 오류 : 토큰 찾기 실패",
      error: "사용자 대기 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const managerToken: any = await jwtVerify(token);

  if (managerToken === "error") {
    return res.status(400).json({
      msg: "사용자 대기 매니저 토큰 인증 오류",
    });
  }

  if (
    !managerToken.id ||
    !managerToken.account ||
    managerToken.account !== account
  ) {
    return res.status(400).json({
      msg: "사용자 대기 오류 : 토큰 인증 실패",
      error: "사용자 대기 오류 : 토큰 인증 실패",
    });
  }

  try {
    const manager = await prisma.$transaction([
      prisma.manager.update({
        where: {
          account: account,
        },
        data: {
          user: {
            update: {
              where: {
                id: userId,
              },
              data: {
                managerState: 1,
              },
            },
          },
        },
      }),
      prisma.invoiceUserLog.deleteMany({
        where: {
          userId: userId,
        },
      }),
    ]);
    return res.status(200).json({
      msg: "사용자 대기 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "사용자 대기 오류",
      error: error,
    });
  }
});

// 매니저 조회
managerRouter.get("/:account", async (req, res) => {
  console.log("/manager/:account, GET");

  // TODO : 매니저 조회, 관리자 권한 인증 필요
  const account = req.params.account;

  try {
    const manager: Manager | null = await prisma.manager.findUnique({
      where: {
        account: account,
      },
      include: {
        city: true,
      },
    });
    return res.status(200).json({
      msg: "매니저 조회 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "매니저 조회 오류",
      error: error,
    });
  }
});

// 매니저 업데이트
managerRouter.patch("/:account", async (req, res) => {
  console.log("/manager/:account, PATCH");
  // TODO : 매니저 업데이트, 관리자 권한에 따라 분기 필요

  const account = req.params.account;
  const reqData: ManagerUpdate = req.body;
  const salt = await bcrypt.genSalt();

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "매니저 업데이트 오류 : 토큰 찾기 실패",
      error: "매니저 업데이트 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const managerToken: any = await jwtVerify(token);

  if (managerToken === "error") {
    return res.status(400).json({
      msg: "매니저 토큰 인증 오류",
    });
  }

  if (
    !managerToken.id ||
    !managerToken.account ||
    managerToken.account !== account
  ) {
    return res.status(400).json({
      msg: "매니저 업데이트 오류 : 토큰 인증 실패",
      error: "매니저 업데이트 오류 : 토큰 인증 실패",
    });
  }

  try {
    const manager: Manager = await prisma.manager.update({
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

    // 매니저 정보 토큰 생성
    const token: string = await jwtSign(manager);

    if (token === "error") {
      return res.status(400).json({
        msg: "매니저 토큰 발행 오류",
      });
    }

    // 토큰을 쿠키에 집어 넣는다.
    await res.setHeader(
      "Set-Cookie",
      cookie.serialize("manager", token, {
        maxAge: 6 * 60 * 60,
        path: "/",
        sameSite: "lax",
      }),
    );

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

// 매니저 삭제
// TODO : 아카이브로 변경 예정
managerRouter.delete("/:account", async (req, res) => {
  console.log("/manager/:account, DELETE");
  // TODO : 매니저 삭제, 관리자 권한에 따라 분기 필요

  const account = req.params.account;

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "매니저 삭제 오류 : 토큰 찾기 실패",
      error: "매니저 삭제 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const managerToken: any = await jwtVerify(token);

  if (managerToken === "error") {
    return res.status(400).json({
      msg: "매니저 토큰 인증 오류",
    });
  }

  if (
    !managerToken.id ||
    !managerToken.account ||
    managerToken.account !== account
  ) {
    return res.status(400).json({
      msg: "매니저 삭제 오류 : 토큰 인증 실패",
      error: "매니저 삭제 오류 : 토큰 인증 실패",
    });
  }

  try {
    const manager: Manager = await prisma.manager.delete({
      where: {
        account: account,
      },
    });

    return res.status(200).json({
      msg: "매니저 삭제 완료",
      data: manager,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "매니저 삭제 오류",
      error: error,
    });
  }
});
