import { PrismaClient, School } from "@prisma/client";
import express from "express";

export const schoolRouter = express.Router();
const prisma = new PrismaClient();

// 학교 목록 조회
schoolRouter.get("/", async (req, res) => {
  console.log("/school, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const school: [number, School[]] = await prisma.$transaction([
      prisma.school.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
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
      prisma.school.findMany({
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
        },
      }),
    ]);
    return res.status(200).json({
      msg: "학교 목록 조회 완료",
      data: school,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학교 목록 조회 오류",
      error: error,
    });
  }
});

// 학교 조회
schoolRouter.get("/:id", async (req, res) => {
  console.log("/school/:id, GET");

  const id = Number(req.params.id);

  try {
    const school: School | null = await prisma.school.findUnique({
      where: {
        id: id,
      },
      include: {
        city: true,
      },
    });
    return res.status(200).json({
      msg: "학교 조회 완료",
      data: school,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학교 조회 오류",
      error: error,
    });
  }
});
