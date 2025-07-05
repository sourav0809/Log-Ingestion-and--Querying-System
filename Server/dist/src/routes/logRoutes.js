"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logController_1 = require("../controllers/logController");
const router = (0, express_1.Router)();
router.post("/logs", logController_1.LogController.createLog);
router.get("/logs", logController_1.LogController.getLogs);
exports.default = router;
