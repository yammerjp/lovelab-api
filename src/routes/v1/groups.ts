import * as express from "express";
import { Groups } from "../../models/groups";
import { Users } from "../../models/users";

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
  const userid = parseInt(req.params.userid, 10); // TODO: アクセスしてきたuserのidを取り込む 現状ユーザーidがわからないと動かないので、クエリで入れる仕様としている
  if (Number.isNaN(userid)) {
    res.json({ error: true, errorMessage: "invalid query of userid" });
    return;
  }
  const { name, picturepath } = req.body;
  if (!validate(name)) {
    res.json({ error: true, errorMessage: "invalid name" });
    return;
  }
  // TODO: 自分がグループに所属していないことを確認
  // TODO: groupをcreate
  Groups.create({ name, picturepath }).then(group => {
    // 自分のgroupidを作ったグループのidに変更
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
});

// routerをモジュールとして扱う準備
export default router;
