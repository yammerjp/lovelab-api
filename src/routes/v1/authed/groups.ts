import * as express from "express";
import { Groups } from "../../../models/groups";
import { Users } from "../../../models/users";

const router = express.Router();

interface GroupResponceObject {
  id: number;
  name: string;
  picturepath: string;
}
const groupResponceObjectFilter = (
  group: GroupResponceObject
): GroupResponceObject => {
  const { id, name, picturepath } = group;
  return { id, name, picturepath };
};
const validate = (str: string): boolean => {
  if (str === undefined || str === null || str === "") {
    return false;
  }
  return true;
};

// GET https://lovelab.2n2n.ninja/api/v1/groups/:groupid
//  グループの情報を取得
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id) || id < 0) {
    res.json({ error: true, errorMessage: "Invalid groupid" });
    return;
  }
  Groups.findByPk(id)
    .then(group => {
      if (group === null) {
        res.json({ error: true, errorMessage: "group is not found" });
        return;
      }
      res.json(groupResponceObjectFilter(group));
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database error" });
    });
});

// POST https://lovelab.2n2n.ninja/api/v1/groups?userid=:userid
//  グループを追加 自分が強制的にそのグループに所属することになる
router.post("/", (req, res) => {
  const { userid, name, picturepath } = req.body;
  console.log(`\n\n userid: ${userid}\n\n`);
  if (!validate(name)) {
    res.json({ error: true, errorMessage: "invalid name" });
    return;
  }
  Users.findByPk(userid)
    .then(user => {
      if (user === null) {
        res.json({
          error: true,
          errorMessage:
            "unknown error. authorized user is not found in database"
        });
        return;
      }
      // 自分がグループに所属していないことを確認
      if (user.groupid !== null) {
        res.json({
          error: true,
          errorMessage: "you are already join any group."
        });
        return;
      }
      Groups.create({ name, picturepath }).then(group => {
        // アクセスしたユーザーを新しく作ったグループに加盟させる。
        const groupid = group.id;
        Users.update({ groupid }, { where: { id: userid } })
          .then(() => {
            // 作ったグループをresponce
            res.json(groupResponceObjectFilter(group));
          })
          .catch(() => {
            Groups.destroy({ where: { id: groupid } })
              .then(() => {
                res.json({
                  error: true,
                  errorMessage:
                    "failed to update your groupid. And don't create new group"
                });
              })
              .catch(() => {
                res.json({
                  error: true,
                  errorMessage:
                    "created group and failed to update your groupid, but failed to delete new group"
                });
              });
          });
      });
    })
    .catch(() => {
      res.json({
        error: true,
        errorMessage: "unknown error. failed to access user database"
      });
    });
});

// routerをモジュールとして扱う準備
export default router;
