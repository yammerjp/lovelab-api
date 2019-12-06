import * as express from "express";
import errorHandle from "../others/error";

const isNumber = (val: any): boolean => {
  if (
    typeof val === "number" &&
    !Number.isNaN(val) &&
    val > 0 &&
    val === Math.floor(val)
  ) {
    return true;
  }
  return false;
};

const isString = (val: any): boolean => {
  if (typeof val === "string" && val !== "") {
    return true;
  }
  return false;
};

const isEmptyString = (val: any): boolean => {
  if (val === "") {
    return true;
  }
  return false;
};

const isBoolean = (val: any): boolean => {
  if (val === true || val === false) {
    return true;
  }
  return false;
};

const isEmpty = (val: any): boolean => {
  if (val === null || val === undefined) {
    return true;
  }
  return false;
};

/*
const isstrboolean = (val:any):boolean => {
    if( val === "true" || val === "false" ){
      return true;
    }
    return false;
}
*/

const validateReqBody = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  if (false) {
    console.log(req);
    console.log(res);
  }

  const {
    email, // string
    password, // string
    name, // string or undefined
    inviteeuserid, // number
    message, // string or undefined
    comment, // string or undefined
    isfinished, // boolean or undefined
    whoisdoinguserid // number or null or undefined
  } = req.body;

  const validated = {
    email, // string
    password, // string
    name, // string or undefined
    inviteeuserid, // number
    message, // string or undefined
    comment, // string or undefined
    isfinished, // boolean or undefined
    whoisdoinguserid
  };

  req.body = validated;

  if (
    !isEmpty(validated.email) &&
    (!isString(validated.email) || isEmptyString(validated.email))
  ) {
    errorHandle(res, 1700);
    return;
  }
  if (
    !isEmpty(validated.password) &&
    (!isString(validated.password) || isEmptyString(validated.password))
  ) {
    errorHandle(res, 1701);
    return;
  }
  if (!isEmpty(validated.name) && !isString(validated.name)) {
    errorHandle(res, 1702);
    return;
  }
  if (!isEmpty(validated.inviteeuserid) && !isNumber(validated.inviteeuserid)) {
    errorHandle(res, 1703);
    return;
  }
  if (!isEmpty(validated.message) && !isString(validated.message)) {
    errorHandle(res, 1704);
    return;
  }
  if (!isEmpty(validated.comment) && !isString(validated.comment)) {
    errorHandle(res, 1705);
    return;
  }
  if (!isEmpty(validated.isfinished) && !isBoolean(validated.isfinished)) {
    errorHandle(res, 1706);
    return;
  }
  if (
    !isEmpty(validated.whoisdoinguserid) &&
    !isNumber(validated.whoisdoinguserid)
  ) {
    errorHandle(res, 1707);
    return;
  }

  next();
};

export default validateReqBody;
