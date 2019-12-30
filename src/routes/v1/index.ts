import * as express from "express";
import loginRouter from "./login";
import signupRouter from "./signup";
import helloRouter from "./hello";

const router = express.Router();

router.use("/", helloRouter);
router.use("/signup", signupRouter);
router.use("/login", loginRouter);

export default router;
