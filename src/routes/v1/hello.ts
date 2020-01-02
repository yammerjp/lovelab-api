import * as express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (false) console.log(req);
  res.json({
    running: true,
    message: "Hello,lovelab. This API server is running."
  });
});

export default router;
