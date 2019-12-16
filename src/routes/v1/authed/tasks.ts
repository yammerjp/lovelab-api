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
  finisheddate?: Date;
  doneuserid?: number;
  deadlinedate?: Date | null;
}
const router = express.Router();

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
  const {
    groupidAuth,
    name,
    comment,
    whoisdoinguserid,
    deadlinedate
  } = req.body;
  // TODO: deadlinedate, finisheddateを受け取って型変換する。(あとでデータベースに詰め込めるようにする)
  const taskRequest: TaskRequest = {
    name,
    comment,
    groupid: groupidAuth,
    whoisdoinguserid,
    deadlinedate
  };

  if (name === null || name === undefined) {
    errorHandle(res, 1605);
    return;
  }

  new Promise((resolve, reject) => { // eslint-disable-line
    if (req.query.auto === "true") {
      // whoisdoinguseridをどの値にするか、マジックナンバーではなくデータベースを参照せねばならない
      taskRequest.whoisdoinguserid = 2;
      return resolve();
    }
    if (
      taskRequest.whoisdoinguserid === undefined ||
      taskRequest.whoisdoinguserid === null
    ) {
      return resolve();
    }
    Users.findByPk(whoisdoinguserid)
      .then(user => {
        if (user === null || user.groupid !== groupidAuth) {
          return reject(1621);
        }
        return resolve();
      })
      .catch(() => {
        return reject();
      });
  })
    .then(() => {
      return Tasks.create(taskRequest);
    })
    .then(task => {
      res.json(task);
    })
    .catch(e => {
      errorHandle(res, e === 1621 ? e : 1607);
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

  const {
    useridAuth,
    groupidAuth,
    name,
    isfinished,
    comment,
    whoisdoinguserid,
    deadlinedate
  } = req.body;
  // TODO: Deadline, finishedlineを扱えるようにする
  // TODO: name, commentのSQLインジェクション可能性排除

  const taskRequest: TaskRequest = {
    name,
    comment,
    isfinished,
    whoisdoinguserid,
    deadlinedate
  };

  new Promise((resolve, reject) => { // eslint-disable-line
    if (
      taskRequest.whoisdoinguserid === undefined ||
      taskRequest.whoisdoinguserid === null
    ) {
      return resolve();
    }
    Users.findByPk(whoisdoinguserid)
      .then(user => {
        if (user === null || user.groupid !== groupidAuth) {
          return reject(1621);
        }
        return resolve();
      })
      .catch(() => {
        return reject();
      });
  })
    .then(() => {
      return Tasks.findByPk(taskid);
    })
    .then(task => {
      if (task === null) {
        return Promise.reject(1617);
      }
      if (task.isfinished === false && isfinished === true) {
        taskRequest.finisheddate = new Date();
        taskRequest.doneuserid = useridAuth;
      }
      return Tasks.update(taskRequest, { where: { id: taskid } });
    })
    .then(() => {
      return Tasks.findByPk(taskid);
    })
    .then(task => {
      if (task === null) {
        return Promise.reject(1617);
      }
      if (task.groupid !== groupidAuth) {
        return Promise.reject(1618);
      }
      res.json(task);
      return Promise.resolve(0);
    })
    .catch(e => {
      errorHandle(res, e === 1617 || e === 1618 || e === 1621 ? e : 1619);
    });
});

// routerをモジュールとして扱う準備
export default router;
