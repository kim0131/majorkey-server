import { Ebti1, Ebti1Quest, PrismaClient } from "@prisma/client";
import express from "express";
import { getEbti1ResultData } from "../../utils/ebti";

export const ebti1Router = express.Router();
const prisma = new PrismaClient();

// EBTI 1 생성
ebti1Router.post("/", async (req, res) => {
  console.log("/ebti-1, POST");

  const reqData = req.body;

  try {
    const user = await prisma.user.findMany({
      where: {
        NOT: {
          id: reqData.userId,
        },
      },
      select: {
        ebti1: {
          take: 1,
          orderBy: {
            createDate: "desc",
          },
        },
      },
    });

    const ebti1ResultData = await getEbti1ResultData(reqData.answers, user);

    const ebti1 = await prisma.ebti1.create({
      data: {
        user: {
          connect: {
            id: reqData.userId,
          },
        },
        ...ebti1ResultData,
      },
    });

    return res.status(200).json({
      msg: "EBTI 1 생성 완료",
      data: ebti1,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 1 생성 오류",
      error: error,
    });
  }
});

// EBTI 1 목록 조회
ebti1Router.get("/", async (req, res) => {
  console.log("/ebti-1, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const ebti1: [number, Ebti1[]] = await prisma.$transaction([
      prisma.ebti1.count({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
        },
      }),
      prisma.ebti1.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        orderBy: {
          createDate: "desc",
        },
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
        },
      }),
    ]);
    return res.status(200).json({
      msg: "EBTI 1 목록 조회 완료",
      data: ebti1,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 1 목록 조회 오류",
      error: error,
    });
  }
});

// EBTI 1 질문 목록 조회
ebti1Router.get("/quest", async (req, res) => {
  console.log("/ebti-1/quest, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;

  try {
    const ebti1Quest: [number, Ebti1Quest[]] = await prisma.$transaction([
      prisma.ebti1Quest.count(),
      prisma.ebti1Quest.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
      }),
    ]);
    return res.status(200).json({
      msg: "EBTI 1 질문 목록 조회 완료",
      data: ebti1Quest,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 1 질문 목록 조회 오류",
      error: error,
    });
  }
});

// EBTI 1 질문 조회
ebti1Router.get("/quest/:id", async (req, res) => {
  console.log("/ebti-1/quest/:id, GET");

  const id = Number(req.params.id);

  try {
    const ebti1Quest: Ebti1Quest | null = await prisma.ebti1Quest.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "EBTI 1 질문 조회 완료",
      data: ebti1Quest,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 1 질문 조회 오류",
      error: error,
    });
  }
});

// EBTI 1 조회
ebti1Router.get("/:id", async (req, res) => {
  console.log("/ebti-1/:id, GET");

  const id = Number(req.params.id);

  try {
    const ebti1: Ebti1 | null = await prisma.ebti1.findUnique({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      msg: "EBTI 1 조회 완료",
      data: {
        ...ebti1,
        tscore: {
          chaeum: ebti1?.tscoreChaeum,
          saeum: ebti1?.tscoreSaeum,
          kium: ebti1?.tscoreKium,
          dotum: ebti1?.tscoreDotum,
        },
        percent: {
          chaeum: ebti1?.percentChaeum,
          saeum: ebti1?.percentSaeum,
          kium: ebti1?.percentKium,
          dotum: ebti1?.percentDotum,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 1 조회 오류",
      error: error,
    });
  }
});
