import { Router } from "express";
import { getLogs, createLog } from "../controllers/logController";

const router = Router();

router.get("/get", getLogs);
router.post("/create", createLog);

export default router;
