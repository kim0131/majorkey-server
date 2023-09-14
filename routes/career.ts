import { Career, CareerDetail, PrismaClient } from "@prisma/client";
import express from "express";

export const careerRouter = express.Router();
const prisma = new PrismaClient();

// 전체 진로분야 목록 조회
careerRouter.get("/", async (req, res) => {
  console.log("/career, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const career: [number, Career[]] = await prisma.$transaction([
      prisma.career.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
        },
      }),
      prisma.career.findMany({
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
        orderBy: {
          createDate: "desc",
        },
        include: {
          careerDetail: true,
        },
      }),
    ]);
    return res.status(200).json({
      msg: "진로분야 목록 조회 완료",
      data: career,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로분야 목록 조회 오류",
      error: error,
    });
  }
});

// 전체 진로분야의 세부전공 목록 조회
careerRouter.get("/detail", async (req, res) => {
  console.log("/career/detail, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const careerDetail: [number, CareerDetail[]] = await prisma.$transaction([
      prisma.careerDetail.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
          ...(query["career-name"] && {
            career: {
              is: {
                name: query["career-name"],
              },
            },
          }),
        },
        orderBy: {
          createDate: "desc",
        },
      }),
      prisma.careerDetail.findMany({
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
          ...(query["career-name"] && {
            career: {
              is: {
                name: query["career-name"],
              },
            },
          }),
        },
        orderBy: {
          createDate: "desc",
        },
      }),
    ]);
    return res.status(200).json({
      msg: "세부전공 목록 조회 완료",
      data: careerDetail,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "세부전공 목록 조회 오류",
      error: error,
    });
  }
});

// 세부전공 조회
careerRouter.get("/detail/:id", async (req, res) => {
  console.log("/career/detail/:id, GET");

  const id = Number(req.params.id);

  try {
    const careerDetail: CareerDetail | null =
      await prisma.careerDetail.findUnique({
        where: {
          id: id,
        },
      });
    return res.status(200).json({
      msg: "세부전공 조회 완료",
      data: careerDetail,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "세부전공 조회 오류",
      error: error,
    });
  }
});

// 진로분야 조회
careerRouter.get("/:id", async (req, res) => {
  console.log("/career/:id, GET");

  const id = Number(req.params.id);

  try {
    const career: Career | null = await prisma.career.findUnique({
      where: {
        id: id,
      },
      include: {
        careerDetail: true,
      },
    });
    return res.status(200).json({
      msg: "진로분야 조회 완료",
      data: career,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로분야 조회 오류",
      error: error,
    });
  }
});

// 진로분야의 세부전공 목록 조회
careerRouter.get("/:id/detail", async (req, res) => {
  console.log("/career/:id/detail, GET");

  const id = Number(req.params.id);
  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const careerDetail: [number, CareerDetail[]] = await prisma.$transaction([
      prisma.careerDetail.count({
        where: {
          careerId: id,
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
        },
      }),
      prisma.careerDetail.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        where: {
          careerId: id,
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
        },
      }),
    ]);
    return res.status(200).json({
      msg: "진로분야의 세부전공 목록 조회 완료",
      data: careerDetail,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로분야의 세부전공 목록 조회 오류",
      error: error,
    });
  }
});
