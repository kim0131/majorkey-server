import { City, PrismaClient } from "@prisma/client";
import express from "express";

export const cityRouter = express.Router();
const prisma = new PrismaClient();

// 지역 목록 조회
cityRouter.get("/", async (req, res) => {
  console.log("/city, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const city: [number, City[]] = await prisma.$transaction([
      prisma.city.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
        },
      }),
      prisma.city.findMany({
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
      msg: "지역 목록 조회 완료",
      data: city,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "지역 목록 조회 오류",
      error: error,
    });
  }
});

// 지역 조회
cityRouter.get("/:id", async (req, res) => {
  console.log("/city/:id, GET");

  const id = Number(req.params.id);

  try {
    const city: City | null = await prisma.city.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "지역 조회 완료",
      data: city,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "지역 조회 오류",
      error: error,
    });
  }
});
