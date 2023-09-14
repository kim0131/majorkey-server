import { Ebti, EbtiQuest, PrismaClient } from "@prisma/client";
import express from "express";
import { getEbtiResultData } from "../../utils/ebti";
import _ from "lodash";

export const ebtiRouter = express.Router();
const prisma = new PrismaClient();

// EBTI 생성
ebtiRouter.post("/", async (req, res) => {
  console.log("/ebti, POST");

  const reqData = req.body;

  try {
    const user = await prisma.user.findMany({
      where: {
        NOT: {
          id: reqData.userId,
        },
      },
      select: {
        ebti: {
          take: 1,
          orderBy: {
            createDate: "desc",
          },
        },
      },
    });

    const ebtiResultData = await getEbtiResultData(reqData.answers, user);

    const ebti = await prisma.ebti.create({
      data: {
        user: {
          connect: {
            id: reqData.userId,
          },
        },
        ...ebtiResultData,
      },
    });

    return res.status(200).json({
      msg: "EBTI 생성 완료",
      data: ebti,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 생성 오류",
      error: error,
    });
  }
});

// EBTI 목록 조회
ebtiRouter.get("/", async (req, res) => {
  console.log("/ebti, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const ebti: [number, Ebti[]] = await prisma.$transaction([
      prisma.ebti.count({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
        },
      }),
      prisma.ebti.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
        },
        orderBy: {
          createDate: "desc",
        },
      }),
    ]);
    return res.status(200).json({
      msg: "EBTI 목록 조회 완료",
      data: ebti,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 목록 조회 오류",
      error: error,
    });
  }
});

// EBTI 질문 목록 조회
ebtiRouter.get("/quest", async (req, res) => {
  console.log("/ebti/quest, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;

  try {
    const ebtiQuest: [number, EbtiQuest[]] = await prisma.$transaction([
      prisma.ebtiQuest.count(),
      prisma.ebtiQuest.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
      }),
    ]);
    return res.status(200).json({
      msg: "EBTI 질문 목록 조회 완료",
      data: ebtiQuest,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 질문 목록 조회 오류",
      error: error,
    });
  }
});

// EBTI 질문 조회
ebtiRouter.get("/quest/:id", async (req, res) => {
  console.log("/ebti/quest/:id, GET");

  const id = Number(req.params.id);

  try {
    const ebtiQuest: EbtiQuest | null = await prisma.ebtiQuest.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "EBTI 질문 조회 완료",
      data: ebtiQuest,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 질문 조회 오류",
      error: error,
    });
  }
});

// EBTI 조회
ebtiRouter.get("/:id", async (req, res) => {
  console.log("/ebti/:id, GET");

  const id = Number(req.params.id);

  try {
    const ebti: Ebti | null = await prisma.ebti.findUnique({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      msg: "EBTI 조회 완료",
      data: {
        ...ebti,
        tscore: {
          real: ebti?.tscoreReal,
          habit: ebti?.tscoreHabit,
          research: ebti?.tscoreResearch,
          progress: ebti?.tscoreProgress,
          society: ebti?.tscoreHabit,
          art: ebti?.tscoreArt,
        },
        percent: {
          real: ebti?.percentReal,
          habit: ebti?.percentHabit,
          research: ebti?.percentResearch,
          progress: ebti?.percentProgress,
          society: ebti?.percentSociety,
          art: ebti?.percentArt,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 조회 오류",
      error: error,
    });
  }
});
