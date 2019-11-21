import * as express from "express";
import groupsRouter from "./groups";
import usersRouter from "./users";
import invitationsRouter from "./invitations";
import tasksRouter from "./tasks";
import loginRouter from "./login";

const router = express.Router();

router.use("/login", loginRouter);
router.use("/groups", groupsRouter);
router.use("/users", usersRouter);
router.use("/invitations", invitationsRouter);
router.use("/tasks", tasksRouter);

export default router;
