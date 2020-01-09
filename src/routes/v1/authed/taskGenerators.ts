import * as express from "express";
import { TaskGenerators } from "../../../models/taskGenerators";
import errorHandle from "../../../others/error";

const router = express.Router();

const calcFirstGeneratingDate = (
  firstDeadlineDate: Date,
  interval: Interval
): Date => {
  console.log(firstDeadlineDate);
  console.log(interval);
  return new Date();
};

router.get("/", (req, res) => {
  const { groupidAuth } = req.body;

  TaskGenerators.findAll({ where: { groupid: groupidAuth } })
    .then(taskGenerators => {
      res.json(taskGenerators);
    })
    .catch(() => {
      errorHandle(res, 1806);
    });
});

router.get("/:id", (req, res) => {
  const taskGeneratorId = parseInt(req.params.id, 10);
  const { groupidAuth } = req.body;

  if (Number.isNaN(taskGeneratorId)) {
    errorHandle(res, 1801);
    return;
  }

  TaskGenerators.findByPk(req.params.id)
    .then(taskGenerator => {
      if (taskGenerator === null) {
        return Promise.reject(1802);
      }
      if (taskGenerator.groupid !== groupidAuth) {
        return Promise.reject(1803);
      }
      res.json(taskGenerator);
      return Promise.resolve();
    })
    .catch(e => {
      errorHandle(res, e >= 1802 && e <= 1803 ? e : 1804);
    });
});

router.post("/", (req, res) => {
  const { name, comment, interval, firstdeadlinedate, groupidAuth } = req.body;
  if (
    name === null ||
    name === undefined ||
    comment === null ||
    comment === undefined ||
    interval === null ||
    interval === undefined ||
    firstdeadlinedate === null ||
    firstdeadlinedate === undefined
  ) {
    errorHandle(res, 1800);
    return;
  }
  if (groupidAuth === null) {
    errorHandle(res, 1801);
    return;
  }

  TaskGenerators.create({
    name,
    comment,
    interval,
    firstdeadlinedate,
    groupid: groupidAuth,
    nextgeneratingdate: calcFirstGeneratingDate(firstdeadlinedate, interval)
  })
    .then(taskGenerator => {
      res.json(taskGenerator);
    })
    .catch(() => {
      errorHandle(res, 1805);
    });
});

router.put("/:id", (req, res) => {
  console.log(req.params.id);
  res.json(req.body);
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  res.json({ message: `hello, taskgenerators/${req.params.id}, delete` });
});

// postまたはputしたとき、firstdeadlinedateから計算してnextgeneratingdateを求める
// generatingするとき、nextgeneratingdate += interval

// routerをモジュールとして扱う準備
export default router;
