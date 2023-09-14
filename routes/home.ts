import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import express from "express";

export const homeRouter = express.Router();
const prisma = new PrismaClient();

// 관리자 홈 조회
homeRouter.get("/admin", async (req, res) => {
  console.log("/home/admin, GET");

  try {
    const userCount = await prisma.$transaction([
      prisma.user.count({
        where: {
          gradeId: 1,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 2,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 3,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 4,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 5,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 6,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 7,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 1,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 2,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 3,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 4,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 5,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 6,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 7,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
    ]);
    const learningAssessment = await prisma.$transaction([
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
            lte: dayjs().endOf("day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(1, "day").format(),
            lte: dayjs().endOf("D").subtract(1, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(2, "day").format(),
            lte: dayjs().endOf("D").subtract(2, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(3, "day").format(),
            lte: dayjs().endOf("D").subtract(3, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(4, "day").format(),
            lte: dayjs().endOf("D").subtract(4, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(5, "day").format(),
            lte: dayjs().endOf("D").subtract(5, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(6, "day").format(),
            lte: dayjs().endOf("D").subtract(6, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
    ]);
    const careerAssessment = await prisma.$transaction([
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
            lte: dayjs().endOf("day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(1, "day").format(),
            lte: dayjs().endOf("D").subtract(1, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(2, "day").format(),
            lte: dayjs().endOf("D").subtract(2, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(3, "day").format(),
            lte: dayjs().endOf("D").subtract(3, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(4, "day").format(),
            lte: dayjs().endOf("D").subtract(4, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(5, "day").format(),
            lte: dayjs().endOf("D").subtract(5, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("D").subtract(6, "day").format(),
            lte: dayjs().endOf("D").subtract(6, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
    ]);
    const score = await prisma.$transaction([
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 1,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 1,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 1,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 1,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 1,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 1,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 2,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 2,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 2,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 2,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 2,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 2,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 3,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 3,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 3,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 3,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 3,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 3,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 4,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 4,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 4,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 4,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 4,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 4,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 5,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 5,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 5,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 5,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 5,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 5,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 6,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 6,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 6,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 6,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 6,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 6,
          },
        },
        select: {
          averageScore: true,
        },
      }),
    ]);

    let scoreValue = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    let scoreCount = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    score.map((data, idx) => {
      data.map(item => {
        if (item.averageScore && item.averageScore !== 0) {
          (scoreValue[idx] = scoreValue[idx] + item.averageScore),
            (scoreCount[idx] = scoreCount[idx] + 1);
        }
      });
    });

    const trainer = await prisma.trainer.findMany({
      take: 6,
      orderBy: {
        createDate: "desc",
      },
      include: {
        subject: true,
      },
    });

    return res.status(200).json({
      msg: "관리자 홈 조회 완료",
      data: {
        userTotal: [
          userCount[0],
          userCount[1],
          userCount[2],
          userCount[3],
          userCount[4],
          userCount[5],
          userCount[6],
        ],
        newUserTotal: [
          userCount[7],
          userCount[8],
          userCount[9],
          userCount[10],
          userCount[11],
          userCount[12],
          userCount[13],
        ],
        smartCheck: {
          week: {
            learningAssessment: [
              learningAssessment[0],
              learningAssessment[1],
              learningAssessment[2],
              learningAssessment[3],
              learningAssessment[4],
              learningAssessment[5],
              learningAssessment[6],
            ],
            careerAssessment: [
              careerAssessment[0],
              careerAssessment[1],
              careerAssessment[2],
              careerAssessment[3],
              careerAssessment[4],
              careerAssessment[5],
              careerAssessment[6],
            ],
          },
          today: {
            learningAssessment: {
              middle: [
                learningAssessment[7],
                learningAssessment[9],
                learningAssessment[11],
                learningAssessment[13],
                learningAssessment[15],
                learningAssessment[17],
              ],
              high: [
                learningAssessment[8],
                learningAssessment[10],
                learningAssessment[12],
                learningAssessment[14],
                learningAssessment[16],
                learningAssessment[18],
              ],
            },
            careerAssessment: {
              middle: [
                careerAssessment[7],
                careerAssessment[9],
                careerAssessment[11],
                careerAssessment[13],
                careerAssessment[15],
                careerAssessment[17],
              ],
              high: [
                careerAssessment[8],
                careerAssessment[10],
                careerAssessment[12],
                careerAssessment[14],
                careerAssessment[16],
                careerAssessment[18],
              ],
            },
          },
        },
        score: scoreValue.map((item, idx) => item / scoreCount[idx]),
        trainer: trainer,
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "관리자 홈 조회 오류",
      error: error,
    });
  }
});

// 기관 홈 조회
homeRouter.get("/manager/:id", async (req, res) => {
  console.log("/home/admin, GET");

  const id = Number(req.params.id);

  try {
    const userCount = await prisma.$transaction([
      prisma.user.count({
        where: {
          gradeId: 1,
          managerId: id,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 2,
          managerId: id,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 3,
          managerId: id,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 4,
          managerId: id,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 5,
          managerId: id,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 6,
          managerId: id,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 7,
          managerId: id,
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 1,
          managerId: id,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 2,
          managerId: id,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 3,
          managerId: id,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 4,
          managerId: id,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 5,
          managerId: id,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 6,
          managerId: id,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
      prisma.user.count({
        where: {
          gradeId: 7,
          managerId: id,
          createDate: {
            gte: dayjs().startOf("M").format(),
          },
        },
      }),
    ]);
    const learningAssessment = await prisma.$transaction([
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
            lte: dayjs().endOf("day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(1, "day").format(),
            lte: dayjs().endOf("D").subtract(1, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(2, "day").format(),
            lte: dayjs().endOf("D").subtract(2, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(3, "day").format(),
            lte: dayjs().endOf("D").subtract(3, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(4, "day").format(),
            lte: dayjs().endOf("D").subtract(4, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(5, "day").format(),
            lte: dayjs().endOf("D").subtract(5, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(6, "day").format(),
            lte: dayjs().endOf("D").subtract(6, "day").format(),
          },
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.learningAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
    ]);
    const careerAssessment = await prisma.$transaction([
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
            lte: dayjs().endOf("day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(1, "day").format(),
            lte: dayjs().endOf("D").subtract(1, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(2, "day").format(),
            lte: dayjs().endOf("D").subtract(2, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(3, "day").format(),
            lte: dayjs().endOf("D").subtract(3, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(4, "day").format(),
            lte: dayjs().endOf("D").subtract(4, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(5, "day").format(),
            lte: dayjs().endOf("D").subtract(5, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("D").subtract(6, "day").format(),
            lte: dayjs().endOf("D").subtract(6, "day").format(),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 1,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 2,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 3,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 4,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 5,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 1,
              },
            },
            {
              user: {
                gradeId: 2,
              },
            },
            {
              user: {
                gradeId: 3,
              },
            },
          ],
        },
      }),
      prisma.careerAssessment.count({
        where: {
          user: {
            managerId: id,
          },
          createDate: {
            gte: dayjs().startOf("day").format(),
          },
          subjectId: 6,
          AND: [
            {
              user: {
                gradeId: 4,
              },
            },
            {
              user: {
                gradeId: 5,
              },
            },
            {
              user: {
                gradeId: 6,
              },
            },
          ],
        },
      }),
    ]);
    const score = await prisma.$transaction([
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 1,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 1,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 1,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 1,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 1,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 1,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 2,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 2,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 2,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 2,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 2,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 2,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 3,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 3,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 3,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 3,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 3,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 3,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 4,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 4,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 4,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 4,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 4,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 4,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 5,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 5,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 5,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 5,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 5,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 5,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 1,
          user: {
            gradeId: 6,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 2,
          user: {
            gradeId: 6,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 3,
          user: {
            gradeId: 6,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 4,
          user: {
            gradeId: 6,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 5,
          user: {
            gradeId: 6,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
      prisma.expectSchool.findMany({
        where: {
          subjectId: 6,
          user: {
            gradeId: 6,
            managerId: id,
          },
        },
        select: {
          averageScore: true,
        },
      }),
    ]);

    let scoreValue = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    let scoreCount = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    score.map((data, idx) => {
      data.map(item => {
        if (item.averageScore && item.averageScore !== 0) {
          (scoreValue[idx] = scoreValue[idx] + item.averageScore),
            (scoreCount[idx] = scoreCount[idx] + 1);
        }
      });
    });

    const trainer = await prisma.trainer.findMany({
      take: 6,
      where: {
        managerId: id,
      },
      orderBy: {
        createDate: "desc",
      },
      include: {
        subject: true,
      },
    });

    return res.status(200).json({
      msg: "기관 홈 조회 완료",
      data: {
        userTotal: [
          userCount[0],
          userCount[1],
          userCount[2],
          userCount[3],
          userCount[4],
          userCount[5],
          userCount[6],
        ],
        newUserTotal: [
          userCount[7],
          userCount[8],
          userCount[9],
          userCount[10],
          userCount[11],
          userCount[12],
          userCount[13],
        ],
        smartCheck: {
          week: {
            learningAssessment: [
              learningAssessment[0],
              learningAssessment[1],
              learningAssessment[2],
              learningAssessment[3],
              learningAssessment[4],
              learningAssessment[5],
              learningAssessment[6],
            ],
            careerAssessment: [
              careerAssessment[0],
              careerAssessment[1],
              careerAssessment[2],
              careerAssessment[3],
              careerAssessment[4],
              careerAssessment[5],
              careerAssessment[6],
            ],
          },
          today: {
            learningAssessment: {
              middle: [
                learningAssessment[7],
                learningAssessment[9],
                learningAssessment[11],
                learningAssessment[13],
                learningAssessment[15],
                learningAssessment[17],
              ],
              high: [
                learningAssessment[8],
                learningAssessment[10],
                learningAssessment[12],
                learningAssessment[14],
                learningAssessment[16],
                learningAssessment[18],
              ],
            },
            careerAssessment: {
              middle: [
                careerAssessment[7],
                careerAssessment[9],
                careerAssessment[11],
                careerAssessment[13],
                careerAssessment[15],
                careerAssessment[17],
              ],
              high: [
                careerAssessment[8],
                careerAssessment[10],
                careerAssessment[12],
                careerAssessment[14],
                careerAssessment[16],
                careerAssessment[18],
              ],
            },
          },
        },
        score: scoreValue.map((item, idx) => item / scoreCount[idx]),
        trainer: trainer,
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "기관 홈 조회 오류",
      error: error,
    });
  }
});
