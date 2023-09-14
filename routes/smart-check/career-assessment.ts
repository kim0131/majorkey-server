import { CareerAssessment, PrismaClient } from "@prisma/client";
import express from "express";
import { getCareerAssessmentResultData } from "../../utils/smart-check/career-assessment";

export const careerAssessmentRouter = express.Router();
const prisma = new PrismaClient();

// 진로진단 생성
careerAssessmentRouter.post("/", async (req, res) => {
  console.log("/career-assessment, POST");
  const { userId, subjectId, ...reqData } = req.body;

  try {
    const careerAssessment = await prisma.careerAssessment.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...(subjectId && {
          subject: {
            connect: {
              id: subjectId,
            },
          },
        }),
        ...reqData,
        ...getCareerAssessmentResultData(reqData),
      },
    });

    return res.status(200).json({
      msg: "진로진단 생성 완료",
      data: careerAssessment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로진단 생성 오류",
      error: error,
    });
  }
});

// 진로진단 목록 조회
careerAssessmentRouter.get("/", async (req, res) => {
  console.log("/career-assessment, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const careerAssessment: [number, CareerAssessment[]] =
      await prisma.$transaction([
        prisma.careerAssessment.count({
          where: {
            ...(query["user-id"] && {
              userId: Number(query["user-id"]),
            }),
            ...(query["type"] && {
              type: Number(query["type"]),
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
        prisma.careerAssessment.findMany({
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
            ...(query["type"] && {
              type: Number(query["type"]),
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
            user: true,
          },
        }),
      ]);
    return res.status(200).json({
      msg: "진로진단 목록 조회 완료",
      data: careerAssessment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로진단 목록 조회 오류",
      error: error,
    });
  }
});

// 진로진단 리포트 전체 조회
careerAssessmentRouter.get("/report", async (req, res) => {
  console.log("/career-assessment, GET");

  const query: any = req.query;

  try {
    const careerAssessment = await prisma.$transaction([
      prisma.careerAssessment.aggregate({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
          ...(query["type"] && {
            type: Number(query["type"]),
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
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
      prisma.careerAssessment.findMany({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
          ...(query["type"] && {
            type: Number(query["type"]),
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
        take: 3,
        orderBy: {
          careerRelevance: "desc",
        },
      }),
      prisma.careerAssessment.findMany({
        where: {
          ...(query["user-id"] && {
            userId: Number(query["user-id"]),
          }),
          ...(query["type"] && {
            type: Number(query["type"]),
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
    ]);

    let count = careerAssessment[2].length;

    let ability = [0, 0, 0];
    let technique = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    let activity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let field = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let role = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let subject = [0, 0, 0, 0, 0, 0];

    let typeScore = [0, 0, 0, 0, 0, 0, 0];
    let typeCount = [0, 0, 0, 0, 0, 0, 0];

    careerAssessment[2].map(data => {
      ability[data.ability - 1] = ability[data.ability - 1] + 1;
      technique[data.technique - 1] = technique[data.technique - 1] + 1;
      activity[data.activity - 1] = activity[data.activity - 1] + 1;
      field[data.field - 1] = field[data.field - 1] + 1;
      role[data.role - 1] = role[data.role - 1] + 1;
      subject[data.subjectId - 1] = subject[data.subjectId - 1] + 1;
      typeScore[data.type - 1] =
        typeScore[data.type - 1] +
        (data.satisfaction + data.careerRelevance + data.selfDirected) / 3;
      typeCount[data.type - 1] = typeCount[data.type - 1] + 1;
    });

    return res.status(200).json({
      msg: "진로진단 리포트 조회 완료",
      data: {
        count: count,
        avgScoreTotal: careerAssessment[0]._avg.scoreTotal,
        avgCareerRelevance: careerAssessment[0]._avg.careerRelevance,
        avgSatisfaction: careerAssessment[0]._avg.satisfaction,
        avgSelfDirected: careerAssessment[0]._avg.selfDirected,
        topic: careerAssessment[1],
        ability: ability.map(data => (data / count) * 100),
        technique: technique.map(data => (data / count) * 100),
        activity: activity.map(data => (data / count) * 100),
        field: field.map(data => (data / count) * 100),
        role: role.map(data => (data / count) * 100),
        subject: subject.map(data => (data / count) * 100),
        type: typeScore.map((data, i) => data / typeCount[i] || 0),
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로진단 리포트 조회 오류",
      error: error,
    });
  }
});

// 진로진단 리포트 조회
careerAssessmentRouter.get("/report/:userId/:id", async (req, res) => {
  console.log("/career-assessment/report/:userId, GET");

  const userId = Number(req.params.userId);
  const id = Number(req.params.id);
  const query: any = req.query;

  try {
    const careerAssessment = await prisma.$transaction([
      prisma.careerAssessment.findMany({
        take: 2,
        cursor: {
          id: id,
        },
        where: {
          userId: userId,
          type: Number(query.type),
        },
        orderBy: {
          createDate: "desc",
        },
      }),
      prisma.careerAssessment.findMany({
        where: {
          userId: userId,
        },
      }),
    ]);

    const reportItemList = {
      field: careerAssessment[1].map(item => item.field),
      subjectId: careerAssessment[1].map(item => item.subjectId),
      technique: careerAssessment[1].map(item => item.technique),
      activity: careerAssessment[1].map(item => item.activity),
      ability: careerAssessment[1].map(item => item.ability),
      ability1Detail: careerAssessment[1]
        .filter(item => item.ability === 1)
        .map(item => item.abilityDetail),
      ability2Detail: careerAssessment[1]
        .filter(item => item.ability === 2)
        .map(item => item.abilityDetail),
      ability3Detail: careerAssessment[1]
        .filter(item => item.ability === 3)
        .map(item => item.abilityDetail),
    };

    const reportData = {
      field: [
        (reportItemList.field.filter(i => i === 1).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 2).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 3).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 4).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 5).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 6).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 7).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 8).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 9).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 10).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 11).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 12).length /
          reportItemList.field.length) *
          100,
        (reportItemList.field.filter(i => i === 13).length /
          reportItemList.field.length) *
          100,
      ],
      subjectId: [
        (reportItemList.subjectId.filter(i => i === 1).length /
          reportItemList.subjectId.length) *
          100,
        (reportItemList.subjectId.filter(i => i === 2).length /
          reportItemList.subjectId.length) *
          100,
        (reportItemList.subjectId.filter(i => i === 3).length /
          reportItemList.subjectId.length) *
          100,
        (reportItemList.subjectId.filter(i => i === 4).length /
          reportItemList.subjectId.length) *
          100,
        (reportItemList.subjectId.filter(i => i === 5).length /
          reportItemList.subjectId.length) *
          100,
        (reportItemList.subjectId.filter(i => i === 6).length /
          reportItemList.subjectId.length) *
          100,
        (reportItemList.subjectId.filter(i => i === 7).length /
          reportItemList.subjectId.length) *
          100,
      ],
      technique: [
        (reportItemList.technique.filter(i => i === 1).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 2).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 3).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 4).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 5).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 6).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 7).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 8).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 9).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 10).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 11).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 12).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 13).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 14).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 15).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 16).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 17).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 18).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 19).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 20).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 21).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 22).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 23).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 24).length /
          reportItemList.technique.length) *
          100,
        (reportItemList.technique.filter(i => i === 25).length /
          reportItemList.technique.length) *
          100,
      ],
      activity: [
        (reportItemList.activity.filter(i => i === 1).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 2).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 3).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 4).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 5).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 6).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 7).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 8).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 9).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 10).length /
          reportItemList.activity.length) *
          100,
        (reportItemList.activity.filter(i => i === 11).length /
          reportItemList.activity.length) *
          100,
      ],
      ability: [
        (reportItemList.ability.filter(i => i === 1).length /
          reportItemList.ability.length) *
          100,
        (reportItemList.ability.filter(i => i === 2).length /
          reportItemList.ability.length) *
          100,
        (reportItemList.ability.filter(i => i === 3).length /
          reportItemList.ability.length) *
          100,
      ],
      ability1Detail: [
        (reportItemList.ability1Detail.filter(i => i === 1).length /
          reportItemList.ability1Detail.length) *
          100,
        (reportItemList.ability1Detail.filter(i => i === 2).length /
          reportItemList.ability1Detail.length) *
          100,
        (reportItemList.ability1Detail.filter(i => i === 3).length /
          reportItemList.ability1Detail.length) *
          100,
      ],
      ability2Detail: [
        (reportItemList.ability2Detail.filter(i => i === 1).length /
          reportItemList.ability2Detail.length) *
          100,
        (reportItemList.ability2Detail.filter(i => i === 2).length /
          reportItemList.ability2Detail.length) *
          100,
        (reportItemList.ability2Detail.filter(i => i === 3).length /
          reportItemList.ability2Detail.length) *
          100,
      ],
      ability3Detail: [
        (reportItemList.ability3Detail.filter(i => i === 1).length /
          reportItemList.ability3Detail.length) *
          100,
        (reportItemList.ability3Detail.filter(i => i === 2).length /
          reportItemList.ability3Detail.length) *
          100,
        (reportItemList.ability3Detail.filter(i => i === 3).length /
          reportItemList.ability3Detail.length) *
          100,
        (reportItemList.ability3Detail.filter(i => i === 4).length /
          reportItemList.ability3Detail.length) *
          100,
      ],
    };

    return res.status(200).json({
      msg: "진로진단 리포트 조회 완료",
      data: { ...careerAssessment[0], report: reportData },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로진단 리포트 조회 오류",
      error: error,
    });
  }
});

// 진로진단 조회
careerAssessmentRouter.get("/:id", async (req, res) => {
  console.log("/career-assessment/:id, GET");

  const id = Number(req.params.id);

  try {
    const careerAssessment: CareerAssessment | null =
      await prisma.careerAssessment.findUnique({
        where: {
          id: id,
        },
      });
    return res.status(200).json({
      msg: "진로진단 조회 완료",
      data: careerAssessment,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로진단 조회 오류",
      error: error,
    });
  }
});
