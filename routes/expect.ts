import {
  ExpectExam,
  ExpectSchool,
  ExpectStudent,
  PrismaClient,
} from "@prisma/client";
import express from "express";
import { expectGradeData } from "../data/expect";
import {
  getCalcExpectExamData,
  getCalcExpectSchoolData,
  getCalcExpectStudentData,
  getExpectExamData,
  getExpectSchoolData,
  getExpectStudentData,
} from "../utils/expect";

export const expectRouter = express.Router();
const prisma = new PrismaClient();

// 성적예측 내신 조회
expectRouter.get("/school", async (req, res) => {
  console.log("/expect/school, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const expectSchool: [ExpectSchool[], ExpectSchool[]] =
      await prisma.$transaction([
        prisma.expectSchool.findMany({
          ...(list !== 0 && {
            skip: list * (page - 1),
            take: list,
          }),
          where: {
            NOT: {
              AND: [
                { first1MidRate: null },
                { first1FinalRate: null },
                { first2MidRate: null },
                { first2FinalRate: null },
                { second1MidRate: null },
                { second1FinalRate: null },
                { second2MidRate: null },
                { second2FinalRate: null },
                { third1MidRate: null },
                { third1FinalRate: null },
                { third2MidRate: null },
                { third2FinalRate: null },
              ],
            },
            ...(query["manager-id"] && {
              user: {
                managerId: Number(query["manager-id"]),
              },
            }),
            ...(query["subject-id"] && {
              subjectId: Number(query["subject-id"]),
            }),
            ...(query["grade-id"] && {
              user: {
                gradeId: Number(query["grade-id"]),
              },
            }),
            ...(query.search && {
              OR: [
                {
                  user: {
                    name: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    class: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    phone: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    account: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    school: {
                      name: {
                        contains: query.search,
                      },
                    },
                  },
                },
              ],
            }),
          },
          include: {
            user: true,
          },
        }),
        prisma.expectSchool.findMany({
          ...(list !== 0 && {
            skip: list * (page - 1),
            take: list,
          }),
          orderBy: {
            createDate: "desc",
          },
          where: {
            NOT: {
              AND: [
                { first1MidRate: null },
                { first1FinalRate: null },
                { first2MidRate: null },
                { first2FinalRate: null },
                { second1MidRate: null },
                { second1FinalRate: null },
                { second2MidRate: null },
                { second2FinalRate: null },
                { third1MidRate: null },
                { third1FinalRate: null },
                { third2MidRate: null },
                { third2FinalRate: null },
              ],
            },
            ...(query["manager-id"] && {
              user: {
                managerId: Number(query["manager-id"]),
              },
            }),
            ...(query["subject-id"] && {
              subjectId: Number(query["subject-id"]),
            }),
            ...(query["grade-id"] && {
              user: {
                gradeId: Number(query["grade-id"]),
              },
            }),
            ...(query.search && {
              OR: [
                {
                  user: {
                    name: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    class: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    phone: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    account: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    school: {
                      name: {
                        contains: query.search,
                      },
                    },
                  },
                },
              ],
            }),
          },
          include: {
            user: true,
          },
        }),
      ]);

    const calcExpectData = getCalcExpectSchoolData(expectSchool[0]);

    return res.status(200).json({
      msg: "성적예측 내신 조회 완료",
      data: [expectSchool[0].length, expectSchool[1], calcExpectData],
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 내신 조회 오류",
      error: error,
    });
  }
});

// 성적예측 모의고사 조회
expectRouter.get("/exam", async (req, res) => {
  console.log("/expect/exam, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const expectExam: [ExpectExam[], ExpectExam[]] = await prisma.$transaction([
      prisma.expectExam.findMany({
        where: {
          NOT: {
            AND: [
              { first1Rate: null },
              { first2Rate: null },
              { first3Rate: null },
              { first4Rate: null },
              { second1Rate: null },
              { second2Rate: null },
              { second3Rate: null },
              { second4Rate: null },
              { third1Rate: null },
              { third2Rate: null },
              { third3Rate: null },
              { third4Rate: null },
              { third5Rate: null },
            ],
          },
          ...(query["manager-id"] && {
            user: {
              managerId: Number(query["manager-id"]),
            },
          }),
          ...(query["subject-id"] && {
            subjectId: Number(query["subject-id"]),
          }),
          ...(query["grade-id"] && {
            user: {
              gradeId: Number(query["grade-id"]),
            },
          }),
          ...(query.search && {
            OR: [
              {
                user: {
                  name: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  class: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  phone: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  account: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  school: {
                    name: {
                      contains: query.search,
                    },
                  },
                },
              },
            ],
          }),
        },
        include: {
          user: true,
        },
      }),
      prisma.expectExam.findMany({
        ...(list !== 0 && {
          skip: list * (page - 1),
          take: list,
        }),
        orderBy: {
          createDate: "desc",
        },
        where: {
          NOT: {
            AND: [
              { first1Rate: null },
              { first2Rate: null },
              { first3Rate: null },
              { first4Rate: null },
              { second1Rate: null },
              { second2Rate: null },
              { second3Rate: null },
              { second4Rate: null },
              { third1Rate: null },
              { third2Rate: null },
              { third3Rate: null },
              { third4Rate: null },
              { third5Rate: null },
            ],
          },
          ...(query["manager-id"] && {
            user: {
              managerId: Number(query["manager-id"]),
            },
          }),
          ...(query["subject-id"] && {
            subjectId: Number(query["subject-id"]),
          }),
          ...(query["grade-id"] && {
            user: {
              gradeId: Number(query["grade-id"]),
            },
          }),
          ...(query.search && {
            OR: [
              {
                user: {
                  name: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  class: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  phone: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  account: {
                    contains: query.search,
                  },
                },
              },
              {
                user: {
                  school: {
                    name: {
                      contains: query.search,
                    },
                  },
                },
              },
            ],
          }),
        },
        include: {
          user: true,
        },
      }),
    ]);

    const calcExpectData = getCalcExpectExamData(expectExam[0]);

    return res.status(200).json({
      msg: "성적예측 모의고사 조회 완료",
      data: [expectExam[0].length, expectExam[1], calcExpectData],
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 모의고사 조회 오류",
      error: error,
    });
  }
});

// 성적예측 학생부 조회
expectRouter.get("/student", async (req, res) => {
  console.log("/expect/student, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const expectStudent: [ExpectStudent[], ExpectStudent[]] =
      await prisma.$transaction([
        prisma.expectStudent.findMany({
          where: {
            NOT: {
              AND: [
                { first1Name: null },
                { first2Name: null },
                { second1Name: null },
                { second2Name: null },
                { third1Name: null },
                { third2Name: null },
              ],
            },
            ...(query["manager-id"] && {
              user: {
                managerId: Number(query["manager-id"]),
              },
            }),
            ...(query.type && {
              type: Number(query.type),
            }),
            ...(query["grade-id"] && {
              user: {
                gradeId: Number(query["grade-id"]),
              },
            }),
            ...(query.search && {
              OR: [
                {
                  user: {
                    name: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    class: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    phone: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    account: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    school: {
                      name: {
                        contains: query.search,
                      },
                    },
                  },
                },
              ],
            }),
          },
          include: {
            user: true,
          },
        }),
        prisma.expectStudent.findMany({
          ...(list !== 0 && {
            skip: list * (page - 1),
            take: list,
          }),
          orderBy: {
            createDate: "desc",
          },
          where: {
            NOT: {
              AND: [
                { first1Name: null },
                { first2Name: null },
                { second1Name: null },
                { second2Name: null },
                { third1Name: null },
                { third2Name: null },
              ],
            },
            ...(query["manager-id"] && {
              user: {
                managerId: Number(query["manager-id"]),
              },
            }),
            ...(query.type && {
              type: Number(query.type),
            }),
            ...(query["grade-id"] && {
              user: {
                gradeId: Number(query["grade-id"]),
              },
            }),
            ...(query.search && {
              OR: [
                {
                  user: {
                    name: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    class: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    phone: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    account: {
                      contains: query.search,
                    },
                  },
                },
                {
                  user: {
                    school: {
                      name: {
                        contains: query.search,
                      },
                    },
                  },
                },
              ],
            }),
          },
          include: {
            user: true,
          },
        }),
      ]);

    const calcExpectData = getCalcExpectStudentData(expectStudent[0]);

    return res.status(200).json({
      msg: "성적예측 학생부 조회 완료",
      data: [expectStudent[0].length, expectStudent[1], calcExpectData],
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 학생부 조회 오류",
      error: error,
    });
  }
});

// 성적예측 내신 성적 업데이트
expectRouter.patch("/school/:id", async (req, res) => {
  console.log("/expect/school/:id, PATCH");

  const id = Number(req.params.id);
  const reqData = req.body;

  try {
    const expectSchoolData: ExpectSchool | null =
      await prisma.expectSchool.findUnique({
        where: {
          id: id,
        },
      });

    const parseData = getExpectSchoolData(reqData, expectSchoolData);

    if (parseData === undefined) {
      return res.status(400).json({
        msg: "성적예측 학생부 업데이트 오류",
        error: "잘못된 요청값",
      });
    }

    const expectSchool: ExpectSchool | null = await prisma.expectSchool.update({
      where: {
        id: id,
      },
      data: parseData,
    });
    return res.status(200).json({
      msg: "성적예측 내신 성적 업데이트 완료",
      data: expectSchool,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 내신 성적 업데이트 오류",
      error: error,
    });
  }
});

// 성적예측 모의고사 성적 업데이트
expectRouter.patch("/exam/:id", async (req, res) => {
  console.log("/expect/exam/:id, PATCH");

  const id = Number(req.params.id);
  const reqData = req.body;

  try {
    const expectExamData: ExpectExam | null =
      await prisma.expectExam.findUnique({
        where: {
          id: id,
        },
      });

    const parseData = getExpectExamData(reqData, expectExamData);

    if (parseData === undefined) {
      return res.status(400).json({
        msg: "성적예측 학생부 업데이트 오류",
        error: "잘못된 요청값",
      });
    }

    const expectExam: ExpectExam | null = await prisma.expectExam.update({
      where: {
        id: id,
      },
      data: parseData,
    });

    return res.status(200).json({
      msg: "성적예측 모의고사 성적 업데이트 완료",
      data: expectExam,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 모의고사 성적 업데이트 오류",
      error: error,
    });
  }
});

// 성적예측 학생부 업데이트
expectRouter.patch("/student/:id", async (req, res) => {
  console.log("/expect/student/:id, PATCH");

  const id = Number(req.params.id);
  const reqData = req.body;

  try {
    const expectStudentData: ExpectStudent | null =
      await prisma.expectStudent.findUnique({
        where: {
          id: id,
        },
      });

    const parseData = getExpectStudentData(reqData, expectStudentData);

    if (parseData === undefined) {
      return res.status(400).json({
        msg: "성적예측 학생부 업데이트 오류",
        error: "잘못된 요청값",
      });
    }

    const expectStudent: ExpectStudent | null =
      await prisma.expectStudent.update({
        where: {
          id: id,
        },
        data: parseData,
      });
    return res.status(200).json({
      msg: "성적예측 학생부 업데이트 완료",
      data: expectStudent,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 학생부 업데이트 오류",
      error: error,
    });
  }
});

// 성적예측
expectRouter.patch("/record", async (req, res) => {
  console.log("/expect/record, PATCH");

  const reqData = req.body;
  const currentGrade = expectGradeData[reqData.gradeId - 1];
  const currentTotalScore =
    reqData.prepareDate * currentGrade.prepareDate +
    reqData.prepare * currentGrade.prepare +
    reqData.time * currentGrade.time +
    reqData.difficulty * currentGrade.difficulty +
    reqData.content * currentGrade.content +
    reqData.memorize * currentGrade.memorize +
    reqData.real * currentGrade.real +
    reqData.correct * currentGrade.correct +
    reqData.perfection * currentGrade.perfection;

  const currentExpectScore =
    (reqData.beforeScore + currentTotalScore) / 2 +
    (reqData.prepare * 3 -
      (reqData.beforePrepare * 2 - reqData.beforeSatisfaction));

  // ((이전성적+이번시험 점수합계)/2) + (이번시험준비도*3 - (지난시험준비도*2 + 지난시험만족도))

  try {
    if (reqData.type === 1) {
      const expectSchool = await prisma.expectSchool.update({
        where: {
          id: reqData.id,
        },
        data: {
          expectScore: currentExpectScore,
          beforeExpectScore: reqData.beforeScore,
        },
      });
      return res.status(200).json({
        msg: "성적예측 완료",
        data: expectSchool,
      });
    } else {
      const expectExam = await prisma.expectExam.update({
        where: {
          id: reqData.id,
        },
        data: {
          expectScore: currentExpectScore,
          beforeExpectScore: reqData.beforeScore,
        },
      });
      return res.status(200).json({
        msg: "성적예측 완료",
        data: expectExam,
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "성적예측 학생부 업데이트 오류",
      error: error,
    });
  }
});
