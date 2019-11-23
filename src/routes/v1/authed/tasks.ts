import * as express from "express";
import { Users } from "../../../models/users";
import { Tasks } from "../../../models/tasks";

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
        res.json({
          error: true,
          errorMessage: "access user is not found on database"
        });
        return;
      }
      const { groupid } = user;
      if (groupid === null) {
        res.json({
          error: true,
          errorMessage: "you are not joined any groups"
        });
        return;
      }
      Tasks.findAll({ where: { groupid } })
        .then(tasks => {
          res.json(tasks);
        })
        .catch(() => {
          res.json({ error: true, errorMessage: "DataBase error" });
        });
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database error to access users" });
    });
});

// POST https://lovelab.2n2n.ninja/api/v1/tasks
//  タスクを追加 自分の所属するグループのみ追加可能
router.post("/", (req, res) => {
  const { userid, name, comment } = req.body;

  // TODO: whoisdoinguseridを受け取る
  // TODO: deadlinedate, finisheddateを受け取って型変換する。(あとでデータベースに詰め込めるようにする)
  if (!validate(name) || !validate(comment)) {
    res.json({ error: true, errorMessage: "Invalid params of request" });
    return;
  }
  Users.findByPk(userid)
    .then(user => {
      if (user === null) {
        res.json({
          error: true,
          errorMessage: "user is not found in database"
        });
        return;
      }
      const taskRequest: TaskRequest = { name, comment, groupid: user.groupid };
      Tasks.create(taskRequest)
        .then(task => {
          res.json(task);
        })
        .catch(() => {
          res.json({ error: true, errorMessage: "Database error" });
        });
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database error findByPk" });
    });
});

// GET https://lovelab.2n2n.ninja/api/v1/tasks/:taskid
//  タスクの詳細を取得 自分の所属するグループのみ取得可能
router.get("/:taskid", (req, res) => {
  const taskid = parseInt(req.params.taskid, 10);

  if (Number.isNaN(taskid)) {
    res.json({ error: true, errorMessage: "Invalid or task id" });
    return;
  }
  // ユーザーidの所属するグループのタスクであることを確認
  Users.findByPk(req.body.userid)
    .then(user => {
      if (user === null) {
        res.json({
          error: true,
          errorMessage: "accessed user is not found on database"
        });
        return;
      }
      Tasks.findByPk(taskid)
        .then(task => {
          if (task === null) {
            res.json({ error: true, errorMessage: "Task is not found" });
            return;
          }
          if (task.groupid !== user.groupid) {
            res.json({ error: true, errorMessage: "Not parmitted. " });
            return;
          }
          res.json(task);
        })
        .catch(() => {
          res.json({ error: true, errorMessage: "Database error" });
        });
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database error. users" });
    });
});

// PUT https://lovelab.2n2n.ninja/api/v1/groups/:groupid/tasks/:taskid
//  タスクを完了 自分の所属するグループのみ編集可能
router.put("/:taskid", (req, res) => {
  const taskid = parseInt(req.params.taskid, 10);
  if (Number.isNaN(taskid)) {
    res.json({ error: true, errorMessage: "Invalid or task id" });
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
    res.json({ error: true, errorMessage: "isfinished is need true/false" });
    return;
  }
  // TODO: name, commentのSQLインジェクション可能性排除
  // TODO: 自分の所属するグループのタスクであることを確認
  Users.findByPk(userid)
    .then(user => {
      if (user === null) {
        res.json({
          error: true,
          errorMessage: "accessed user is not found on database"
        });
        return;
      }

      Tasks.update(taskRequest, { where: { id: taskid } })
        .then(() => {
          Tasks.findByPk(taskid)
            .then(task => {
              if (task === null) {
                res.json({
                  error: true,
                  errorMessage: "searching task from task id is failed"
                });
                return;
              }
              if (user.groupid !== task.groupid) {
                res.json({
                  error: true,
                  errorMessage: "Not permitted. the task is out of your group."
                });
                return;
              }
              res.json(task);
            })
            .catch(() => {
              res.json({
                error: true,
                errorMessage: "Database updated. and failed to get updated task"
              });
            });
        })
        .catch(() => {
          res.json({
            error: true,
            errorMessage: "Database error. tasks update"
          });
        });
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database error. user find" });
    });
});

// routerをモジュールとして扱う準備
export default router;
