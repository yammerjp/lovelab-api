import * as express from "express";
import { Invitations } from "../../../models/invitations";
import { Users } from "../../../models/users";

const router = express.Router();

// POST https://lovelab.2n2n.ninja/api/v1/invitations
//  グループへの招待を追加 自分の所属するグループへの招待のみ可能
router.post("/", (req, res) => {
  const inviteruserid = parseInt(req.body.userid, 10); // inviteruseridはリクエストした本人
  const inviteeuserid = parseInt(req.body.inviteeuserid, 10);
  const { message } = req.body;

  if (Number.isNaN(inviteeuserid) || inviteeuserid < 0) {
    res.json({ error: true, errorMessage: "Invalid json" });
    return;
  }
  // inviteeuserid !== inviteruserid を確認
  if (inviteruserid === inviteeuserid) {
    res.json({ error: true, errorMessage: "inviter and invitee is same" });
    return;
  }
  // db上にinviteeuseridが存在することを確認
  Users.findByPk(inviteeuserid)
    .then(inviteeuser => {
      if (inviteeuser === null) {
        res.json({
          error: true,
          errorMessage: "invitee user is not found on database"
        });
        return;
      }
      Users.findByPk(inviteruserid)
        .then(inviter => {
          if (inviter === null) {
            res.json({
              error: true,
              errorMessage: "inviter is not found on database"
            });
            return;
          }
          // groupidがリクエストした本人が所属しているグループであることを確認
          const { groupid } = inviter;
          if (groupid === null) {
            res.json({
              error: true,
              errorMessage: "inviter is not join any groups"
            });
            return;
          }
          // TODO: messageからSQLインジェクションの可能性が排除できるようにする

          Invitations.create({ groupid, inviteruserid, inviteeuserid, message })
            .then(newInvitation => {
              res.json(newInvitation);
            })
            .catch(() => {
              res.json({ error: true, errorMessage: "Database Error" });
            });
        })
        .catch(() => {
          res.json({
            error: true,
            errorMessage: "Database Error to search inviter"
          });
        });
    })
    .catch(() => {
      res.json({
        error: true,
        errorMessage: "Database Error to search invitee"
      });
    });
});

// GET https://lovelab.2n2n.ninja/api/v1/invitations
// 自分への招待のみ取得可能
router.get("/", (req, res) => {
  const inviteeuserid = parseInt(req.body.userid, 10);
  if (Number.isNaN(inviteeuserid) || inviteeuserid < 0) {
    res.json({ error: true, errorMessage: "invalid query of userid" });
    return;
  }
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
  const { userid } = req.body;
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
    // inviteeが自分であることを確認
    if (userid !== invitation.inviteeuserid) {
      res.json({ error: true, errorMessage: "you are not invitee" });
      return;
    }
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
