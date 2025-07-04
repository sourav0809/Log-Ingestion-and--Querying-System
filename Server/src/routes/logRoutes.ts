import { Router } from "express";
import { LogController } from "../controllers/logController";

const router = Router();

router.post("/logs", LogController.createLog);
router.get("/logs", LogController.getLogs);

export default router;
