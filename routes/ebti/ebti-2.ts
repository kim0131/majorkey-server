import { Ebti2, Ebti2Quest, PrismaClient } from "@prisma/client";
import express from "express";
import { getEbti2ResultData } from "../../utils/ebti";

export const ebti2Router = express.Router();
const prisma = new PrismaClient();

// EBTI 2 생성
ebti2Router.post("/", async (req, res) => {
  console.log("/ebti-2, POST");

  const reqData = req.body;

  try {
    const user = await prisma.user.findMany({
      where: {
        NOT: {
          id: reqData.userId,
        },
      },
      select: {
        ebti2: {
          take: 1,
          orderBy: {
            createDate: "desc",
          },
        },
      },
    });

    const ebti2ResultData = await getEbti2ResultData(reqData.answers, user);

    const ebti2 = await prisma.ebti2.create({
      data: {
        user: {
          connect: {
            id: reqData.userId,
          },
        },
        ...ebti2ResultData,
      },
    });

    return res.status(200).json({
      msg: "EBTI 2 생성 완료",
      data: ebti2,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 2 생성 오류",
      error: error,
    });
  }
});

// EBTI 2 목록 조회
ebti2Router.get("/", async (req, res) => {
  console.log("/ebti-2, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const ebti2: [number, Ebti2[]] = await prisma.$transaction([
      prisma.ebti2.count({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
        },
      }),
      prisma.ebti2.findMany({
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
      msg: "EBTI 2 목록 조회 완료",
      data: ebti2,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 2 목록 조회 오류",
      error: error,
    });
  }
});

// EBTI 2 질문 목록 조회
ebti2Router.get("/quest", async (req, res) => {
  console.log("/ebti-2/quest, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;

  try {
    const ebti2Quest: [number, Ebti2Quest[]] = await prisma.$transaction([
      prisma.ebti2Quest.count(),
      prisma.ebti2Quest.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
      }),
    ]);
    return res.status(200).json({
      msg: "EBTI 2 질문 목록 조회 완료",
      data: ebti2Quest,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 2 질문 목록 조회 오류",
      error: error,
    });
  }
});

// EBTI 2 질문 조회
ebti2Router.get("/quest/:id", async (req, res) => {
  console.log("/ebti-2/quest/:id, GET");

  const id = Number(req.params.id);

  try {
    const ebti2Quest: Ebti2Quest | null = await prisma.ebti2Quest.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "EBTI 2 질문 조회 완료",
      data: ebti2Quest,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 2 질문 조회 오류",
      error: error,
    });
  }
});

// EBTI 2 조회
ebti2Router.get("/:id", async (req, res) => {
  console.log("/ebti-2/:id, GET");

  const id = Number(req.params.id);

  try {
    const ebti2: Ebti2 | null = await prisma.ebti2.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "EBTI 2 조회 완료",
      data: {
        ...ebti2,
        tscore: {
          language: ebti2?.tscoreLanguage,
          math: ebti2?.tscoreMath,
          view: ebti2?.tscoreView,
          body: ebti2?.tscoreBody,
          music: ebti2?.tscoreMusic,
          nature: ebti2?.tscoreNature,
          self: ebti2?.tscoreSelf,
          interpersonal: ebti2?.tscoreInterpersonal,
        },
        percent: {
          language: ebti2?.percentLanguage,
          math: ebti2?.percentMath,
          view: ebti2?.percentView,
          body: ebti2?.percentBody,
          music: ebti2?.percentMusic,
          nature: ebti2?.percentNature,
          self: ebti2?.percentSelf,
          interpersonal: ebti2?.percentInterpersonal,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 2 조회 오류",
      error: error,
    });
  }
});
