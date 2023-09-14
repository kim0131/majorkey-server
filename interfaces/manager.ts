import { Manager } from "@prisma/client";

export interface ManagerCreate extends Manager {}

export interface ManagerUpdate {
  password?: Manager["password"];
  email?: Manager["email"];
  homepage?: Manager["homepage"];
  businessName?: Manager["businessName"];
  businessNumber?: Manager["businessNumber"];
  businessCeoName?: Manager["businessCeoName"];
  businessPhone?: Manager["businessPhone"];
  businessAddress?: Manager["businessAddress"];
  businessAddressDetail?: Manager["businessAddressDetail"];
  cityId?: Manager["cityId"];
  terms?: Manager["terms"];
  privacy?: Manager["privacy"];
}

export interface ManagerLogin extends Manager {
  account: Manager["account"];
  password: Manager["password"];
}
