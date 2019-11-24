import * as express from "express";
import { Tokens } from "../models/tokens";

const authorization = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  console.log();
  const httpHeaderAuth = req.get("Authorization");
  if (httpHeaderAuth === undefined || /^Beaer /.test(httpHeaderAuth)) {
    res
      .status(401)
      .json({ errorCode: 1, errorMessage: "Authorization type is Beaer" });
    return;
    // return文はtsコンパイラのために挿入
    // httpHeaderAuth が undefinedであるときにこの先が実行されないことを明示
  }
  const token = httpHeaderAuth.split(" ")[1];
  Tokens.findByPk(token).then(tokenObj => {
    if (tokenObj === null) {
      // TODO: 日付をチェック
      res.status(403).json({ errorCode: 2, errorMessage: "token is invalid" });
      return; // tscコンパイラにこの先が実行されないことを明示
    }
    req.body.userid = tokenObj.userid;
    console.log(`\n\n tokenObj.userid: ${tokenObj.userid}\n\n`);
    console.log(`\n\n req.body.userid: ${req.body.userid}\n\n`);
    next();

    if (false) {
      console.log(res.json());
    }
  });
};

export default authorization;
