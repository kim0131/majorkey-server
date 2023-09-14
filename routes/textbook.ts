import { Textbook, PrismaClient } from "@prisma/client";
import express from "express";

export const textbookRouter = express.Router();
const prisma = new PrismaClient();

// 교재 생성
textbookRouter.post("/", async (req, res) => {
  console.log("/textbook, POST");
  const reqData: Textbook = req.body;

  try {
    const textbook: Textbook = await prisma.textbook.create({
      data: {
        ...reqData,
      },
    });

    return res.status(200).json({
      msg: "교재 생성 완료",
      data: textbook,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "교재 생성 오류",
      error: error,
    });
  }
});

// 교재 업데이트
textbookRouter.patch("/:id", async (req, res) => {
  console.log("/textbook/:id, PATCH");

  const id = Number(req.params.id);
  const reqData: Textbook = req.body;

  try {
    const textbook: Textbook = await prisma.textbook.update({
      where: {
        id: id,
      },
      data: {
        ...reqData,
      },
    });

    return res.status(200).json({
      msg: "교재 업데이트 완료",
      data: textbook,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "교재 업데이트 오류",
      error: error,
    });
  }
});

// 교재 목록 조회
textbookRouter.get("/", async (req, res) => {
  console.log("/textbook, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const textbook: [number, Textbook[]] = await prisma.$transaction([
      prisma.textbook.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
          ...(query["subject-id"] && {
            subjectId: Number(query["subject-id"]),
          }),
        },
        orderBy: {
          createDate: "desc",
        },
      }),
      prisma.textbook.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        orderBy: {
          createDate: "desc",
        },
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
          ...(query["subject-id"] && {
            subjectId: Number(query["subject-id"]),
          }),
        },
      }),
    ]);
    return res.status(200).json({
      msg: "교재 목록 조회 완료",
      data: textbook,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "교재 목록 조회 오류",
      error: error,
    });
  }
});

// 교재 조회
textbookRouter.get("/:id", async (req, res) => {
  console.log("/textbook/:id, GET");

  const id = Number(req.params.id);

  try {
    const textbook: Textbook | null = await prisma.textbook.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "교재 조회 완료",
      data: textbook,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "교재 조회 오류",
      error: error,
    });
  }
});

// 교재 삭제
textbookRouter.delete("/:id", async (req, res) => {
  console.log("/textbook/:id, DELETE");

  const id = Number(req.params.id);

  try {
    const textbook = await prisma.textbook.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      msg: "교재 삭제 완료",
      data: textbook,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "교재 삭제 오류",
      error: error,
    });
  }
});
