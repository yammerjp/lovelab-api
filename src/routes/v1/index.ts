import * as express from "express";
import loginRouter from "./login";
import signupRouter from "./signup";

const router = express.Router();

router.use("/signup", signupRouter);
router.use("/login", loginRouter);

export default router;
