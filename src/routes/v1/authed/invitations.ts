import * as express from "express";
import { Invitations } from "../../../models/invitations";
import { Users } from "../../../models/users";
import { Groups } from "../../../models/groups";
import errorHandle from "../../../others/error";

const router = express.Router();

interface ReturnInvitationObject {
  message: string | null;
  id: number;
  groupid: number;
  inviteruserid: number;
  inviteeuserid: number;
  updatedAt: Date;
  createdAt: Date;
  groupname: string;
}

//  グループへの招待を追加 自分の所属するグループへの招待のみ可能
router.post("/", (req, res) => {
  const inviteruserid = req.body.useridAuth; // inviteruseridはリクエストした本人
  const invitergroupid = req.body.groupidAuth;
  const inviteeuserid = parseInt(req.body.inviteeuserid, 10);
  const { message } = req.body;

  if (Number.isNaN(inviteeuserid) || inviteeuserid < 0) {
    errorHandle(res, 1401);
    return;
  }
  if (inviteruserid === inviteeuserid) {
    errorHandle(res, 1402);
    return;
  }
  // db上にinviteeuseridが存在することを確認
  Users.findByPk(inviteeuserid)
    .then(inviteeuser => {
      if (inviteeuser === null) {
        return Promise.reject(1403);
      }
      // TODO: messageからSQLインジェクションの可能性が排除できるようにする

      return Invitations.create({
        groupid: invitergroupid,
        inviteruserid,
        inviteeuserid,
        message
      });
    })
    .then(newInvitation => {
      res.json(newInvitation);
    })
    .catch(e => {
      if (e === 1403) {
        errorHandle(res, e);
      }
      errorHandle(res, 1404);
    });
});

// 自分への招待のみ取得可能
router.get("/", (req, res) => {
  const inviteeuserid = req.body.useridAuth;
  Invitations.findAll({
    where: { inviteeuserid },
    raw: true,
    include: [{ model: Groups, required: true }]
  })
    .then(invitations => {
      res.json(
        invitations.map(invitation => {
          const returnInvitation: ReturnInvitationObject = {
            message: invitation.message,
            id: invitation.id,
            groupid: invitation.GroupId,
            inviteruserid: invitation.inviteruserid,
            inviteeuserid: invitation.inviteeuserid,
            updatedAt: invitation.updatedAt,
            createdAt: invitation.createdAt,
            groupname: invitation.GroupName
          };
          return returnInvitation;
        })
      );
    })
    .catch(() => {
      errorHandle(res, 1409);
    });
});

//  招待を承諾/拒否 自分への招待のみ編集可能
router.delete("/:id", (req, res) => {
  const agreement = req.query.agreement === "true";
  const invitationid = parseInt(req.params.id, 10);
  const { useridAuth } = req.body;
  if (Number.isNaN(invitationid) || invitationid < 0) {
    errorHandle(res, 1410);
    return;
  }
  Invitations.findByPk(invitationid).then(async invitation => {
    if (invitation === null) {
      errorHandle(res, 1411);
      return;
    }

    if (useridAuth !== invitation.inviteeuserid) {
      errorHandle(res, 1412);
      return;
    }

    if (agreement === true) {
      // TODO: グループに加盟してないことを確認
      await Users.update(
        { groupid: invitation.groupid },
        { where: { id: invitation.inviteeuserid } }
      );
    }

    Invitations.destroy({ where: { id: invitationid } })
      .then(() => {
        res.status(204).end();
      })
      .catch(() => {
        errorHandle(res, 1413);
      });
  });
});

export default router;
