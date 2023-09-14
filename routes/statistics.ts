import { Subject, PrismaClient } from "@prisma/client";
import express from "express";
import { careerScoreGrade } from "../utils/smart-check/career-assessment";
import { learningScoreGrade } from "../utils/smart-check/learning-assessment";
import {
  calcLearningAssessmentAvgTime,
  calcLearningAssessmentTime,
} from "../utils/statistics";

export const statisticsRouter = express.Router();
const prisma = new PrismaClient();

// EBTI 통계 조회
statisticsRouter.get("/ebti", async (req, res) => {
  console.log("/statistics/ebti, GET");

  const query: any = req.query;

  try {
    const ebti1Result = await prisma.$transaction([
      prisma.ebti1.count({
        where: {
          type: "chaeum",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti1.count({
        where: {
          type: "saeum",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti1.count({
        where: {
          type: "kium",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti1.count({
        where: {
          type: "dotum",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti1.count({
        where: {
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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

    const ebti2Result = await prisma.$transaction([
      prisma.ebti2.count({
        where: {
          type: "language",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          type: "math",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          type: "view",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          type: "body",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          type: "music",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          type: "nature",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          type: "self",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          type: "interpersonal",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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

    const ebtiResult = await prisma.$transaction([
      prisma.ebti.count({
        where: {
          type: "real",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti.count({
        where: {
          type: "habit",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti.count({
        where: {
          type: "research",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti.count({
        where: {
          type: "progress",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti.count({
        where: {
          type: "society",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti.count({
        where: {
          type: "art",
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.ebti2.count({
        where: {
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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

    return res.status(200).json({
      msg: "EBTI 통계 조회 완료",
      data: {
        ebti1Result: {
          chaeum: Math.round((ebti1Result[0] / ebti1Result[4]) * 100) || 0,
          saeum: Math.round((ebti1Result[1] / ebti1Result[4]) * 100) || 0,
          kium: Math.round((ebti1Result[2] / ebti1Result[4]) * 100) || 0,
          dotum: Math.round((ebti1Result[3] / ebti1Result[4]) * 100) || 0,
        },
        ebti2Result: {
          language: Math.round((ebti2Result[0] / ebti2Result[8]) * 100) || 0,
          math: Math.round((ebti2Result[1] / ebti2Result[8]) * 100) || 0,
          view: Math.round((ebti2Result[2] / ebti2Result[8]) * 100) || 0,
          body: Math.round((ebti2Result[3] / ebti2Result[8]) * 100) || 0,
          music: Math.round((ebti2Result[4] / ebti2Result[8]) * 100) || 0,
          nature: Math.round((ebti2Result[5] / ebti2Result[8]) * 100) || 0,
          self: Math.round((ebti2Result[6] / ebti2Result[8]) * 100) || 0,
          interpersonal:
            Math.round((ebti2Result[7] / ebti2Result[8]) * 100) || 0,
        },
        ebtiResult: {
          real: Math.round((ebtiResult[0] / ebtiResult[6]) * 100) || 0,
          habit: Math.round((ebtiResult[1] / ebtiResult[6]) * 100) || 0,
          research: Math.round((ebtiResult[2] / ebtiResult[6]) * 100) || 0,
          progress: Math.round((ebtiResult[3] / ebtiResult[6]) * 100) || 0,
          society: Math.round((ebtiResult[4] / ebtiResult[6]) * 100) || 0,
          art: Math.round((ebtiResult[5] / ebtiResult[6]) * 100) || 0,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "EBTI 통계 조회 오류",
      error: error,
    });
  }
});

// 학습진단 통계 조회
statisticsRouter.get("/learning-assessment", async (req, res) => {
  console.log("/statistics/learning-assessment, GET");

  const query: any = req.query;

  try {
    const subjectResult = await prisma.$transaction([
      prisma.learningAssessment.aggregate({
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          concentrationHour: true,
          concentrationMinutes: true,
          understand: true,
          concentration: true,
        },
        where: {
          subjectId: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.learningAssessment.aggregate({
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          concentrationHour: true,
          concentrationMinutes: true,
          understand: true,
          concentration: true,
        },
        where: {
          subjectId: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.learningAssessment.aggregate({
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          concentrationHour: true,
          concentrationMinutes: true,
          understand: true,
          concentration: true,
        },
        where: {
          subjectId: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.learningAssessment.aggregate({
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          concentrationHour: true,
          concentrationMinutes: true,
          understand: true,
          concentration: true,
        },
        where: {
          subjectId: 4,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.learningAssessment.aggregate({
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          concentrationHour: true,
          concentrationMinutes: true,
          understand: true,
          concentration: true,
        },
        where: {
          subjectId: 5,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.learningAssessment.aggregate({
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          concentrationHour: true,
          concentrationMinutes: true,
          understand: true,
          concentration: true,
        },
        where: {
          subjectId: 6,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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

    return res.status(200).json({
      msg: "학습진단 통계 조회 완료",
      data: {
        scoreGrade: {
          science: subjectResult[0]._avg.scoreTotal
            ? learningScoreGrade(subjectResult[0]._avg.scoreTotal).grade
            : null,
          english: subjectResult[1]._avg.scoreTotal
            ? learningScoreGrade(subjectResult[1]._avg.scoreTotal).grade
            : null,
          math: subjectResult[2]._avg.scoreTotal
            ? learningScoreGrade(subjectResult[2]._avg.scoreTotal).grade
            : null,
          korean: subjectResult[3]._avg.scoreTotal
            ? learningScoreGrade(subjectResult[3]._avg.scoreTotal).grade
            : null,
          society: subjectResult[4]._avg.scoreTotal
            ? learningScoreGrade(subjectResult[4]._avg.scoreTotal).grade
            : null,
          language: subjectResult[5]._avg.scoreTotal
            ? learningScoreGrade(subjectResult[5]._avg.scoreTotal).grade
            : null,
        },
        mentalGrade: {
          science: subjectResult[0]._avg.mentalGrade,
          english: subjectResult[1]._avg.mentalGrade,
          math: subjectResult[2]._avg.mentalGrade,
          korean: subjectResult[3]._avg.mentalGrade,
          society: subjectResult[4]._avg.mentalGrade,
          language: subjectResult[5]._avg.mentalGrade,
        },
        time: {
          science: calcLearningAssessmentTime(
            subjectResult[0]._avg.hour!,
            subjectResult[0]._avg.minutes!,
          ),
          english: calcLearningAssessmentTime(
            subjectResult[1]._avg.hour!,
            subjectResult[1]._avg.minutes!,
          ),
          math: calcLearningAssessmentTime(
            subjectResult[2]._avg.hour!,
            subjectResult[2]._avg.minutes!,
          ),
          korean: calcLearningAssessmentTime(
            subjectResult[3]._avg.hour!,
            subjectResult[3]._avg.minutes!,
          ),
          society: calcLearningAssessmentTime(
            subjectResult[4]._avg.hour!,
            subjectResult[4]._avg.minutes!,
          ),
          language: calcLearningAssessmentTime(
            subjectResult[5]._avg.hour!,
            subjectResult[5]._avg.minutes!,
          ),
        },
        concentrationTime: {
          science: calcLearningAssessmentTime(
            subjectResult[0]._avg.concentrationHour!,
            subjectResult[0]._avg.concentrationMinutes!,
          ),
          english: calcLearningAssessmentTime(
            subjectResult[1]._avg.concentrationHour!,
            subjectResult[1]._avg.concentrationMinutes!,
          ),
          math: calcLearningAssessmentTime(
            subjectResult[2]._avg.concentrationHour!,
            subjectResult[2]._avg.concentrationMinutes!,
          ),
          korean: calcLearningAssessmentTime(
            subjectResult[3]._avg.concentrationHour!,
            subjectResult[3]._avg.concentrationMinutes!,
          ),
          society: calcLearningAssessmentTime(
            subjectResult[4]._avg.concentrationHour!,
            subjectResult[4]._avg.concentrationMinutes!,
          ),
          language: calcLearningAssessmentTime(
            subjectResult[5]._avg.concentrationHour!,
            subjectResult[5]._avg.concentrationMinutes!,
          ),
        },
        understand: {
          science: subjectResult[0]._avg.understand,
          english: subjectResult[1]._avg.understand,
          math: subjectResult[2]._avg.understand,
          korean: subjectResult[3]._avg.understand,
          society: subjectResult[4]._avg.understand,
          language: subjectResult[5]._avg.understand,
        },
        concentration: {
          science: subjectResult[0]._avg.concentration,
          english: subjectResult[1]._avg.concentration,
          math: subjectResult[2]._avg.concentration,
          korean: subjectResult[3]._avg.concentration,
          society: subjectResult[4]._avg.concentration,
          language: subjectResult[5]._avg.concentration,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "학습진단 통계 조회 오류",
      error: error,
    });
  }
});

// 진로진단 통계 조회
statisticsRouter.get("/career-assessment", async (req, res) => {
  console.log("/statistics/career-assessment, GET");

  const query: any = req.query;

  try {
    const typeResult = await prisma.$transaction([
      prisma.careerAssessment.aggregate({
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
        where: {
          type: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.aggregate({
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
        where: {
          type: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.aggregate({
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
        where: {
          type: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.aggregate({
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
        where: {
          type: 4,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.aggregate({
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
        where: {
          type: 5,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.aggregate({
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
        where: {
          type: 6,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.aggregate({
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
        where: {
          type: 7,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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

    const abilityResult = await prisma.$transaction([
      prisma.careerAssessment.count({
        where: {
          type: 1,
          ability: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 1,
          ability: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 1,
          ability: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 2,
          ability: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 2,
          ability: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 2,
          ability: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 3,
          ability: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 3,
          ability: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 3,
          ability: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 4,
          ability: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 4,
          ability: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 4,
          ability: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 5,
          ability: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 5,
          ability: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 5,
          ability: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 6,
          ability: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 6,
          ability: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 6,
          ability: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 7,
          ability: 1,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 7,
          ability: 2,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          type: 7,
          ability: 3,
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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
      prisma.careerAssessment.count({
        where: {
          user: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
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

    return res.status(200).json({
      msg: "진로진단 통계 조회 완료",
      data: {
        ability: {
          study: {
            circles:
              Math.round((abilityResult[0] / abilityResult[21]) * 100) || 0,
            read: Math.round((abilityResult[1] / abilityResult[21]) * 100) || 0,
            rally:
              Math.round((abilityResult[2] / abilityResult[21]) * 100) || 0,
            specialty:
              Math.round((abilityResult[3] / abilityResult[21]) * 100) || 0,
            volunteer:
              Math.round((abilityResult[4] / abilityResult[21]) * 100) || 0,
            career:
              Math.round((abilityResult[5] / abilityResult[21]) * 100) || 0,
            activity:
              Math.round((abilityResult[6] / abilityResult[21]) * 100) || 0,
          },
          course: {
            circles:
              Math.round((abilityResult[7] / abilityResult[21]) * 100) || 0,
            read: Math.round((abilityResult[8] / abilityResult[21]) * 100) || 0,
            rally:
              Math.round((abilityResult[9] / abilityResult[21]) * 100) || 0,
            specialty:
              Math.round((abilityResult[10] / abilityResult[21]) * 100) || 0,
            volunteer:
              Math.round((abilityResult[11] / abilityResult[21]) * 100) || 0,
            career:
              Math.round((abilityResult[12] / abilityResult[21]) * 100) || 0,
            activity:
              Math.round((abilityResult[13] / abilityResult[21]) * 100) || 0,
          },
          community: {
            circles:
              Math.round((abilityResult[14] / abilityResult[21]) * 100) || 0,
            read:
              Math.round((abilityResult[15] / abilityResult[21]) * 100) || 0,
            rally:
              Math.round((abilityResult[16] / abilityResult[21]) * 100) || 0,
            specialty:
              Math.round((abilityResult[17] / abilityResult[21]) * 100) || 0,
            volunteer:
              Math.round((abilityResult[18] / abilityResult[21]) * 100) || 0,
            career:
              Math.round((abilityResult[19] / abilityResult[21]) * 100) || 0,
            activity:
              Math.round((abilityResult[20] / abilityResult[21]) * 100) || 0,
          },
        },
        satisfaction: {
          circles: typeResult[0]._avg.satisfaction,
          read: typeResult[1]._avg.satisfaction,
          rally: typeResult[2]._avg.satisfaction,
          specialty: typeResult[3]._avg.satisfaction,
          volunteer: typeResult[4]._avg.satisfaction,
          career: typeResult[5]._avg.satisfaction,
          activity: typeResult[6]._avg.satisfaction,
        },
        careerRelevance: {
          circles: typeResult[0]._avg.careerRelevance,
          read: typeResult[1]._avg.careerRelevance,
          rally: typeResult[2]._avg.careerRelevance,
          specialty: typeResult[3]._avg.careerRelevance,
          volunteer: typeResult[4]._avg.careerRelevance,
          career: typeResult[5]._avg.careerRelevance,
          activity: typeResult[6]._avg.careerRelevance,
        },
        selfDirected: {
          circles: typeResult[0]._avg.selfDirected,
          read: typeResult[1]._avg.selfDirected,
          rally: typeResult[2]._avg.selfDirected,
          specialty: typeResult[3]._avg.selfDirected,
          volunteer: typeResult[4]._avg.selfDirected,
          career: typeResult[5]._avg.selfDirected,
          activity: typeResult[6]._avg.selfDirected,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "진로진단 통계 조회 오류",
      error: error,
    });
  }
});

// 기타 통계 조회
statisticsRouter.get("/etc", async (req, res) => {
  console.log("/statistics/etc, GET");

  const query: any = req.query;

  try {
    const careerResult = await prisma.career.findMany({
      include: {
        careerDetail: {
          where: {
            user: {
              some: {
                ...(query["grade-id"] && {
                  gradeId: Number(query["grade-id"]),
                }),
                ...(query["manager-id"] && {
                  managerId: Number(query["manager-id"]),
                }),
                createDate: {
                  gte: query["start-date"] && new Date(query["start-date"]),
                  lte: query["end-date"] && new Date(query["end-date"]),
                },
              },
            },
          },
          select: {
            _count: {
              select: {
                user: true,
              },
            },
          },
        },
      },
    });

    const parseCareerResult = careerResult.map(data => {
      let count = 0;
      data.careerDetail.map(item => {
        count = count + item["_count"].user;
      });
      return { id: data.id, name: data.name, user: count };
    });

    const careerDetailResult = await prisma.careerDetail.findMany({
      where: {
        user: {
          some: {
            ...(query["grade-id"] && {
              gradeId: Number(query["grade-id"]),
            }),
            ...(query["manager-id"] && {
              managerId: Number(query["manager-id"]),
            }),
            createDate: {
              gte: query["start-date"] && new Date(query["start-date"]),
              lte: query["end-date"] && new Date(query["end-date"]),
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: { user: true },
        },
      },
      orderBy: {
        user: {
          _count: "desc",
        },
      },
      take: 15,
    });

    const subjectResult = await prisma.$transaction([
      prisma.subject.findMany({
        where: {
          less: {
            some: {
              ...(query["grade-id"] && {
                gradeId: Number(query["grade-id"]),
              }),
              ...(query["manager-id"] && {
                managerId: Number(query["manager-id"]),
              }),
              createDate: {
                gte: query["start-date"] && new Date(query["start-date"]),
                lte: query["end-date"] && new Date(query["end-date"]),
              },
            },
          },
        },
        take: 10,
        orderBy: {
          less: {
            _count: "desc",
          },
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              less: true,
            },
          },
        },
      }),
      prisma.subject.findMany({
        where: {
          well: {
            some: {
              ...(query["grade-id"] && {
                gradeId: Number(query["grade-id"]),
              }),
              ...(query["manager-id"] && {
                managerId: Number(query["manager-id"]),
              }),
              createDate: {
                gte: query["start-date"] && new Date(query["start-date"]),
                lte: query["end-date"] && new Date(query["end-date"]),
              },
            },
          },
        },
        take: 10,
        orderBy: {
          well: {
            _count: "desc",
          },
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              well: true,
            },
          },
        },
      }),
      prisma.subject.findMany({
        where: {
          hate: {
            some: {
              ...(query["grade-id"] && {
                gradeId: Number(query["grade-id"]),
              }),
              ...(query["manager-id"] && {
                managerId: Number(query["manager-id"]),
              }),
              createDate: {
                gte: query["start-date"] && new Date(query["start-date"]),
                lte: query["end-date"] && new Date(query["end-date"]),
              },
            },
          },
        },
        take: 10,
        orderBy: {
          hate: {
            _count: "desc",
          },
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              hate: true,
            },
          },
        },
      }),
      prisma.subject.findMany({
        where: {
          favorite: {
            some: {
              ...(query["grade-id"] && {
                gradeId: Number(query["grade-id"]),
              }),
              ...(query["manager-id"] && {
                managerId: Number(query["manager-id"]),
              }),
              createDate: {
                gte: query["start-date"] && new Date(query["start-date"]),
                lte: query["end-date"] && new Date(query["end-date"]),
              },
            },
          },
        },
        take: 10,
        orderBy: {
          favorite: {
            _count: "desc",
          },
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              favorite: true,
            },
          },
        },
      }),
      prisma.user.count(),
    ]);

    const parseSubjectResult = {
      less: subjectResult[0].map(data => ({
        id: data.id,
        name: data.name,
        count: Math.round((data["_count"].less / subjectResult[4]) * 100) || 0,
      })),
      well: subjectResult[1].map(data => ({
        id: data.id,
        name: data.name,
        count: Math.round((data["_count"].well / subjectResult[4]) * 100) || 0,
      })),
      hate: subjectResult[2].map(data => ({
        id: data.id,
        name: data.name,
        count: Math.round((data["_count"].hate / subjectResult[4]) * 100) || 0,
      })),
      favorite: subjectResult[3].map(data => ({
        id: data.id,
        name: data.name,
        count:
          Math.round((data["_count"].favorite / subjectResult[4]) * 100) || 0,
      })),
    };

    return res.status(200).json({
      msg: "기타 통계 조회 완료",
      data: {
        career: parseCareerResult,
        careerDetail: careerDetailResult,
        subject: parseSubjectResult,
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "기타 통계 조회 오류",
      error: error,
    });
  }
});

// 사용자 학습진단 통계 조회
statisticsRouter.get("/learning-assessment/:id", async (req, res) => {
  console.log("/statistics/learning-assessment/:id, GET");

  const query: any = req.query;
  const userId = Number(req.params.id);

  try {
    const subjectResult = await prisma.$transaction([
      prisma.learningAssessment.aggregate({
        _sum: {
          hour: true,
          minutes: true,
        },
        _avg: {
          scoreTotal: true,
          mentalGrade: true,
          hour: true,
          minutes: true,
          understand: true,
          concentration: true,
          correctRate: true,
          taskComplete: true,
          duration: true,
        },
        _count: true,
        where: {
          subjectId: Number(query["subject-id"]),
          userId: userId,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
      }),
      prisma.learningAssessment.findMany({
        take: 2,
        where: {
          subjectId: Number(query["subject-id"]),
          userId: userId,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        orderBy: {
          createDate: "desc",
        },
        select: {
          conceptTextbookName: true,
          questionTextbookName: true,
          advancedTextbookName: true,
          actualTextbookName: true,
        },
      }),
    ]);

    return res.status(200).json({
      msg: "사용자 학습진단 통계 조회 완료",
      data: {
        totalTime: calcLearningAssessmentTime(
          subjectResult[0]._sum.hour!,
          subjectResult[0]._sum.minutes!,
        ),
        avgTime: calcLearningAssessmentAvgTime(
          subjectResult[0]._sum.hour!,
          subjectResult[0]._sum.minutes!,
          subjectResult[0]._avg.duration!,
          subjectResult[0]._count,
        ),
        efficiency:
          (subjectResult[0]._avg.understand! +
            subjectResult[0]._avg.concentration!) /
          2,
        count: subjectResult[0]._count,
        scoreGrade: subjectResult[0]._avg.scoreTotal
          ? learningScoreGrade(subjectResult[0]._avg.scoreTotal).grade
          : null,
        mentalGrade: subjectResult[0]._avg.mentalGrade,
        understand: subjectResult[0]._avg.understand,
        concentration: subjectResult[0]._avg.concentration,
        correctRate: subjectResult[0]._avg.correctRate,
        taskComplete: subjectResult[0]._avg.taskComplete,
        textbook: subjectResult[1],
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "사용자 학습진단 통계 조회 오류",
      error: error,
    });
  }
});

// 사용자 진로진단 통계 조회
statisticsRouter.get("/career-assessment/:id", async (req, res) => {
  console.log("/statistics/career-assessment/:id, GET");

  const query: any = req.query;
  const userId = Number(req.params.id);

  try {
    const subjectResult = await prisma.$transaction([
      prisma.careerAssessment.aggregate({
        _avg: {
          scoreTotal: true,
          careerRelevance: true,
        },
        _count: true,
        where: {
          type: Number(query["type"]),
          userId: userId,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
      }),
      prisma.careerAssessment.findMany({
        take: 3,
        where: {
          type: Number(query["type"]),
          userId: userId,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        orderBy: {
          careerRelevance: "desc",
        },
        select: {
          topic: true,
          careerRelevance: true,
        },
      }),
    ]);

    const abilityResult = await prisma.$transaction([
      prisma.careerAssessment.count({
        where: {
          type: Number(query["type"]),
          userId: userId,
          ability: 1,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          type: Number(query["type"]),
          userId: userId,
          ability: 2,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
      }),
      prisma.careerAssessment.count({
        where: {
          type: Number(query["type"]),
          userId: userId,
          ability: 3,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
      }),
    ]);

    const typeResult = await prisma.$transaction([
      prisma.careerAssessment.aggregate({
        where: {
          userId: userId,
          type: 1,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
      prisma.careerAssessment.aggregate({
        where: {
          userId: userId,
          type: 2,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
      prisma.careerAssessment.aggregate({
        where: {
          userId: userId,
          type: 3,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
      prisma.careerAssessment.aggregate({
        where: {
          userId: userId,
          type: 4,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
      prisma.careerAssessment.aggregate({
        where: {
          userId: userId,
          type: 5,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
      prisma.careerAssessment.aggregate({
        where: {
          userId: userId,
          type: 6,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
      prisma.careerAssessment.aggregate({
        where: {
          userId: userId,
          type: 7,
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _avg: {
          satisfaction: true,
          careerRelevance: true,
          selfDirected: true,
        },
      }),
    ]);

    return res.status(200).json({
      msg: "사용자 진로진단 통계 조회 완료",
      data: {
        top: subjectResult[1],
        count: subjectResult[0]._count,
        scoreGrade: subjectResult[0]._avg.scoreTotal
          ? careerScoreGrade(subjectResult[0]._avg.scoreTotal)
          : null,
        careerRelevance: subjectResult[0]._avg.careerRelevance,
        ability: {
          study: (abilityResult[0] / subjectResult[0]._count) * 100,
          course: (abilityResult[1] / subjectResult[0]._count) * 100,
          community: (abilityResult[2] / subjectResult[0]._count) * 100,
        },
        topic: {
          circles:
            ((typeResult[0]._avg.satisfaction || 0) +
              (typeResult[0]._avg.careerRelevance || 0) +
              (typeResult[0]._avg.selfDirected || 0)) /
            3,
          read:
            ((typeResult[1]._avg.satisfaction || 0) +
              (typeResult[1]._avg.careerRelevance || 0) +
              (typeResult[1]._avg.selfDirected || 0)) /
            3,
          rally:
            ((typeResult[2]._avg.satisfaction || 0) +
              (typeResult[2]._avg.careerRelevance || 0) +
              (typeResult[2]._avg.selfDirected || 0)) /
            3,
          specialty:
            ((typeResult[3]._avg.satisfaction || 0) +
              (typeResult[3]._avg.careerRelevance || 0) +
              (typeResult[3]._avg.selfDirected || 0)) /
            3,
          volunteer:
            ((typeResult[4]._avg.satisfaction || 0) +
              (typeResult[4]._avg.careerRelevance || 0) +
              (typeResult[4]._avg.selfDirected || 0)) /
            3,
          career:
            ((typeResult[5]._avg.satisfaction || 0) +
              (typeResult[5]._avg.careerRelevance || 0) +
              (typeResult[5]._avg.selfDirected || 0)) /
            3,
          activity:
            ((typeResult[6]._avg.satisfaction || 0) +
              (typeResult[6]._avg.careerRelevance || 0) +
              (typeResult[6]._avg.selfDirected || 0)) /
            3,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      msg: "사용자 진로진단 통계 조회 오류",
      error: error,
    });
  }
});
