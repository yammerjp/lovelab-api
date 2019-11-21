import * as express from "express";
import { Users } from "../../models/users";

const router = express.Router();

// /users ユーザーに関する操作

// /users/:userid/invitations 招待に関する操作

// GET https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations
//  招待をすべて取得 自分への招待のみ取得可能
// PUT https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations/:invitationid
//  招待を承諾/拒否 自分への招待のみ編集可能

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

// POST https://lovelab.2n2n.ninja/api/v1/users
//  ユーザーを追加 (認証に絡む。新しいアカウントの作成)
router.post("/", (req, res) => {
  const validate = (str: string): boolean => {
    if (str === undefined || str === null || str === "") {
      return false;
    }
    return true;
  };
  const { email, password, name } = req.body;

  if (!validate(email) || !validate(password) || !validate(name)) {
    res.json({ error: true, errorMessage: "Invalid send json" });
    return;
  }
  Users.create({ email, password, name }).then(newUser => {
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

// POST https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations
//  グループへの招待を追加 自分の所属するグループへの招待のみ可能

// routerをモジュールとして扱う準備
export default router;
