import { LearningAssessment, PrismaClient } from "@prisma/client";
import { calcLearningAssessmentTime } from "../../utils/statistics";
import express from "express";
import {
  getLearningAssessmentResultData,
  learningScoreGrade,
} from "../../utils/smart-check/learning-assessment";
import dayjs from "dayjs";

export const learningAssessmentRouter = express.Router();
const prisma = new PrismaClient();

// 학습진단 생성
learningAssessmentRouter.post("/", async (req, res) => {
  console.log("/learning-assessment, POST");
  const {
    userId,
    subjectId,
    conceptTextbookName,
    questionTextbookName,
    advancedTextbookName,
    actualTextbookName,
    ...reqData
  } = req.body;

  const resultData = getLearningAssessmentResultData(req.body);

  try {
    const learningAssessment = await prisma.learningAssessment.create({
      data: {
        ...reqData,
        user: {
          connect: {
            id: userId,
          },
        },
        subject: {
          connect: {
            id: subjectId,
          },
        },
        conceptTextbook: {
          connectOrCreate: {
            where: {
              name: conceptTextbookName,
            },
            create: {
              name: conceptTextbookName,
            },
          },
        },
        questionTextbook: {
          connectOrCreate: {
            where: {
              name: questionTextbookName,
            },
            create: {
              name: questionTextbookName,
            },
          },
        },
        advancedTextbook: {
          connectOrCreate: {
            where: {
              name: advancedTextbookName,
            },
            create: {
              name: advancedTextbookName,
            },
          },
        },
        actualTextbook: {
          connectOrCreate: {
            where: {
              name: actualTextbookName,
            },
            create: {
              name: actualTextbookName,
            },
          },
        },
        ...resultData,
      },
    });

    return res.status(200).json({
      msg: "학습진단 생성 완료",
      data: learningAssessment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학습진단 생성 오류",
      error: error,
    });
  }
});

// 학습진단 목록 조회
learningAssessmentRouter.get("/", async (req, res) => {
  console.log("/learning-assessment, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const learningAssessment: [number, LearningAssessment[]] =
      await prisma.$transaction([
        prisma.learningAssessment.count({
          where: {
            ...(query["user-id"] && {
              userId: Number(query["user-id"]),
            }),
            ...(query["subject-id"] && {
              subjectId: Number(query["subject-id"]),
            }),
            user: {
              ...(query["search"] && {
                name: {
                  contains: query.search,
                },
              }),
              ...(query["grade-id"] && {
                gradeId: Number(query["grade-id"]),
              }),
              ...(query["class"] && {
                class: query["class"],
              }),
              ...(query["manager-id"] && {
                managerId: Number(query["manager-id"]),
              }),
            },
            createDate: {
              gte: query["start-date"] && new Date(query["start-date"]),
              lte: query["end-date"] && new Date(query["end-date"]),
            },
          },
        }),
        prisma.learningAssessment.findMany({
          ...(list !== 0 && {
            skip: list * (page - 1),
            take: list,
          }),
          ...(query["sort"]
            ? {
                orderBy: [
                  {
                    createDate: "desc",
                  },
                  { [query["sort"]]: query["order"] ? query["order"] : "desc" },
                ],
              }
            : { orderBy: [{ createDate: "desc" }] }),

          where: {
            ...(query["search"] && {
              name: {
                contains: query.search,
              },
            }),
            ...(query["user-id"] && {
              userId: Number(query["user-id"]),
            }),
            ...(query["subject-id"] && {
              subjectId: Number(query["subject-id"]),
            }),
            user: {
              ...(query["grade-id"] && {
                gradeId: Number(query["grade-id"]),
              }),
              ...(query["class"] && {
                class: query["class"],
              }),
              ...(query["manager-id"] && {
                managerId: Number(query["manager-id"]),
              }),
            },
            createDate: {
              gte: query["start-date"] && new Date(query["start-date"]),
              lte: query["end-date"] && new Date(query["end-date"]),
            },
          },
          include: {
            user: true,
          },
        }),
      ]);
    return res.status(200).json({
      msg: "학습진단 목록 조회 완료",
      data: learningAssessment,
    });
  } catch (error) {
    throw error;
    return res.status(400).json({
      msg: "학습진단 목록 조회 오류",
      error: error,
    });
  }
});

// 학습진단 리포트 전체 조회
learningAssessmentRouter.get("/report", async (req, res) => {
  console.log("/learning-assessment/report, GET");

  const query: any = req.query;

  try {
    const learningAssessment = await prisma.$transaction([
      prisma.learningAssessment.findMany({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
          ...(query["subject-id"] && {
            subjectId: Number(query["subject-id"]),
          }),
          user: {
            ...(query["search"] && {
              name: {
                contains: query.search,
              },
            }),
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
            }),
            ...(query["class"] && {
              class: query["class"],
            }),
            ...(query["manager-id"] && {
              managerId: Number(query["manager-id"]),
            }),
          },
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        include: {
          user: {
            select: {
              ebti1: {
                take: 1,
                orderBy: {
                  createDate: "desc",
                },
              },
            },
          },
        },
        orderBy: {
          createDate: "desc",
        },
      }),
      prisma.learningAssessment.aggregate({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
          ...(query["subject-id"] && {
            subjectId: Number(query["subject-id"]),
          }),
          user: {
            ...(query["search"] && {
              name: {
                contains: query.search,
              },
            }),
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
            }),
            ...(query["class"] && {
              class: query["class"],
            }),
            ...(query["manager-id"] && {
              managerId: Number(query["manager-id"]),
            }),
          },
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          concentrationHour: true,
          concentrationMinutes: true,
          concentration: true,
          understand: true,
          correctRate: true,
          taskComplete: true,
        },
        _min: {
          concentration: true,
          understand: true,
          correctRate: true,
          taskComplete: true,
        },
        _max: {
          concentration: true,
          understand: true,
          correctRate: true,
          taskComplete: true,
        },
      }),
    ]);

    let count = learningAssessment[0].length;
    let chaeum = 0;
    let saeum = 0;
    let kium = 0;
    let dotum = 0;

    let totalTime: number[] = [];
    let totalConcentrationTime: number[] = [];

    let conceptItem = [0, 0, 0, 0, 0];
    let questionItem = [0, 0, 0, 0, 0];
    let advancedItem = [0, 0, 0, 0, 0];
    let actualItem = [0, 0, 0, 0, 0];
    let learningCategory = [0, 0, 0, 0, 0];
    let weekPoint = [0, 0, 0, 0, 0];
    let reviewCycle = [0, 0, 0, 0];

    learningAssessment[0].map(data => {
      switch (data.user.ebti1[0].type) {
        case "chaeum":
          chaeum = chaeum + 1;
          break;
        case "saeum":
          saeum = saeum + 1;
          break;
        case "kium":
          kium = kium + 1;
          break;
        case "dotum":
          dotum = dotum + 1;
          break;
        default:
          break;
      }

      totalTime.push(data.hour * 60 + data.minutes);
      totalConcentrationTime.push(
        data.concentrationHour * 60 + data.concentrationMinutes,
      );

      conceptItem[data.conceptItem - 1] = conceptItem[data.conceptItem - 1] + 1;
      questionItem[data.questionItem - 1] =
        questionItem[data.questionItem - 1] + 1;
      advancedItem[data.advancedItem - 1] =
        advancedItem[data.advancedItem - 1] + 1;
      actualItem[data.actualItem - 1] = actualItem[data.actualItem - 1] + 1;
      learningCategory[data.learningCategory - 1] =
        learningCategory[data.learningCategory - 1] + 1;
      weekPoint[data.weekPoint - 1] = weekPoint[data.weekPoint - 1] + 1;
      reviewCycle[data.reviewCycle - 1] = reviewCycle[data.reviewCycle - 1] + 1;
    });

    return res.status(200).json({
      msg: "학습진단 리포트 전체 조회 완료",
      data: {
        ebti1: {
          chaeum: (chaeum / count) * 100,
          saeum: (saeum / count) * 100,
          kium: (kium / count) * 100,
          dotum: (dotum / count) * 100,
        },
        scoreTotal: learningAssessment[1]._avg.scoreTotal,
        mentalGrade: learningAssessment[1]._avg.mentalGrade,
        scoreGrade: learningScoreGrade(
          learningAssessment[1]._avg.scoreTotal || 0,
        ).grade,
        avgTime: calcLearningAssessmentTime(
          learningAssessment[1]._avg.hour || 0,
          learningAssessment[1]._avg.minutes || 0,
        ),
        minTime: calcLearningAssessmentTime(0, Math.min(...totalTime)),
        maxTime: calcLearningAssessmentTime(0, Math.max(...totalTime)),
        avgConcentrationTime: calcLearningAssessmentTime(
          learningAssessment[1]._avg.concentrationHour || 0,
          learningAssessment[1]._avg.concentrationMinutes || 0,
        ),
        minConcentrationTime: calcLearningAssessmentTime(
          0,
          Math.min(...totalConcentrationTime),
        ),
        maxConcentrationTime: calcLearningAssessmentTime(
          0,
          Math.max(...totalConcentrationTime),
        ),
        avgConcentration: learningAssessment[1]._avg.concentration,
        minConcentration: learningAssessment[1]._min.concentration,
        maxConcentration: learningAssessment[1]._max.concentration,
        avgUnderstand: learningAssessment[1]._avg.understand,
        minUnderstand: learningAssessment[1]._min.understand,
        maxUnderstand: learningAssessment[1]._max.understand,
        avgCorrectRate: learningAssessment[1]._avg.correctRate,
        minCorrectRate: learningAssessment[1]._min.correctRate,
        maxCorrectRate: learningAssessment[1]._max.correctRate,
        avgTaskComplete: learningAssessment[1]._avg.taskComplete,
        minTaskComplete: learningAssessment[1]._min.taskComplete,
        maxTaskComplete: learningAssessment[1]._max.taskComplete,
        conceptItem: conceptItem.map(data => (data / count) * 100),
        questionItem: questionItem.map(data => (data / count) * 100),
        advancedItem: advancedItem.map(data => (data / count) * 100),
        actualItem: actualItem.map(data => (data / count) * 100),
        learningCategory: learningCategory.map(data => (data / count) * 100),
        weekPoint: weekPoint.map(data => (data / count) * 100),
        reviewCycle: reviewCycle.map(data => (data / count) * 100),
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학습진단 리포트 전체 조회 오류",
      error: error,
    });
  }
});

// 학습진단 리포트 조회
learningAssessmentRouter.get(
  "/report/:managerId/:userId/:id",
  async (req, res) => {
    console.log("/learning-assessment/report/:userId/:id, GET");

    const userId = Number(req.params.userId);
    const managerId = Number(req.params.managerId);
    const query: any = req.query;
    const id = Number(req.params.id);

    try {
      const createDate = await prisma.learningAssessment.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          createDate: true,
        },
      });
      const learningAssessment = await prisma.$transaction([
        prisma.learningAssessment.findMany({
          take: 2,
          cursor: {
            id: id,
          },
          where: {
            userId: userId,
            subjectId: Number(query["subject-id"]),
          },
          include: {
            user: {
              select: {
                managerId: true,
              },
            },
          },
          orderBy: {
            createDate: "desc",
          },
        }),
        prisma.learningAssessment.findMany({
          where: {
            userId: userId,
            subjectId: Number(query["subject-id"]),
          },
        }),
        prisma.learningAssessment.aggregate({
          where: {
            userId: userId,
            subjectId: Number(query["subject-id"]),
          },
          _max: {
            hour: true,
            minutes: true,
            recHour: true,
            recMinutes: true,
            concentrationHour: true,
            concentrationMinutes: true,
            concentration: true,
            understand: true,
            correctRate: true,
            taskComplete: true,
          },
          _min: {
            concentration: true,
            understand: true,
            correctRate: true,
            taskComplete: true,
          },
          _avg: {
            recHour: true,
            recMinutes: true,
            concentrationHour: true,
            concentrationMinutes: true,
            concentration: true,
            understand: true,
            correctRate: true,
            taskComplete: true,
          },
        }),
        prisma.learningAssessment.findMany({
          where: {
            user: {
              managerId: Number(managerId),
            },
            createDate: {
              gte: dayjs(createDate?.createDate).startOf("M").format(),
              lte: dayjs(createDate?.createDate).endOf("M").format(),
            },
            subjectId: Number(query["subject-id"]),
          },
          select: {
            id: true,
            scoreGrade: true,
            concentrationHour: true,
            concentrationMinutes: true,
            user: true,
          },
          orderBy: [
            {
              scoreGrade: "desc",
            },
            {
              concentrationHour: "desc",
            },
            {
              concentrationMinutes: "desc",
            },
          ],
        }),
        prisma.learningAssessment.findMany({
          where: {
            user: {
              managerId: Number(managerId),
            },
            createDate: {
              gte: query["start-date"] && new Date(query["start-date"]),
              lte: query["end-date"] && new Date(query["end-date"]),
            },
            subjectId: Number(query["subject-id"]),
          },
          select: {
            id: true,
            scoreGrade: true,
            concentrationHour: true,
            concentrationMinutes: true,
            user: true,
          },
          orderBy: [
            {
              scoreGrade: "desc",
            },
            {
              concentrationHour: "desc",
            },
            {
              concentrationMinutes: "desc",
            },
          ],
        }),
      ]);

      const reportItemList = {
        conceptItem: learningAssessment[1].map(item => item.conceptItem),
        questionItem: learningAssessment[1].map(item => item.questionItem),
        advancedItem: learningAssessment[1].map(item => item.questionItem),
        actualItem: learningAssessment[1].map(item => item.questionItem),
      };

      const reportData = {
        conceptItem: [
          (reportItemList.conceptItem.filter(i => i === 1).length /
            reportItemList.conceptItem.length) *
            100,
          (reportItemList.conceptItem.filter(i => i === 2).length /
            reportItemList.conceptItem.length) *
            100,
          (reportItemList.conceptItem.filter(i => i === 3).length /
            reportItemList.conceptItem.length) *
            100,
          (reportItemList.conceptItem.filter(i => i === 4).length /
            reportItemList.conceptItem.length) *
            100,
          (reportItemList.conceptItem.filter(i => i === 5).length /
            reportItemList.conceptItem.length) *
            100,
        ],
        questionItem: [
          (reportItemList.questionItem.filter(i => i === 1).length /
            reportItemList.questionItem.length) *
            100,
          (reportItemList.questionItem.filter(i => i === 2).length /
            reportItemList.questionItem.length) *
            100,
          (reportItemList.questionItem.filter(i => i === 3).length /
            reportItemList.questionItem.length) *
            100,
          (reportItemList.questionItem.filter(i => i === 4).length /
            reportItemList.questionItem.length) *
            100,
          (reportItemList.questionItem.filter(i => i === 5).length /
            reportItemList.questionItem.length) *
            100,
        ],
        advancedItem: [
          (reportItemList.advancedItem.filter(i => i === 1).length /
            reportItemList.advancedItem.length) *
            100,
          (reportItemList.advancedItem.filter(i => i === 2).length /
            reportItemList.advancedItem.length) *
            100,
          (reportItemList.advancedItem.filter(i => i === 3).length /
            reportItemList.advancedItem.length) *
            100,
          (reportItemList.advancedItem.filter(i => i === 4).length /
            reportItemList.advancedItem.length) *
            100,
          (reportItemList.conceptItem.filter(i => i === 5).length /
            reportItemList.conceptItem.length) *
            100,
        ],
        actualItem: [
          (reportItemList.actualItem.filter(i => i === 1).length /
            reportItemList.actualItem.length) *
            100,
          (reportItemList.actualItem.filter(i => i === 2).length /
            reportItemList.actualItem.length) *
            100,
          (reportItemList.actualItem.filter(i => i === 3).length /
            reportItemList.actualItem.length) *
            100,
          (reportItemList.actualItem.filter(i => i === 4).length /
            reportItemList.actualItem.length) *
            100,
          (reportItemList.conceptItem.filter(i => i === 5).length /
            reportItemList.conceptItem.length) *
            100,
        ],
      };

      return res.status(200).json({
        msg: "학습진단 리포트 조회 완료",
        data: {
          ...learningAssessment[0],
          ...learningAssessment[2],
          report: reportData,
          rankIndex:
            learningAssessment[3].findIndex(data => data.id === id) + 1,
          rankTotal: learningAssessment[3].length,
        },
      });
    } catch (error) {
      return res.status(400).json({
        msg: "학습진단 리포트 조회 오류",
        error: error,
      });
    }
  },
);

// 학습진단 조회
learningAssessmentRouter.get("/:id", async (req, res) => {
  console.log("/learning-assessment/:id, GET");

  const id = Number(req.params.id);

  try {
    const learningAssessment: LearningAssessment | null =
      await prisma.learningAssessment.findUnique({
        where: {
          id: id,
        },
      });
    return res.status(200).json({
      msg: "학습진단 조회 완료",
      data: learningAssessment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학습진단 조회 오류",
      error: error,
    });
  }
});
