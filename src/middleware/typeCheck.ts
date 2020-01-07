/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-throw-literal */
/* eslint-disable valid-typeof */

import * as express from "express";
import errorHandle from "../others/error";

type Interval = "oneday" | "oneweek" | "onemonth";

interface RequestBody {
  email?: string;
  password?: string;
  name?: string | null;
  inviteeuserid?: number;
  message?: string | null;
  comment?: string | null;
  isfinished?: boolean;
  whoisdoinguserid?: number | null;
  deadlinedate?: Date | null;
  interval?: Interval | null;
  firstdeadlinedate?: Date | null;
}

const validate = (
  val: any,
  allowNull: boolean,
  allowUndefined: boolean,
  typeString: string,
  errorCode: number
): any => {
  if (allowNull && val === null) {
    return null;
  }
  if (allowUndefined && val === undefined) {
    return undefined;
  }
  if (typeof val !== typeString) {
    throw errorCode;
  }
  if (
    typeString === "number" &&
    (Number.isNaN(val) || Math.floor(val) !== val)
  ) {
    throw errorCode;
  }
  return val;
};

const stringOrUndefined = (val: any): string | undefined => {
  return validate(val, false, true, "string", 1700);
};

const stringOrNullOrUndefined = (val: any): string | null | undefined => {
  return validate(val, true, true, "string", 1701);
};

const numberOrUndefined = (val: any): number | undefined => {
  return validate(val, false, true, "number", 1702);
};

const numberOrNullOrUndefined = (val: any): number | null | undefined => {
  return validate(val, true, true, "number", 1703);
};

const booleanOrUndefined = (val: any): boolean | undefined => {
  return validate(val, false, true, "boolean", 1704);
};

const dateOrNullOrUndefined = (val: any): Date | null | undefined => {
  if (val === null || val === undefined) {
    return val;
  }
  if (typeof val !== "string") {
    throw 1705;
  }
  const strISO8601: string = val;
  const milliSecond: number = Date.parse(strISO8601);
  if (Number.isNaN(milliSecond)) {
    throw 1706;
  }
  return new Date(milliSecond);
};

const intervalOrNullOrUndefined = (val: any): Interval | null | undefined => {
  if (val === null || val === undefined) {
    return val;
  }
  if (val === "oneday" || val === "oneweek" || val === "onemonth") {
    return val;
  }
  throw 1707;
};

const validateReqBody = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let body: RequestBody = {};

  try {
    body = {
      email: stringOrUndefined(req.body.email),
      password: stringOrUndefined(req.body.password),
      name: stringOrNullOrUndefined(req.body.name),
      inviteeuserid: numberOrUndefined(req.body.inviteeuserid),
      message: stringOrNullOrUndefined(req.body.message),
      comment: stringOrNullOrUndefined(req.body.comment),
      isfinished: booleanOrUndefined(req.body.isfinished),
      whoisdoinguserid: numberOrNullOrUndefined(req.body.whoisdoinguserid),
      deadlinedate: dateOrNullOrUndefined(req.body.deadlinedate),
      interval: intervalOrNullOrUndefined(req.body.interval),
      firstdeadlinedate: dateOrNullOrUndefined(req.body.firstdeadlinedate)
    };
  } catch (e) {
    if (e >= 1700 && e <= 1707) {
      errorHandle(res, e);
      return;
    }
    errorHandle(res, 1708);
  }

  req.body = body;
  next();
};

export default validateReqBody;
