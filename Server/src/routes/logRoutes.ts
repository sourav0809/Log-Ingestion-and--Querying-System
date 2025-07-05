import { Router } from "express";
import { logController } from "../controllers/logController";

const router = Router();

router.get("/get", logController.getLogs);
router.post("/create", logController.createLog);

export default router;
