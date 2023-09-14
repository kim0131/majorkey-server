import {
  CareerAssessment,
  CollegeDepartment,
  CustomizedPlan,
  Ebti,
  Ebti1,
  Ebti2,
  LearningAssessment,
  PrismaClient,
} from "@prisma/client";
import dayjs from "dayjs";
import express from "express";
import { getCustomizedStrategy } from "../utils/customized-strategy";

export const reportRouter = express.Router();
const prisma = new PrismaClient();

// 학습 진단 리포트 조회
reportRouter.get("/learning-assessment/:id", async (req, res) => {
  console.log("/report/learning-assessment/:id, GET");

  const id = Number(req.params.id);
  const query: any = req.query;

  try {
    const learningAssessment: LearningAssessment | null =
      await prisma.learningAssessment.findUnique({
        where: {
          id: id,
        },
        include: {
          user: {
            include: {
              manager: true,
              learningAssessment: {
                take: 12,
                orderBy: {
                  createDate: "desc",
                },
                where: {
                  subjectId: Number(query["subject-id"]),
                },
              },
            },
          },
        },
      });
    return res.status(200).json({
      msg: "학습 진단 리포트 조회 완료",
      data: learningAssessment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학습 진단 리포트 조회 오류",
      error: error,
    });
  }
});

// 진로 진단 리포트 조회
reportRouter.get("/career-assessment/:id", async (req, res) => {
  console.log("/report/career-assessment/:id, GET");

  const id = Number(req.params.id);
  const query: any = req.query;

  try {
    const careerAssessment: CareerAssessment | null =
      await prisma.careerAssessment.findUnique({
        where: {
          id: id,
        },
        include: {
          user: {
            include: {
              manager: true,
              careerAssessment: {
                take: 12,
                orderBy: {
                  createDate: "desc",
                },
                where: {
                  type: Number(query.type),
                },
              },
            },
          },
        },
      });
    return res.status(200).json({
      msg: "진로 진단 리포트 조회 완료",
      data: careerAssessment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로 진단 리포트 조회 오류",
      error: error,
    });
  }
});

// 대학 학과정보 리포트 조회
reportRouter.get("/college-department/:id", async (req, res) => {
  console.log("/report/college-department/:id, GET");

  const id = Number(req.params.id);

  try {
    const collegeDepartment: CollegeDepartment | null =
      await prisma.collegeDepartment.findUnique({
        where: {
          id: id,
        },
        include: {
          college: true,
        },
      });
    return res.status(200).json({
      msg: "대학 학과정보 리포트 조회 완료",
      data: collegeDepartment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "대학 학과정보 리포트 조회 오류",
      error: error,
    });
  }
});

// EBTI 1 리포트 조회
reportRouter.get("/ebti-1/:userId", async (req, res) => {
  console.log("/report/ebti-1/:id, GET");

  const userId = Number(req.params.userId);

  try {
    const ebti1: Ebti1 | null = await prisma.ebti1.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createDate: "desc",
      },
      include: {
        user: {
          include: {
            manager: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "EBTI 1 리포트 조회 완료",
      data: ebti1,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 1 리포트 조회 오류",
      error: error,
    });
  }
});

// EBTI 2 리포트 조회
reportRouter.get("/ebti-2/:userId", async (req, res) => {
  console.log("/report/ebti-2/:id, GET");

  const userId = Number(req.params.userId);

  try {
    const ebti2: Ebti2 | null = await prisma.ebti2.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createDate: "desc",
      },
      include: {
        user: {
          include: {
            manager: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "EBTI 2 리포트 조회 완료",
      data: ebti2,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 2 리포트 조회 오류",
      error: error,
    });
  }
});

// EBTI 리포트 조회
reportRouter.get("/ebti/:userId", async (req, res) => {
  console.log("/report/ebti/:id, GET");

  const userId = Number(req.params.userId);

  try {
    const ebti: Ebti | null = await prisma.ebti.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createDate: "desc",
      },
      include: {
        user: {
          include: {
            manager: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "EBTI 리포트 조회 완료",
      data: ebti,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 리포트 조회 오류",
      error: error,
    });
  }
});

// 맞춤플랜 리포트 조회
reportRouter.get("/customized-plan/:userId", async (req, res) => {
  console.log("/customized-plan/:userId, GET");

  const userId = Number(req.params.userId);
  const query: any = req.query;

  try {
    const customizedPlan: CustomizedPlan[] =
      await prisma.customizedPlan.findMany({
        where: {
          userId: userId,
          date: {
            gte: dayjs(query["date"]).startOf("D").format(),
            lte: dayjs(query["date"]).endOf("D").format(),
          },
        },
        orderBy: {
          startTime: "asc",
        },
        include: {
          user: {
            include: {
              manager: true,
            },
          },
        },
      });
    return res.status(200).json({
      msg: "맞춤플랜 리포트 조회 완료",
      data: customizedPlan,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "맞춤플랜 리포트 조회 오류",
      error: error,
    });
  }
});

// 맞춤 전략 리포트 조회
reportRouter.get("/customized-strategy/:id", async (req, res) => {
  console.log("/report/customized-strategy/:id, GET");

  const id = Number(req.params.id);
  const query: any = req.query;

  try {
    const learningAssessment: LearningAssessment | null =
      await prisma.learningAssessment.findUnique({
        where: {
          id: id,
        },
        include: {
          user: {
            include: {
              manager: true,
            },
          },
        },
      });

    const report = getCustomizedStrategy(learningAssessment);

    return res.status(200).json({
      msg: "맞춤 전략 리포트 조회 완료",
      data: { data: learningAssessment, report: report },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "맞춤 전략 리포트 조회 오류",
      error: error,
    });
  }
});
