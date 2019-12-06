import * as express from "express";
import { Users } from "../../../models/users";
import userResponceObjectFilter from "../../../others/users";
import errorHandle from "../../../others/error";

const router = express.Router();

const getUsersByGroupid = (groupid: number, res: express.Response): void => {
  Users.findAll({ where: { groupid } })
    .then(users => {
      res.json(
        users.map(user => {
          return userResponceObjectFilter(user);
        })
      );
    })
    .catch(() => {
      errorHandle(res, 1503);
    });
};
// GET https://lovelab.2n2n.ninja/api/v1/users?groups=:groupid
//  グループに所属するユーザーを取得
router.get("/", (req, res) => {
  if (req.query.groupid === undefined) {
    if (req.query.mygroup === "true") {
      getUsersByGroupid(req.body.groupidAuth, res);
      return;
    }
    errorHandle(res, 1501);

    return;
  }
  const groupid = parseInt(req.query.groupid, 10);
  if (Number.isNaN(groupid) || groupid < 0) {
    errorHandle(res, 1502);
    return;
  }
  getUsersByGroupid(groupid, res);
});

// GET https://lovelab.2n2n.ninja/api/v1/users/:id
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

// routerをモジュールとして扱う準備
export default router;
