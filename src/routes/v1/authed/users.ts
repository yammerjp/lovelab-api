import * as express from "express";
import { Users } from "../../../models/users";
import userResponceObjectFilter from "../../../others/users";
import errorHandle from "../../../others/error";

const router = express.Router();

//  グループに所属するユーザーを取得
router.get("/", (req, res) => {
  const promise: Promise<number> = new Promise((resolve, reject) => {
    if (req.query.groupid === undefined && req.query.mygroup === "true") {
      resolve(req.body.groupidAuth);
      return;
    }
    const groupid = parseInt(req.query.groupid, 10);
    if (Number.isNaN(groupid) || groupid < 0) {
      reject(1502);
      return;
    }
    resolve(groupid);
  });

  promise
    .then((groupid: number) => {
      return Users.findAll({ where: { groupid } });
    })
    .then(users => {
      res.json(
        users.map(user => {
          return userResponceObjectFilter(user);
        })
      );
    })
    .catch(e => {
      errorHandle(res, e === 1502 ? e : 1503);
    });
});

//  ユーザー情報を取得
router.get("/:userid", (req, res) => {
  const userid = parseInt(req.params.userid, 10);
  if (Number.isNaN(userid) || userid < 0) {
    errorHandle(res, 1504);
    return;
  }
  Users.findByPk(userid).then(user => {
    if (user === null) {
      errorHandle(res, 1505);
      return;
    }
    res.json(userResponceObjectFilter(user));
  });
});

export default router;
