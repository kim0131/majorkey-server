import { Invoice, PrismaClient } from "@prisma/client";
import express from "express";

export const invoiceRouter = express.Router();
const prisma = new PrismaClient();

// 정산 목록 조회
invoiceRouter.get("/", async (req, res) => {
  console.log("/invoice, GET");

  const list: number =
    Number(req.query.list) === 0 ? 0 : Number(req.query.list) || 20;
  const page: number = Number(req.query.page) || 1;
  const query: any = req.query;

  let managerIds = [];

  if (query["manager-ids"]) {
    const splitIds = query["manager-ids"].split(",");
    if (splitIds.length !== 0) {
      managerIds = splitIds;
    }
  }

  try {
    const invoice: [number, Invoice[], any] = await prisma.$transaction([
      prisma.invoice.count({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
          ...(managerIds.length !== 0 && {
            AND: managerIds.map(data => ({ managerId: Number(data) })),
          }),
          ...(query["city-id"] && {
            manager: {
              cityId: Number(query["city-id"]),
            },
          }),
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
      }),
      prisma.invoice.findMany({
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
          ...(query["city-id"] && {
            manager: {
              cityId: Number(query["city-id"]),
            },
          }),
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
      }),
      prisma.invoice.aggregate({
        where: {
          ...(query.name && {
            name: {
              contains: query.name,
            },
          }),
          ...(query["manager-id"] && {
            managerId: Number(query["manager-id"]),
          }),
          ...(query["city-id"] && {
            manager: {
              cityId: Number(query["city-id"]),
            },
          }),
          createDate: {
            gte: query["start-date"] && new Date(query["start-date"]),
            lte: query["end-date"] && new Date(query["end-date"]),
          },
        },
        _sum: {
          olderMember: true,
          firstMember: true,
          secondMember: true,
          thirdMember: true,
          totalMember: true,
          totalPrice: true,
        },
      }),
    ]);
    return res.status(200).json({
      msg: "정산 목록 조회 완료",
      data: invoice,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "정산 목록 조회 오류",
      error: error,
    });
  }
});

// 정산 조회
invoiceRouter.get("/:id", async (req, res) => {
  console.log("/invoice/:id, GET");

  const id = Number(req.params.id);

  try {
    const invoice: Invoice | null = await prisma.invoice.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      msg: "정산 조회 완료",
      data: invoice,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "정산 조회 오류",
      error: error,
    });
  }
});
