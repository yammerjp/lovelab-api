import * as express from "express";
import * as sha256 from "sha256";
import * as crypto from "crypto";
import { Users } from "../../models/users";

const router = express.Router();

// /users ユーザーに関する操作

// /users/:userid/invitations 招待に関する操作

/*
const validateId = (str: string): boolean => {
  // 半角英数と_の組み合わせのみ許可
  return /^[a-zA-Z0-9_]+$/.test(str);
};
*/

interface UserResponceObject {
  groupid: number | null;
  picturepath: string;
  id: number;
  email: string;
  name: string;
}

const userResponceObjectFilter = (
  user: UserResponceObject
): UserResponceObject => {
  const { groupid, picturepath, id, email, name } = user;
  return { groupid, picturepath, id, email, name };
};
const validate = (str: string): boolean => {
  if (str === undefined || str === null || str === "") {
    return false;
  }
  return true;
};

// POST https://lovelab.2n2n.ninja/api/v1/users
//  ユーザーを追加 (認証に絡む。新しいアカウントの作成)
router.post("/", (req, res) => {
  const { email, password, name } = req.body;
  if (!validate(email) || !validate(password) || !validate(name)) {
    res.json({ error: true, errorMessage: "Invalid send json" });
    return;
  }
  const salt = crypto.randomBytes(8).toString("HEX");
  const passwordhash = sha256(password + salt);
  Users.create({ email, passwordhash, name, salt }).then(newUser => {
    res.json(userResponceObjectFilter(newUser));
  });
});

// GET https://lovelab.2n2n.ninja/api/v1/users?groups=:groupid
//  グループに所属するユーザーを取得
router.get("/", (req, res) => {
  if (req.query.groupid === undefined) {
    res.json({ error: true, errorMessage: "Need to specify groupid" });
    return;
  }
  const groupid = parseInt(req.query.groupid, 10);
  if (Number.isNaN(groupid) || groupid < 0) {
    res.json({ error: true, errorMessage: "Invalid groupid" });
    return;
  }
  Users.findAll({ where: { groupid } }).then(users => {
    res.json(
      users.map(user => {
        return userResponceObjectFilter(user);
      })
    );
  });
});

// GET https://lovelab.2n2n.ninja/api/v1/users/user:id
//  ユーザー情報を取得
router.get("/:userid", (req, res) => {
  const userid = parseInt(req.params.userid, 10);
  if (Number.isNaN(userid) || userid < 0) {
    res.json({ error: true, errorMessage: "Invalid userid" });
    return;
  }
  Users.findByPk(userid).then(user => {
    if (user === null) {
      res.json({ error: true, errorMessage: "user is not found" });
      return;
    }
    res.json(userResponceObjectFilter(user));
  });
});

// routerをモジュールとして扱う準備
export default router;
