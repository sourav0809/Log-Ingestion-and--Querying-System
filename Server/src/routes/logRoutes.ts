import { Router } from "express";
import { logController } from "../controllers/logController";
import validate from "../middleware/validate";
import { createLogsSchema, getLogsSchema } from "../validation/log.validation";

const router = Router();

router.get("/logs", validate(getLogsSchema), logController.getLogs);
router.post("/logs", validate(createLogsSchema), logController.createLogs);

export default router;
