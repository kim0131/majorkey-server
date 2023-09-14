import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import schedule from "node-schedule";
import { setInvoice } from "./utils/invoice";
import {
  userRouter,
  managerRouter,
  careerRouter,
  schoolRouter,
  gradeRouter,
  cityRouter,
  subjectRouter,
  textbookRouter,
  learningAssessmentRouter,
  ebti1Router,
  customizedPlanRouter,
  collegeRouter,
  expectRouter,
  adminRouter,
  trainerRouter,
  careerAssessmentRouter,
  ebtiRouter,
  ebti2Router,
  statisticsRouter,
  invoiceRouter,
  reportRouter,
  homeRouter,
} from "./routes";
// import dayjs from "dayjs";



const asd = "asd";

const app = express();

const port = "5500";

app.use(cors());
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  }),
);

app.use(express.json()); // for parsing application/json

app.get("/", async (req, res, next) => {
  res.send("공부선수 서버 가동 완료");
});
// console.log(dayjs().startOf("D").subtract(2, "D").format());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/manager", managerRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/career", careerRouter);
app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/college", collegeRouter);
app.use("/api/v1/grade", gradeRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/textbook", textbookRouter);
app.use("/api/v1/smart-check/learning-assessment", learningAssessmentRouter);
app.use("/api/v1/smart-check/career-assessment", careerAssessmentRouter);
app.use("/api/v1/ebti", ebtiRouter);
app.use("/api/v1/ebti-1", ebti1Router);
app.use("/api/v1/ebti-2", ebti2Router);
app.use("/api/v1/customized-plan", customizedPlanRouter);
app.use("/api/v1/expect", expectRouter);
app.use("/api/v1/trainer", trainerRouter);
app.use("/api/v1/statistics", statisticsRouter);
app.use("/api/v1/invoice", invoiceRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/home", homeRouter);

app.use(function (req, res, next) {
  res.status(404).send("page not found");
  next(new Error("없는 경로입니다."));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.stack);
});

//서버 종류 숨기기
app.disable("x-powered-by");

//정산 스케줄
const scheduleRule = new schedule.RecurrenceRule();
scheduleRule.date = 1;
scheduleRule.tz = "Asia/Seoul";
schedule.scheduleJob(scheduleRule, () => setInvoice());

//데이터베이스 수정시 명령어 npx prisma db push // DB정보 푸시 (기존정보 삭제)
//prisma 새로고침 npx prisma generate
//prisma db에서 가져오기 명령어 npx prisma introspect
//port 주소
//실행 npm start

// const requestIp = require("request-ip");
// inside middleware handler

// on localhost you'll see 127.0.0.1 if you're using IPv4
// or ::1, ::ffff:127.0.0.1 if you're using IPv6
//테스트

app.listen(port, () => {
  console.log("port :" + port + "//Start");
});
