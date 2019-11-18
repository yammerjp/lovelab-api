import * as express from "express";
import groupsRouter from "./groups";
import usersRouter from "./users";

const router = express.Router();

router.use("/groups", groupsRouter);
router.use("/users", usersRouter);

export default router;
