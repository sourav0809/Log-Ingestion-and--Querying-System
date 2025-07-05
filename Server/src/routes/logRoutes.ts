import { Router } from "express";
import { LogController } from "../controllers/logController";

const router = Router();

router.post("/create", LogController.createLog);
router.get("/get", LogController.getLogs);

export default router;
