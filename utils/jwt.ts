import { Admin, Manager, User } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";

// 토큰 찾기
export const jwtGetToken = async req => {
  if (await req.headers?.authorization) {
    const token = await req.headers.authorization.split("Bearer ")[1];
    if (!token || token === "undefined") {
      return undefined;
    } else return token;
  } else {
    return undefined;
  }
};

// 토큰 디코딩
export const jwtVerify = token => {
  const jwtSecret: any = process.env.JWT_SECRET;
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) resolve("error");
      resolve(decoded);
    });
  });
};

// 토큰 발행
export const jwtSign = (data: User | Manager | Admin) => {
  const jwtSecret: any = process.env.JWT_SECRET;
  return new Promise((resolve: (value: string) => void, reject) => {
    jwt.sign(
      { id: data.id, account: data.account, time: new Date() },
      jwtSecret,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) resolve("error");
        else resolve(token!);
      },
    );
  });
};
