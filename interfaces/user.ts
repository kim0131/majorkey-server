import { User } from "@prisma/client";

export interface UserCreate extends User {}

export interface UserUpdate {
  name?: User["name"];
  password?: User["password"];
  birth?: User["birth"];
  phone?: User["phone"];
  email?: User["email"];
  thumbnail?: User["thumbnail"];
  gradeId?: User["gradeId"];
  schoolId?: User["schoolId"];
  careerDetailId?: User["careerDetailId"];
  favoriteSubjectId?: User["favoriteSubjectId"];
  hateSubjectId?: User["hateSubjectId"];
  wellSubjectId?: User["wellSubjectId"];
  lessSubjectId?: User["lessSubjectId"];
}

export interface UserLogin extends User {
  account: User["account"];
  password: User["password"];
}
