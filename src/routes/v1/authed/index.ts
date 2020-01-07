import * as express from "express";
import groupsRouter from "./groups";
import usersRouter from "./users";
import invitationsRouter from "./invitations";
import tasksRouter from "./tasks";
import taskGeneratorsRouter from "./taskGenerators";

const router = express.Router();

router.use("/groups", groupsRouter);
router.use("/users", usersRouter);
router.use("/invitations", invitationsRouter);
router.use("/tasks", tasksRouter);
router.use("/taskgenerators", taskGeneratorsRouter);

export default router;
