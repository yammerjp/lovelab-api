import * as express from "express";
import { Invitations } from "../../models/invitations";
import { Users } from "../../models/users";

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
  // TODO: db上にinviteeuseridが存在することを確認
  // TODO: inviteeuserid !== inviteruserid を確認
  // TODO: inviteruseridがリクエストした本人であることを確認
  // TODO: groupidがリクエストした本人が所属しているグループであることを確認
  // TODO: messageからSQLインジェクションの可能性が排除できるようにする

  Invitations.create({ groupid, inviteruserid, inviteeuserid, message })
    .then(newInvitation => {
      res.json(newInvitation);
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database Error" });
    });
});

// GET https://lovelab.2n2n.ninja/api/v1/invitations?inviteeuserid=userid
//  招待をすべて取得 自分への招待のみ取得可能
router.get("/", (req, res) => {
  const inviteeuserid = parseInt(req.query.inviteeuserid, 10);
  if (Number.isNaN(inviteeuserid) || inviteeuserid < 0) {
    res.json({ error: true, errorMessage: "invalid query of userid" });
    return;
  }
  // TODO: inviteeuserid がリクエストした本人と一致することを検証
  Invitations.findAll({ where: { inviteeuserid } })
    .then(invitations => {
      if (invitations === null) {
        res.json({ error: true, errorMessage: "DataBase return null" });
        return;
      }
      res.json(invitations);
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database Error" });
    });
});

// DELETE https://lovelab.2n2n.ninja/api/v1/invitations/:invitationid
//  招待を拒否 自分への招待のみ編集可能
// DELETE https://lovelab.2n2n.ninja/api/v1/invitations/:invitationid?agreement=true
//  招待を承諾 自分への招待のみ編集可能

router.delete("/:id", (req, res) => {
  const agreement = req.query.agreement === "true";
  const invitationid = parseInt(req.params.id, 10);
  if (Number.isNaN(invitationid) || invitationid < 0) {
    res.json({ error: true, errorMessage: "Invalid invitation id" });
    return;
  }
  Invitations.findByPk(invitationid).then(async invitation => {
    if (invitation === null || invitation === undefined) {
      res.json({
        error: true,
        errorMessage: "Database return null of invitation"
      });
      return;
    }
    // TODO: inviteeが自分であることを確認
    // console.log(`group:${invitation.groupid}`);
    // console.log(`invitee:${invitation.inviteeuserid}`);
    // console.log(`inviter:${invitation.inviteruserid}`);

    // agreement == tureなら登録処理をする
    if (agreement === true) {
      await Users.update(
        { groupid: invitation.groupid },
        { where: { id: invitation.inviteeuserid } }
      );

      /*
      .then( ()=> {
        Invitations.destroy({where: {id:invitationid}})
        .then( () => {res.json({error:false});});
      }); 
      return */
    }
    Invitations.destroy({ where: { id: invitationid } })
      .then(() => {
        res.json({ error: false });
      })
      .catch(() => {
        res.json({ error: true, errorMessage: "Failed to delete" });
      });
  });
});

// routerをモジュールとして扱う準備
export default router;
