import * as express from "express";
import { Invitations } from "../../models/invitations";

const router = express.Router();

// POST https://lovelab.2n2n.ninja/api/v1/invitations
//  グループへの招待を追加 自分の所属するグループへの招待のみ可能
router.post("/", (req, res) => {
  const groupid = parseInt(req.body.groupid, 10);
  const inviteruserid = parseInt(req.body.inviteruserid, 10);
  const inviteeuserid = parseInt(req.body.inviteeuserid, 10);
  const { message } = req.body;

  if (
    Number.isNaN(groupid) ||
    groupid < 0 ||
    Number.isNaN(inviteruserid) ||
    inviteruserid < 0 ||
    Number.isNaN(inviteeuserid) ||
    inviteeuserid < 0
  ) {
    res.json({ error: true, errorMessage: "Invalid json" });
    return;
  }
  // 今はgroupid, inviteruserid, inviteeuseridが存在するか判定していない
  // ここで、inviterがリクエストした本人であること、groupidにinviterが所属していることを確認するべき。

  Invitations.create({ groupid, inviteruserid, inviteeuserid, message }).then(
    newInvitation => {
      res.json(newInvitation);
    }
  );
});

// GET https://lovelab.2n2n.ninja/api/v1/invitations?inviteeuserid=userid
//  招待をすべて取得 自分への招待のみ取得可能
router.get("/", (req, res) => {
  const inviteeuserid = parseInt(req.query.inviteeuserid, 10);
  if (Number.isNaN(inviteeuserid) || inviteeuserid < 0) {
    res.json({ error: true, errorMessage: "invalid query of userid" });
    return;
  }
  Invitations.findAll({ where: { inviteeuserid } }).then(invitations => {
    if (invitations === null) {
      res.json({ error: true, errorMessage: "DataBase return null" });
      return;
    }
    res.json(invitations);
  });
});

// PUT https://lovelab.2n2n.ninja/api/v1/users/:userid/invitations/:invitationid
//  招待を承諾/拒否 自分への招待のみ編集可能

// routerをモジュールとして扱う準備
export default router;
