import * as express from "express";
import { Users } from "../../../models/users";
import { Tasks } from "../../../models/tasks";
import errorHandle from "../../../others/error";

interface TaskRequest {
  name?: string;
  comment?: string;
  groupid?: number;
  isfinished?: boolean;
  whoisdoinguserid?: number;
}
const router = express.Router();

const validate = (str: string): boolean => {
  if (str === undefined || str === null || str === "") {
    return false;
  }
  return true;
};

// GET https://lovelab.2n2n.ninja/api/v1/tasks
//  自分の所属するグループのタスク一覧を取得
router.get("/", (req, res) => {
  Users.findByPk(req.body.userid)
    .then(user => {
      if (user === null) {
        errorHandle(res, 1601);
        return;
      }
      const { groupid } = user;
      if (groupid === null) {
        errorHandle(res, 1602);
        return;
      }
      Tasks.findAll({ where: { groupid } })
        .then(tasks => {
          res.json(tasks);
        })
        .catch(() => {
          errorHandle(res, 1603);
        });
    })
    .catch(() => {
      errorHandle(res, 1604);
    });
});

// POST https://lovelab.2n2n.ninja/api/v1/tasks
//  タスクを追加 自分の所属するグループのみ追加可能
router.post("/", (req, res) => {
  const { userid, name, comment } = req.body;

  // TODO: whoisdoinguseridを受け取る
  // TODO: deadlinedate, finisheddateを受け取って型変換する。(あとでデータベースに詰め込めるようにする)
  if (!validate(name) || !validate(comment)) {
    errorHandle(res, 1605);
    return;
  }
  Users.findByPk(userid)
    .then(user => {
      if (user === null) {
        errorHandle(res, 1606);
        return;
      }
      const taskRequest: TaskRequest = { name, comment, groupid: user.groupid };
      Tasks.create(taskRequest)
        .then(task => {
          res.json(task);
        })
        .catch(() => {
          errorHandle(res, 1607);
        });
    })
    .catch(() => {
      errorHandle(res, 1608);
    });
});

// GET https://lovelab.2n2n.ninja/api/v1/tasks/:taskid
//  タスクの詳細を取得 自分の所属するグループのみ取得可能
router.get("/:taskid", (req, res) => {
  const taskid = parseInt(req.params.taskid, 10);

  if (Number.isNaN(taskid)) {
    errorHandle(res, 1608);
    return;
  }
  // ユーザーidの所属するグループのタスクであることを確認
  Users.findByPk(req.body.userid)
    .then(user => {
      if (user === null) {
        errorHandle(res, 1609);
        return;
      }
      Tasks.findByPk(taskid)
        .then(task => {
          if (task === null) {
            errorHandle(res, 1610);
            return;
          }
          if (task.groupid !== user.groupid) {
            errorHandle(res, 1611);
            return;
          }
          res.json(task);
        })
        .catch(() => {
          errorHandle(res, 1612);
        });
    })
    .catch(() => {
      errorHandle(res, 1613);
    });
});

// PUT https://lovelab.2n2n.ninja/api/v1/groups/:groupid/tasks/:taskid
//  タスクを完了 自分の所属するグループのみ編集可能
router.put("/:taskid", (req, res) => {
  const taskid = parseInt(req.params.taskid, 10);
  if (Number.isNaN(taskid)) {
    errorHandle(res, 1614);
    return;
  }

  const { userid, name, isfinished, comment } = req.body;
  // TODO: Deadline, finishedlineを扱えるようにする

  const taskRequest: TaskRequest = {};
  if (name !== undefined) {
    taskRequest.name = name;
  }
  if (comment !== undefined) {
    taskRequest.comment = comment;
  }
  if (isfinished === true || isfinished === false) {
    taskRequest.isfinished = isfinished;
  } else if (isfinished !== undefined) {
    errorHandle(res, 1615);
    return;
  }
  // TODO: name, commentのSQLインジェクション可能性排除
  // TODO: 自分の所属するグループのタスクであることを確認
  Users.findByPk(userid)
    .then(user => {
      if (user === null) {
        errorHandle(res, 1616);
        return;
      }

      Tasks.update(taskRequest, { where: { id: taskid } })
        .then(() => {
          Tasks.findByPk(taskid)
            .then(task => {
              if (task === null) {
                errorHandle(res, 1617);
                return;
              }
              if (user.groupid !== task.groupid) {
                errorHandle(res, 1618);
                return;
              }
              res.json(task);
            })
            .catch(() => {
              errorHandle(res, 1619);
            });
        })
        .catch(() => {
          errorHandle(res, 1620);
        });
    })
    .catch(() => {
      errorHandle(res, 1621);
    });
});

// routerをモジュールとして扱う準備
export default router;
