import * as express from "express";
import { Invitations } from "../../../models/invitations";
import { Users } from "../../../models/users";
import errorHandle from "../../../others/error";

const router = express.Router();

// POST https://lovelab.2n2n.ninja/api/v1/invitations
//  グループへの招待を追加 自分の所属するグループへの招待のみ可能
router.post("/", (req, res) => {
  const inviteruserid = parseInt(req.body.userid, 10); // inviteruseridはリクエストした本人
  const inviteeuserid = parseInt(req.body.inviteeuserid, 10);
  const { message } = req.body;

  if (Number.isNaN(inviteeuserid) || inviteeuserid < 0) {
    errorHandle(res, 1401);
    return;
  }
  // inviteeuserid !== inviteruserid を確認
  if (inviteruserid === inviteeuserid) {
    errorHandle(res, 1402);
    return;
  }
  // db上にinviteeuseridが存在することを確認
  Users.findByPk(inviteeuserid)
    .then(inviteeuser => {
      if (inviteeuser === null) {
        errorHandle(res, 1403);
        return;
      }
      Users.findByPk(inviteruserid)
        .then(inviter => {
          if (inviter === null) {
            errorHandle(res, 1404);
            return;
          }
          // リクエストした本人が所属しているgroupidを取得
          const { groupid } = inviter;
          if (groupid === null) {
            errorHandle(res, 1405);
            return;
          }
          // TODO: messageからSQLインジェクションの可能性が排除できるようにする

          Invitations.create({ groupid, inviteruserid, inviteeuserid, message })
            .then(newInvitation => {
              res.json(newInvitation);
            })
            .catch(() => {
              errorHandle(res, 1406);
            });
        })
        .catch(() => {
          errorHandle(res, 1407);
        });
    })
    .catch(() => {
      errorHandle(res, 1408);
    });
});

// GET https://lovelab.2n2n.ninja/api/v1/invitations
// 自分への招待のみ取得可能
router.get("/", (req, res) => {
  const inviteeuserid = req.body.userid;
  Invitations.findAll({ where: { inviteeuserid } })
    .then(invitations => {
      res.json(invitations);
    })
    .catch(() => {
      errorHandle(res, 1409);
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
    errorHandle(res, 1410);
    return;
  }
  Invitations.findByPk(invitationid).then(async invitation => {
    if (invitation === null) {
      errorHandle(res, 1411);
      return;
    }
    // inviteeが自分であることを確認
    if (userid !== invitation.inviteeuserid) {
      errorHandle(res, 1412);
      return;
    }

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
        errorHandle(res, 1413);
      });
  });
});

// routerをモジュールとして扱う準備
export default router;
