import { PrismaClient, Trainer } from "@prisma/client";
import express from "express";

export const trainerRouter = express.Router();
const prisma = new PrismaClient();

// 컨설팅 트레이너 생성
trainerRouter.post("/", async (req, res) => {
  console.log("/trainer, POST");
  const reqData = req.body;

  try {
    const trainer = await prisma.trainer.create({
      data: {
        name: reqData.name,
        managerId: reqData.managerId,
        thumbnail: reqData.thumbnail,
        phone: reqData.phone,
        anotherCourse: reqData.anotherCourse,
        anotherStudent: reqData.anotherStudent,
        anotherEarly: reqData.anotherEarly,
        anotherRegular: reqData.anotherRegular,
        subject: {
          connect: reqData.subject.map((data: number) => ({ id: data })),
        },
        monday: JSON.stringify(reqData.monday),
        tuesday: JSON.stringify(reqData.tuesday),
        wednesday: JSON.stringify(reqData.wednesday),
        thursday: JSON.stringify(reqData.thursday),
        friday: JSON.stringify(reqData.friday),
        saturday: JSON.stringify(reqData.saturday),
        sunday: JSON.stringify(reqData.sunday),
      },
      include: {
        subject: true,
      },
    });

    return res.status(200).json({
      msg: "컨설팅 트레이너 생성 완료",
      data: trainer,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "컨설팅 트레이너 생성 오류",
      error: error,
    });
  }
});

// 컨설팅 트레이너 목록 조회
trainerRouter.get("/", async (req, res) => {
  console.log("/trainer, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  try {
    const trainer: [number, Trainer[]] = await prisma.$transaction([
      prisma.trainer.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
          ...(query["manager-id"] && {
            managerId: Number(query["manager-id"]),
          }),
        },
      }),
      prisma.trainer.findMany({
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
          ...(query["manager-id"] && {
            managerId: Number(query["manager-id"]),
          }),
        },
        include: {
          subject: true,
        },
      }),
    ]);
    return res.status(200).json({
      msg: "컨설팅 트레이너 목록 조회 완료",
      data: trainer,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "컨설팅 트레이너 목록 조회 오류",
      error: error,
    });
  }
});

// 컨설팅 트레이너 조회
trainerRouter.get("/:id", async (req, res) => {
  console.log("/trainer/:id, GET");

  const id = Number(req.params.id);

  try {
    const trainer: Trainer | null = await prisma.trainer.findUnique({
      where: {
        id: id,
      },
      include: {
        subject: true,
      },
    });
    return res.status(200).json({
      msg: "컨설팅 트레이너 조회 완료",
      data: trainer,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "컨설팅 트레이너 조회 오류",
      error: error,
    });
  }
});

// 컨설팅 트레이너 업데이트
trainerRouter.patch("/:id", async (req, res) => {
  console.log("/trainer/:id, PATCH");

  const id = Number(req.params.id);
  const reqData = req.body;

  try {
    const trainer = await prisma.trainer.update({
      where: {
        id: id,
      },
      data: {
        name: reqData.name,
        thumbnail: reqData.thumbnail,
        phone: reqData.phone,
        anotherCourse: reqData.anotherCourse,
        anotherStudent: reqData.anotherStudent,
        anotherEarly: reqData.anotherEarly,
        anotherRegular: reqData.anotherRegular,
        subject: {
          set: [],
          connect: reqData.subject.map((data: number) => ({ id: data })),
        },
        monday: JSON.stringify(reqData.monday),
        tuesday: JSON.stringify(reqData.tuesday),
        wednesday: JSON.stringify(reqData.wednesday),
        thursday: JSON.stringify(reqData.thursday),
        friday: JSON.stringify(reqData.friday),
        saturday: JSON.stringify(reqData.saturday),
        sunday: JSON.stringify(reqData.sunday),
      },
      include: {
        subject: true,
      },
    });

    return res.status(200).json({
      msg: "컨설팅 트레이너 업데이트 완료",
      data: trainer,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "컨설팅 트레이너 업데이트 오류",
      error: error,
    });
  }
});
