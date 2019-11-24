import * as express from "express";
import { Tokens } from "../models/tokens";
import errorHandle from "../others/error";

const authorization = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const httpHeaderAuth = req.get("Authorization");
  if (httpHeaderAuth === undefined || /^Beaer /.test(httpHeaderAuth)) {
    errorHandle(res, 1001);
    return; // return文はtsコンパイラのために挿入
  }
  const token = httpHeaderAuth.split(" ")[1];
  Tokens.findByPk(token).then(tokenObj => {
    if (tokenObj === null) {
      // TODO: 日付をチェック
      errorHandle(res, 1002);
      return; // tscコンパイラにこの先が実行されないことを明示
    }
    req.body.userid = tokenObj.userid;
    next();
  });
};

export default authorization;
