import * as express from "express";
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
  const { groupidAuth } = req.body;
  if (groupidAuth === null) {
    errorHandle(res, 1602);
    return;
  }
  Tasks.findAll({ where: { groupid: groupidAuth } })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(() => {
      errorHandle(res, 1603);
    });
});

// POST https://lovelab.2n2n.ninja/api/v1/tasks
//  タスクを追加 自分の所属するグループのみ追加可能
router.post("/", (req, res) => {
  const { groupidAuth, name, comment } = req.body;

  // TODO: whoisdoinguseridを受け取る
  // TODO: deadlinedate, finisheddateを受け取って型変換する。(あとでデータベースに詰め込めるようにする)
  if (!validate(name) || !validate(comment)) {
    errorHandle(res, 1605);
    return;
  }
  const taskRequest: TaskRequest = { name, comment, groupid: groupidAuth };
  Tasks.create(taskRequest)
    .then(task => {
      res.json(task);
    })
    .catch(() => {
      errorHandle(res, 1607);
    });
});

// GET https://lovelab.2n2n.ninja/api/v1/tasks/:taskid
//  タスクの詳細を取得 自分の所属するグループのみ取得可能
router.get("/:taskid", (req, res) => {
  const { groupidAuth } = req.body;
  const taskid = parseInt(req.params.taskid, 10);

  if (Number.isNaN(taskid)) {
    errorHandle(res, 1608);
    return;
  }
  // ユーザーidの所属するグループのタスクであることを確認
  Tasks.findByPk(taskid)
    .then(task => {
      if (task === null) {
        errorHandle(res, 1610);
        return;
      }
      if (task.groupid !== groupidAuth) {
        errorHandle(res, 1611);
        return;
      }
      res.json(task);
    })
    .catch(() => {
      errorHandle(res, 1612);
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

  const { groupidAuth, name, isfinished, comment } = req.body;
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
  Tasks.update(taskRequest, { where: { id: taskid } })
    .then(() => {
      Tasks.findByPk(taskid)
        .then(task => {
          if (task === null) {
            errorHandle(res, 1617);
            return;
          }
          if (task.groupid !== groupidAuth) {
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
});

// routerをモジュールとして扱う準備
export default router;
