import { PrismaClient, CustomizedPlan } from "@prisma/client";
import express from "express";

export const customizedPlanRouter = express.Router();
const prisma = new PrismaClient();

// 맞춤 플랜 생성
customizedPlanRouter.post("/", async (req, res) => {
  console.log("/customized-plan, POST");

  const {
    userId,
    subjectId,
    conceptTextbookName,
    questionTextbookName,
    advancedTextbookName,
    actualTextbookName,
    ...reqData
  } = req.body;

  try {
    const customizedPlan = await prisma.customizedPlan.create({
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
      },
    });

    return res.status(200).json({
      msg: "맞춤 플랜 생성 완료",
      data: customizedPlan,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "맞춤 플랜 생성 오류",
      error: error,
    });
  }
});

// 맞춤 플랜 목록 조회
customizedPlanRouter.get("/", async (req, res) => {
  console.log("/customized-plan, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const customizedPlan: [number, CustomizedPlan[]] =
      await prisma.$transaction([
        prisma.customizedPlan.count({
          where: {
            ...(query.date && {
              date: new Date(query.date),
            }),
            ...(query["user-id"] && {
              userId: Number(query["user-id"]),
            }),
          },
        }),
        prisma.customizedPlan.findMany({
          ...(list !== 0 && {
            skip: list * (page - 1),
            take: list,
          }),
          where: {
            ...(query.date && {
              date: new Date(query.date),
            }),
            ...(query["user-id"] && {
              userId: Number(query["user-id"]),
            }),
          },
        }),
      ]);
    return res.status(200).json({
      msg: "맞춤 플랜 목록 조회 완료",
      data: customizedPlan,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "맞춤 플랜 목록 조회 오류",
      error: error,
    });
  }
});

// 맞춤 플랜 조회
customizedPlanRouter.get("/:id", async (req, res) => {
  console.log("/customized-plan/:id, GET");

  const id = Number(req.params.id);

  try {
    const customizedPlan: CustomizedPlan | null =
      await prisma.customizedPlan.findUnique({
        where: {
          id: id,
        },
      });
    return res.status(200).json({
      msg: "맞춤 플랜 조회 완료",
      data: customizedPlan,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "맞춤 플랜 조회 오류",
      error: error,
    });
  }
});

// 맞춤 플랜 업데이트
customizedPlanRouter.patch("/:id", async (req, res) => {
  console.log("/customized-plan/:id, PATCH");

  const id = Number(req.params.id);

  const {
    userId,
    subjectId,
    conceptTextbookName,
    questionTextbookName,
    advancedTextbookName,
    actualTextbookName,
    ...reqData
  } = req.body;

  try {
    const customizedPlan = await prisma.customizedPlan.update({
      where: {
        id: id,
      },
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
      },
    });

    return res.status(200).json({
      msg: "맞춤 플랜 업데이트 완료",
      data: customizedPlan,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "맞춤 플랜 업데이트 오류",
      error: error,
    });
  }
});

// 맞춤 플랜 삭제
customizedPlanRouter.delete("/:id", async (req, res) => {
  console.log("/customized-plan/:id, DELETE");

  const id = Number(req.params.id);

  try {
    const customizedPlan = await prisma.customizedPlan.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      msg: "맞춤 플랜 삭제 완료",
      data: customizedPlan,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "맞춤 플랜 삭제 오류",
      error: error,
    });
  }
});
