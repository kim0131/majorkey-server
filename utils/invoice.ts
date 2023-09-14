import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export const companyInfo = {
  majorkeyName: "주식회사 더휴멘토리",
  majorkeyNumber: "778-86-01203",
  majorkeyCeoName: "조유경",
  majorkeyPhone: "02-556-3425",
  majorkeyAddress: "서울시 강남구",
  majorkeyAddressDetail: "테헤란로 313 (역삼동) 성지하이츠1 718호",
  majorkeyAccountNum: "(국민은행) 839201-04-253731 주식회사 더휴멘토리",
  price: [16500, 16500, 11500, 6500],
};

export const setInvoice = async () => {
  const managerList = await prisma.manager.findMany({
    select: {
      id: true,
      email: true,
      businessName: true,
      businessNumber: true,
      businessCeoName: true,
      businessPhone: true,
      businessAddress: true,
      businessAddressDetail: true,
      invoiceUserLog: true,
    },
  });

  const filterManagerList = managerList.filter(
    data => data.invoiceUserLog.length !== 0,
  );

  const invoiceUserLog = await Promise.all(
    filterManagerList.map(async manager => {
      const currentDate = dayjs();
      const prevDate = dayjs().subtract(1, "month");
      const year = prevDate["$y"];
      const month = prevDate["$M"] + 1;

      const invoiceUserLog = await prisma.$transaction([
        prisma.invoiceUserLog.count({
          where: {
            managerId: manager.id,
            type: 1,
            createDate: {
              lt: currentDate.startOf("month").format(),
            },
          },
        }),
        prisma.invoiceUserLog.count({
          where: {
            managerId: manager.id,
            type: 1,
            createDate: {
              gte: prevDate.startOf("month").format(),
              lt: dayjs(`${year}-${month}-11`).format(),
            },
          },
        }),
        prisma.invoiceUserLog.count({
          where: {
            managerId: manager.id,
            type: 1,
            createDate: {
              gte: dayjs(`${year}-${month}-11`).format(),
              lt: dayjs(`${year}-${month}-21`).format(),
            },
          },
        }),
        prisma.invoiceUserLog.count({
          where: {
            managerId: manager.id,
            type: 1,
            createDate: {
              gte: dayjs(`${year}-${month}-21`).format(),
              lt: prevDate.endOf("month").format(),
            },
          },
        }),
      ]);

      return {
        managerId: manager.id,
        name: `${prevDate["$y"]}년 ${prevDate["$M"] + 2}월 거래명세서`,
        // name: `${dayjs()["$y"]}년 ${dayjs()["$M"] + 1}월 ${dayjs()["$D"]}일 ${
        //   dayjs()["$H"] - 1
        // }시 거래명세서`,
        email: manager.email,
        businessName: manager.businessName,
        businessNumber: manager.businessNumber,
        businessCeoName: manager.businessCeoName,
        businessPhone: manager.businessPhone,
        businessAddress: manager.businessAddress,
        businessAddressDetail: manager.businessAddressDetail,
        majorkeyName: companyInfo.majorkeyName,
        majorkeyNumber: companyInfo.majorkeyNumber,
        majorkeyCeoName: companyInfo.majorkeyCeoName,
        majorkeyPhone: companyInfo.majorkeyPhone,
        majorkeyAddress: companyInfo.majorkeyAddress,
        majorkeyAddressDetail: companyInfo.majorkeyAddressDetail,
        olderPrice: companyInfo.price[0],
        olderMember: invoiceUserLog[0] || 0,
        firstPrice: companyInfo.price[1],
        firstMember: invoiceUserLog[1] || 0,
        secondPrice: companyInfo.price[2],
        secondMember: invoiceUserLog[2] || 0,
        thirdPrice: companyInfo.price[3],
        thirdMember: invoiceUserLog[3] || 0,
        totalPrice:
          (companyInfo.price[0] * invoiceUserLog[0] || 0) +
          (companyInfo.price[1] * invoiceUserLog[1] || 0) +
          (companyInfo.price[2] * invoiceUserLog[2] || 0) +
          (companyInfo.price[3] * invoiceUserLog[3] || 0),
        totalMember:
          invoiceUserLog[0] +
            invoiceUserLog[1] +
            invoiceUserLog[2] +
            invoiceUserLog[3] || 0,
      };
    }),
  );

  const filterInvoiceUserLog = invoiceUserLog.filter(
    log => log.totalMember !== 0,
  );

  await prisma.invoice.createMany({
    data: filterInvoiceUserLog,
  });
};
