import { College, CollegeDepartment, PrismaClient } from "@prisma/client";
import express from "express";
export const collegeRouter = express.Router();
const prisma = new PrismaClient();

// 대학 생성
collegeRouter.post("/", async (req, res) => {
  console.log("/college, POST");
  const reqData = req.body;

  try {
    const college = await prisma.college.create({
      data: {
        name: reqData.name,
        year: Number(reqData.year),
      },
    });

    return res.status(200).json({
      msg: "대학 생성 완료",
      data: college,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "대학 생성 오류",
      error: error,
    });
  }
});

// 대학 목록 조회
collegeRouter.get("/", async (req, res) => {
  console.log("/college, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const college: [number, College[]] = await prisma.$transaction([
      prisma.college.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
          ...(query.year && {
            year: query.year,
          }),
        },
      }),
      prisma.college.findMany({
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
          ...(query.year && {
            year: query.year,
          }),
        },
      }),
    ]);
    return res.status(200).json({
      msg: "대학 목록 조회 완료",
      data: college,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "대학 목록 조회 오류",
      error: error,
    });
  }
});

// 대학 학과 생성
collegeRouter.post("/:id/department", async (req, res) => {
  console.log("/college/:id/department, POST");

  const id = Number(req.params.id);
  const reqData = req.body;

  try {
    const collegeDepartment = await prisma.college.update({
      where: {
        id: id,
      },
      data: {
        collegeDepartment: {
          deleteMany: {},
          createMany: {
            data: reqData.map(data => {
              const earlyTotalAmount =
                data.earlyBookAmount +
                data.earlyTotal1Amount +
                data.earlyTotal2Amount +
                data.earlyEssayAmount +
                +data.earlySpecialAmount;
              const regularTotalAmount =
                data.regular1Amount + data.regular2Amount;
              return {
                ...data,
                earlyTotalAmount: earlyTotalAmount,
                regularTotalAmount: regularTotalAmount,
              };
            }),
          },
        },
      },
      include: {
        collegeDepartment: true,
      },
    });

    return res.status(200).json({
      msg: "대학 학과 생성 완료",
      data: collegeDepartment,
    });
  } catch (error) {
    throw error;
    return res.status(400).json({
      msg: "대학 학과 생성 오류",
      error: error,
    });
  }
});

// 대학 학과 목록 조회
collegeRouter.get("/:id/department", async (req, res) => {
  console.log("/college/:id/department, GET");

  const id = Number(req.params.id);
  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const collegeDepartment: [number, CollegeDepartment[]] =
      await prisma.$transaction([
        prisma.collegeDepartment.count({
          where: {
            collegeId: id,
            ...(query.name && {
              name: {
                contains: query.name,
              },
            }),
          },
        }),
        prisma.collegeDepartment.findMany({
          ...(list !== 0 && {
            skip: list * (page - 1),
            take: list,
          }),
          where: {
            collegeId: id,
            ...(query.name && {
              name: {
                contains: query.name,
              },
            }),
          },
        }),
      ]);
    return res.status(200).json({
      msg: "대학 학과 목록 조회 완료",
      data: collegeDepartment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "대학 학과 목록 조회 오류",
      error: error,
    });
  }
});

// 대학 조회
collegeRouter.get("/:id", async (req, res) => {
  console.log("/college/:id, GET");

  const id = Number(req.params.id);

  try {
    const college: College | null = await prisma.college.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "대학 조회 완료",
      data: college,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "대학 조회 오류",
      error: error,
    });
  }
});

// 대학 업데이트
collegeRouter.patch("/:id", async (req, res) => {
  console.log("/college/:id, PATCH");

  const id = Number(req.params.id);
  const reqData = req.body;

  try {
    const college = await prisma.college.update({
      where: {
        id: id,
      },
      data: {
        name: reqData.name,
        year: Number(reqData.year),
      },
    });

    return res.status(200).json({
      msg: "대학 업데이트 완료",
      data: college,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "대학 업데이트 오류",
      error: error,
    });
  }
});

// 대학 삭제
collegeRouter.delete("/:id", async (req, res) => {
  console.log("/college/:id, DELETE");

  const id = Number(req.params.id);

  try {
    const college = await prisma.college.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      msg: "대학 삭제 완료",
      data: college,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "대학 삭제 오류",
      error: error,
    });
  }
});
