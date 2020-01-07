import * as express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "hello, taskgenerators, get" });
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.json({ message: `hello, taskgenerators/${req.params.id}, get` });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

router.put("/:id", (req, res) => {
  console.log(req.params.id);
  res.json(req.body);
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  res.json({ message: `hello, taskgenerators/${req.params.id}, delete` });
});

// routerをモジュールとして扱う準備
export default router;
