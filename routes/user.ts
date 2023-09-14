import {
  CollegeDepartment,
  ExpectExam,
  ExpectSchool,
  ExpectStudent,
  PrismaClient,
  User,
} from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import cookie, { serialize } from "cookie";
import _ from "lodash";
import { jwtGetToken, jwtSign, jwtVerify } from "../utils/jwt";
import { UserCreate, UserLogin } from "../interfaces/user";

export const userRouter = express.Router();
const prisma = new PrismaClient();

// 유저 생성
userRouter.post("/", async (req, res) => {
  console.log("/user, POST");
  const reqData: UserCreate = req.body;
  const salt = await bcrypt.genSalt();

  // TODO : 유저 생성, 유효성 검사 필요

  try {
    const user: User = await prisma.user.create({
      data: {
        ...reqData,
        password: bcrypt.hashSync(reqData.password, salt),
        expectSchool: {
          createMany: {
            data: [
              { subjectId: 1 },
              { subjectId: 2 },
              { subjectId: 3 },
              { subjectId: 4 },
              { subjectId: 5 },
            ],
          },
        },
        expectExam: {
          createMany: {
            data: [
              { subjectId: 1 },
              { subjectId: 2 },
              { subjectId: 3 },
              { subjectId: 4 },
              { subjectId: 5 },
            ],
          },
        },
        expectStudent: {
          createMany: {
            data: [
              { type: 1 },
              { type: 2 },
              { type: 3 },
              { type: 4 },
              { type: 5 },
              { type: 6 },
              { type: 7 },
            ],
          },
        },
      },
      include: {
        school: true,
        careerDetail: {
          include: {
            career: true,
          },
        },
        grade: true,
        manager: true,
        favoriteSubject: true,
        hateSubject: true,
        wellSubject: true,
        lessSubject: true,
        learningAssessment: true,
        ebti1: true,
        collegeDepartment: {
          include: { college: true },
        },
        expectSchool: true,
        expectExam: true,
        expectStudent: true,
      },
    });

    // 유저 정보 토큰 생성
    const token: string = await jwtSign(user);

    if (token === "error") {
      return res.status(400).json({
        msg: "유저 토큰 발행 오류",
      });
    }

    // 토큰을 쿠키에 집어 넣는다.
    await res.setHeader(
      "Set-Cookie",
      cookie.serialize("user", token, {
        maxAge: 6 * 60 * 60,
        path: "/",
        sameSite: "lax",
      }),
    );

    return res.status(200).json({
      msg: "유저 생성 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 생성 오류",
      error: error,
    });
  }
});

// 유저 계정 체크
userRouter.post("/check-account", async (req, res) => {
  console.log("/user/check-account, POST");
  const reqData: { account: string } = req.body;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        account: reqData.account,
      },
    });

    return res.status(200).json({
      msg: "유저 계정 체크 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 계정 체크 오류",
      error: error,
    });
  }
});

// 유저 계정 찾기
userRouter.post("/find-account", async (req, res) => {
  console.log("/user/find-account, POST");
  const reqData: { name: string; phone: string } = req.body;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        phone: reqData.phone,
      },
    });

    if (user && user.name === reqData.name) {
      return res.status(200).json({
        msg: "유저 계정 찾기 완료",
        data: user,
      });
    } else {
      return res.status(400).json({
        msg: "유저 계정 찾기 오류",
        data: "유저 계정 찾기 오류",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "유저 계정 찾기 오류",
      error: error,
    });
  }
});

// 유저 패스워드 찾기
userRouter.post("/find-password", async (req, res) => {
  console.log("/user/find-password, POST");
  const reqData: { account: string; phone: string } = req.body;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        phone: reqData.phone,
      },
    });

    if (user && user.account === reqData.account) {
      return res.status(200).json({
        msg: "유저 패스워드 찾기 완료",
        data: user,
      });
    } else {
      return res.status(400).json({
        msg: "유저 패스워드 찾기 오류",
        data: "유저 패스워드 찾기 오류",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "유저 패스워드 찾기 오류",
      error: error,
    });
  }
});

// 유저 패스워드 초기화(변경)
userRouter.patch("/reset-password", async (req, res) => {
  console.log("/user/reset-password, PATCH");
  const reqData: { account: string; phone: string; password: string } =
    req.body;
  const salt = await bcrypt.genSalt();

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        phone: reqData.phone,
      },
    });

    if (user && user.account === reqData.account) {
      const updateUser = await prisma.user.update({
        where: {
          phone: reqData.phone,
        },
        data: {
          password: bcrypt.hashSync(reqData.password, salt),
        },
      });
      return res.status(200).json({
        msg: "유저 패스워드 초기화 완료",
        data: updateUser,
      });
    } else {
      return res.status(400).json({
        msg: "유저 패스워드 초기화 오류",
        data: "유저 패스워드 초기화 오류",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "유저 패스워드 초기화 오류",
      error: error,
    });
  }
});

// 유저 로그인
userRouter.post("/login", async (req, res) => {
  console.log("/user/login, POST");
  const reqData: UserLogin = req.body;

  // TODO : 유저 로그인, 유효성 검사 필요

  try {
    const user: User | null = await prisma.user.findUnique({
      where: { account: reqData.account },
      include: {
        school: true,
        careerDetail: {
          include: {
            career: true,
          },
        },
        grade: true,
        manager: true,
        favoriteSubject: true,
        hateSubject: true,
        wellSubject: true,
        lessSubject: true,
        learningAssessment: true,
        ebti1: true,
        collegeDepartment: {
          include: { college: true },
        },
      },
    });

    if (user && bcrypt.compareSync(reqData.password, user.password)) {
      // 토큰 발행
      const token: string = await jwtSign(user);

      if (token === "error") {
        return res.status(400).json({
          msg: "유저 토큰 발행 오류",
        });
      }

      // 쿠키 첨부
      await res.setHeader(
        "Set-Cookie",
        cookie.serialize("user", token, {
          maxAge: 6 * 60 * 60,
          path: "/",
          sameSite: "lax",
        }),
      );

      return res.status(200).json({
        msg: "유저 로그인 성공",
        data: [user, token],
      });
    } else {
      // 이메일 또는 비밀번호가 틀림
      return res.status(400).json({
        msg: "유저 로그인 오류",
        error: "이메일 또는 비밀번호가 틀림",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "유저 로그인 오류",
      error: error,
    });
  }
});

// 유저 로그아웃
userRouter.post("/logout", async (req, res) => {
  console.log("/user/logout, POST");
  const cookie: string = await new Promise((resolve, reject) => {
    const value = serialize("user", "", {
      maxAge: -1,
      path: "/",
    });
    resolve(value);
  });

  await res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({
    msg: "유저 로그아웃 완료",
  });
});

// 내 정보 조회
userRouter.get("/me", async (req, res) => {
  console.log("/user/me, GET");

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "내 정보 조회 오류 : 토큰 찾기 실패",
      error: "내 정보 조회 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const userToken: any = await jwtVerify(token);

  if (userToken === "error") {
    return res.status(400).json({
      msg: "유저 토큰 인증 오류",
    });
  }

  if (!userToken.id || !userToken.account) {
    return res.status(400).json({
      msg: "내 정보 조회 오류 : 토큰 인증 실패",
      error: "내 정보 조회 오류 : 토큰 인증 실패",
    });
  }
  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        account: userToken.account,
      },
      include: {
        school: true,
        careerDetail: {
          include: {
            career: true,
          },
        },
        grade: true,
        manager: true,
        favoriteSubject: true,
        hateSubject: true,
        wellSubject: true,
        lessSubject: true,
        learningAssessment: true,
        ebti1: true,
        collegeDepartment: {
          include: { college: true },
        },
      },
    });

    return res.status(200).json({
      msg: "내 정보 조회 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "내 정보 조회 오류",
      error: error,
    });
  }
});

// 유저 목록 조회
userRouter.get("/", async (req, res) => {
  console.log("/user, GET");

  // TODO : 유저 목록 조회, 관리자 권한 인증 필요
  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const user: [number, User[]] = await prisma.$transaction([
      prisma.user.count({
        where: {
          ...(query.search && {
            OR: [
              {
                name: {
                  contains: query.search,
                },
              },
              {
                class: {
                  contains: query.search,
                },
              },
            ],
          }),
          ...(query["manager-id"] && {
            managerId: Number(query["manager-id"]),
          }),
          ...(query["grade-id"] && {
            gradeId: Number(query["grade-id"]),
          }),
        },
      }),
      prisma.user.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        orderBy: {
          createDate: "desc",
        },
        where: {
          ...(query.search && {
            OR: [
              {
                name: {
                  contains: query.search,
                },
              },
              {
                class: {
                  contains: query.search,
                },
              },
            ],
          }),
          ...(query["manager-id"] && {
            managerId: Number(query["manager-id"]),
          }),
          ...(query["grade-id"] && {
            gradeId: Number(query["grade-id"]),
          }),
        },
        include: {
          school: true,
          careerDetail: {
            include: {
              career: true,
            },
          },
          grade: true,
          manager: true,
          favoriteSubject: true,
          hateSubject: true,
          wellSubject: true,
          lessSubject: true,
          learningAssessment: {
            orderBy: {
              createDate: "desc",
            },
          },
          ebti: true,
          ebti1: true,
          ebti2: true,
          collegeDepartment: {
            include: { college: true },
          },
        },
      }),
    ]);
    return res.status(200).json({
      msg: "유저 목록 조회 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 목록 조회 오류",
      error: error,
    });
  }
});

// 성적예측 내신 조회
userRouter.get("/:account/expect/school", async (req, res) => {
  console.log("/user/:account/expect-school, GET");

  // 유저 ID
  const id = Number(req.params.account);
  const query: any = req.query;

  try {
    const expectSchool: ExpectSchool | null =
      await prisma.expectSchool.findUnique({
        where: {
          userId_subjectId: {
            userId: id,
            subjectId: Number(query["subject-id"]),
          },
        },
      });
    return res.status(200).json({
      msg: "성적예측 내신 조회 완료",
      data: expectSchool,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 내신 조회 오류",
      error: error,
    });
  }
});

// 성적예측 모의고사 조회
userRouter.get("/:account/expect/exam", async (req, res) => {
  console.log("/user/:account/expect-exam, GET");

  // 유저 ID
  const id = Number(req.params.account);
  const query: any = req.query;

  try {
    const expectExam: ExpectExam | null = await prisma.expectExam.findUnique({
      where: {
        userId_subjectId: {
          userId: id,
          subjectId: Number(query["subject-id"]),
        },
      },
    });
    return res.status(200).json({
      msg: "성적예측 모의고사 조회 완료",
      data: expectExam,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 모의고사 조회 오류",
      error: error,
    });
  }
});

// 성적예측 학생부 조회
userRouter.get("/:account/expect/student", async (req, res) => {
  console.log("/user/:account/expect-student, GET");

  // 유저 ID
  const id = Number(req.params.account);
  const query: any = req.query;

  try {
    const expectStudent: ExpectStudent | null =
      await prisma.expectStudent.findUnique({
        where: {
          userId_type: {
            userId: id,
            type: Number(query.type),
          },
        },
      });
    return res.status(200).json({
      msg: "성적예측 학생부 조회 완료",
      data: expectStudent,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 학생부 조회 오류",
      error: error,
    });
  }
});

// 유저 학과 즐겨찾기 추가
userRouter.patch("/:account/college/department/:id", async (req, res) => {
  console.log("/user/:user-id/college/department/:id, PATCH");

  const userId = Number(req.params.account);
  const id = Number(req.params.id);

  try {
    const collegeDepartment: CollegeDepartment | null =
      await prisma.collegeDepartment.update({
        where: {
          id: id,
        },
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          user: true,
        },
      });
    return res.status(200).json({
      msg: "유저 학과 즐겨찾기 추가 완료",
      data: collegeDepartment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 학과 즐겨찾기 추가 오류",
      error: error,
    });
  }
});

// 유저 학과 즐겨찾기 삭제
userRouter.delete("/:account/college/department/:id", async (req, res) => {
  console.log("/user/:account/college/department/:id, DELETE");

  const userId = Number(req.params.account);
  const id = Number(req.params.id);

  try {
    const collegeDepartment: CollegeDepartment | null =
      await prisma.collegeDepartment.update({
        where: {
          id: id,
        },
        data: {
          user: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
    return res.status(200).json({
      msg: "유저 학과 즐겨찾기 삭제 완료",
      data: collegeDepartment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 학과 즐겨찾기 삭제 오류",
      error: error,
    });
  }
});

// EBTI 조회
userRouter.get("/:account/ebti", async (req, res) => {
  console.log("/user/:account/ebti, GET");

  // 유저 ID
  const id = Number(req.params.account);

  try {
    const ebtiData = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        ebti: {
          select: {
            id: true,
            type: true,
            createDate: true,
          },
        },
        ebti1: {
          select: {
            id: true,
            type: true,
            createDate: true,
          },
        },
        ebti2: {
          select: {
            id: true,
            type: true,
            createDate: true,
          },
        },
      },
    });
    const mergeData = [
      ...ebtiData!.ebti.map(data => ({ category: "ebti", ...data })),
      ...ebtiData!.ebti1.map(data => ({ category: "ebti1", ...data })),
      ...ebtiData!.ebti2.map(data => ({ category: "ebti2", ...data })),
    ];
    return res.status(200).json({
      msg: "EBTI 조회 완료",
      data: _.sortBy(mergeData, "createDate").reverse(),
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 조회 오류",
      error: error,
    });
  }
});

// 유저 조회
userRouter.get("/:account", async (req, res) => {
  console.log("/user/:account, GET");

  // TODO : 유저 조회, 관리자 권한 인증 필요
  const account = req.params.account;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        account: account,
      },
      include: {
        school: true,
        careerDetail: {
          include: {
            career: true,
          },
        },
        grade: true,
        manager: true,
        favoriteSubject: true,
        hateSubject: true,
        wellSubject: true,
        lessSubject: true,
        learningAssessment: {
          orderBy: {
            createDate: "desc",
          },
        },
        ebti1: true,
        collegeDepartment: {
          include: { college: true },
        },
      },
    });
    return res.status(200).json({
      msg: "유저 조회 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 조회 오류",
      error: error,
    });
  }
});

// 유저 업데이트
userRouter.patch("/:account", async (req, res) => {
  console.log("/user/:account, PATCH");
  // TODO : 유저 업데이트, 관리자 권한에 따라 분기 필요

  const account = req.params.account;
  const reqData = req.body;
  const salt = await bcrypt.genSalt();

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "유저 업데이트 오류 : 토큰 찾기 실패",
      error: "유저 업데이트 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const userToken: any = await jwtVerify(token);

  if (userToken === "error") {
    return res.status(400).json({
      msg: "유저 토큰 인증 오류",
    });
  }

  if (!userToken.id || !userToken.account || userToken.account !== account) {
    return res.status(400).json({
      msg: "유저 업데이트 오류 : 토큰 인증 실패",
      error: "유저 업데이트 오류 : 토큰 인증 실패",
    });
  }

  try {
    const user: User = await prisma.user.update({
      where: {
        account: account,
      },
      data: {
        ...reqData,
        ...(reqData.password && {
          password: bcrypt.hashSync(reqData.password, salt),
        }),
      },

      include: {
        school: true,
        careerDetail: {
          include: {
            career: true,
          },
        },
        grade: true,
        manager: true,
        favoriteSubject: true,
        hateSubject: true,
        wellSubject: true,
        lessSubject: true,
        learningAssessment: true,
        ebti1: true,
        collegeDepartment: {
          include: { college: true },
        },
      },
    });

    if (reqData.managerId) {
      prisma.invoiceUserLog.deleteMany({
        where: {
          userId: user.id,
        },
      });
    }

    return res.status(200).json({
      msg: "유저 업데이트 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 업데이트 오류",
      error: error,
    });
  }
});

// 유저 삭제
// TODO : 아카이브로 변경 예정
userRouter.delete("/:account", async (req, res) => {
  console.log("/user/:account, DELETE");
  // TODO : 유저 삭제, 관리자 권한에 따라 분기 필요

  const account = req.params.account;

  // 토큰 검색
  const token = await jwtGetToken(req);

  if (!token) {
    return res.status(400).json({
      msg: "유저 삭제 오류 : 토큰 찾기 실패",
      error: "유저 삭제 오류 : 토큰 찾기 실패",
    });
  }

  // 토큰 인증
  const userToken: any = await jwtVerify(token);

  if (userToken === "error") {
    return res.status(400).json({
      msg: "유저 토큰 인증 오류",
    });
  }

  if (!userToken.id || !userToken.account || userToken.account !== account) {
    return res.status(400).json({
      msg: "유저 삭제 오류 : 토큰 인증 실패",
      error: "유저 삭제 오류 : 토큰 인증 실패",
    });
  }

  try {
    const user: User = await prisma.user.delete({
      where: {
        account: account,
      },
    });

    return res.status(200).json({
      msg: "유저 삭제 완료",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "유저 삭제 오류",
      error: error,
    });
  }
});
