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
  console.log(req.body);
  res.json({ message: "hello, taskgenerators, get" });
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.json({ message: `hello, taskgenerators/${req.params.id}, get` });
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
  }

  TaskGenerators.create({
    name,
    comment,
    interval,
    firstdeadlinedate,
    groupid: groupidAuth,
    nextgeneratingdate: calcFirstGeneratingDate(firstdeadlinedate, interval)
  }).then(taskGenerator => {
    res.json(taskGenerator);
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
