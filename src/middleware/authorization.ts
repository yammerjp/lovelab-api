import * as express from "express";
import { Tokens } from "../models/tokens";

interface AuthorizedRequest extends express.Request {
  userid: number;
}

const authorization = (req: AuthorizedRequest, res: any, next: Function) => {
  console.log();
  const httpHeaderAuth = req.get("Authorization");
  if (httpHeaderAuth === undefined || /^Beaer /.test(httpHeaderAuth)) {
    res.json({ error: true, errorMessage: "Authorization type is Beaer" });
    return;
  }
  const token = httpHeaderAuth.split(" ")[1];
  Tokens.findByPk(token).then(tokenObj => {
    if (tokenObj === null) {
      res.json({ error: true, errorMessage: "token is invalid" });
      return;
      // TODO: 日付をチェック
    }
    req.userid = tokenObj.userid;
    next();

    if (false) {
      console.log(res.json());
    }
  });
};

export default authorization;
