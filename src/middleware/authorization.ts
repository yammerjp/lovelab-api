import * as express from "express";
import { Tokens } from "../models/tokens";
import { Users } from "../models/users";
import errorHandle from "../others/error";

const authorization = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const httpHeaderAuth = req.get("Authorization");
  if (httpHeaderAuth === undefined || !/^Bearer /.test(httpHeaderAuth)) {
    errorHandle(res, 1001);
    return; // return文はtsコンパイラのために挿入
  }
  const token = httpHeaderAuth.split(" ")[1];
  Tokens.findByPk(token)
    .then(tokenObj => {
      if (tokenObj === null) {
        // TODO: 日付をチェック
        return Promise.reject(1002); // tscコンパイラにこの先が実行されないことを明示
      }
      req.body.useridAuth = tokenObj.userid;
      return Users.findByPk(tokenObj.userid);
    })
    .then((user: any) => {
      if (user === null) {
        return Promise.reject(1003);
      }
      req.body.groupidAuth = user.groupid;
      next();
      return Promise.resolve();
    })
    .catch(e => {
      if (e === 1002 || e === 1003) {
        errorHandle(res, e);
      } else {
        errorHandle(res, 1004);
      }
    });
};

export default authorization;
