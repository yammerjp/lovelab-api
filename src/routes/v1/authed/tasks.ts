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

// GET https://lovelab.2n2n.ninja/api/v1/tasks?groupid=groupid
//  グループのタスク一覧を取得 自分の所属するグループのみ取得可能
router.get("/", (req, res) => {
  const groupid = parseInt(req.query.groupid, 10);
  if (Number.isNaN(groupid)) {
    res.json({ error: true, errorMessage: "Invalid query of group id" });
    return;
  }
  // TODO: groupidがアクセスしてきたユーザーの所属するグループのものであることを確認
  Tasks.findAll({ where: { groupid } })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "DataBase error" });
    });
});

// POST https://lovelab.2n2n.ninja/api/v1/tasks?userid=
//  タスクを追加 自分の所属するグループのみ追加可能
// 認証を実施していないので、誰が追加したタスクかわかるようにクエリにユーザーidを付与してとりあえず動作させる
router.post("/", (req, res) => {
  const userid = parseInt(req.query.userid, 10); // TODO: 認証からuseridを取得してクエリをなくす
  const { name, comment } = req.body;

  // TODO: whoisdoinguseridを受け取る
  // TODO: deadlinedate, finisheddateを受け取って型変換する。(あとでデータベースに詰め込めるようにする)
  if (Number.isNaN(userid)) {
    res.json({ error: true, errorMessage: "Invalid query of user id" });
    return;
  }
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

// GET https://lovelab.2n2n.ninja/api/v1/tasks/:taskid?userid=
//  タスクの詳細を取得 自分の所属するグループのみ取得可能
router.get("/:taskid", (req, res) => {
  const taskid = parseInt(req.params.taskid, 10);

  if (Number.isNaN(taskid)) {
    res.json({ error: true, errorMessage: "Invalid or task id" });
    return;
  }
  // TODO: ユーザーidの所属するグループのタスクであることを確認

  Tasks.findByPk(taskid)
    .then(task => {
      if (task === null) {
        res.json({ error: true, errorMessage: "Task is not found" });
        return;
      }
      res.json(task);
    })
    .catch(() => {
      res.json({ error: true, errorMessage: "Database error" });
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

  const { name, isfinished, comment } = req.body;
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

  Tasks.update(taskRequest, { where: { id: taskid } })
    .then(() => {
      Tasks.findByPk(taskid)
        .then(task => {
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
      res.json({ error: true, errorMessage: "Database error" });
    });
});

// routerをモジュールとして扱う準備
export default router;
