import * as express from "express";
import { Groups } from "../../../models/groups";
import { Users } from "../../../models/users";
import errorHandle from "../../../others/error";

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
    errorHandle(res, 1301);
    return;
  }
  Groups.findByPk(id)
    .then(group => {
      if (group === null) {
        errorHandle(res, 1302);
        return;
      }
      res.json(groupResponceObjectFilter(group));
    })
    .catch(() => {
      errorHandle(res, 1303);
    });
});

// POST https://lovelab.2n2n.ninja/api/v1/groups?userid=:userid
//  グループを追加 自分が強制的にそのグループに所属することになる
router.post("/", (req, res) => {
  const { userid, name, picturepath } = req.body;
  if (!validate(name)) {
    errorHandle(res, 1304);
    return;
  }
  Users.findByPk(userid)
    .then(user => {
      if (user === null) {
        errorHandle(res, 1305);
        return;
      }
      // 自分がグループに所属していないことを確認
      if (user.groupid !== null) {
        errorHandle(res, 1306);
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
                errorHandle(res, 1307);
              })
              .catch(() => {
                errorHandle(res, 1308);
              });
          });
      });
    })
    .catch(() => {
      errorHandle(res, 1309);
    });
});

// routerをモジュールとして扱う準備
export default router;
