import { Subject, PrismaClient } from "@prisma/client";
import express from "express";

export const subjectRouter = express.Router();
const prisma = new PrismaClient();

// 과목 목록 조회
subjectRouter.get("/", async (req, res) => {
  console.log("/subject, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const subject: [number, Subject[]] = await prisma.$transaction([
      prisma.subject.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
        },
      }),
      prisma.subject.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
        },
      }),
    ]);
    return res.status(200).json({
      msg: "과목 목록 조회 완료",
      data: subject,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "과목 목록 조회 오류",
      error: error,
    });
  }
});

// 과목 조회
subjectRouter.get("/:id", async (req, res) => {
  console.log("/subject/:id, GET");

  const id = Number(req.params.id);

  try {
    const subject: Subject | null = await prisma.subject.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "과목 조회 완료",
      data: subject,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "과목 조회 오류",
      error: error,
    });
  }
});
