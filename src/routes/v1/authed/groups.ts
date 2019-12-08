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

//  グループを追加 自分が強制的にそのグループに所属することになる
router.post("/", (req, res) => {
  const { useridAuth, groupidAuth, name, picturepath } = req.body;
  if (!validate(name)) {
    errorHandle(res, 1304);
    return;
  }
  if (groupidAuth !== null) {
    errorHandle(res, 1306);
    return;
  }

  Groups.create({ name, picturepath })
    .then(group => {
      // アクセスしたユーザーを新しく作ったグループに加盟させる。
      const groupid = group.id;
      Users.update({ groupid }, { where: { id: useridAuth } })
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
    })
    .catch(() => {
      errorHandle(res, 1309);
    });
});

export default router;
