import { Grade, PrismaClient } from "@prisma/client";
import express from "express";

export const gradeRouter = express.Router();
const prisma = new PrismaClient();

// 학년 목록 조회
gradeRouter.get("/", async (req, res) => {
  console.log("/grade, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const grade: [number, Grade[]] = await prisma.$transaction([
      prisma.grade.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
        },
      }),
      prisma.grade.findMany({
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
      msg: "학년 목록 조회 완료",
      data: grade,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학년 목록 조회 오류",
      error: error,
    });
  }
});

// 학년 조회
gradeRouter.get("/:id", async (req, res) => {
  console.log("/grade/:id, GET");

  const id = Number(req.params.id);

  try {
    const grade: Grade | null = await prisma.grade.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "학년 조회 완료",
      data: grade,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학년 조회 오류",
      error: error,
    });
  }
});
