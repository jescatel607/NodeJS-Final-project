import { Router } from "express";
import { sayHola } from "../controllers/pingcontroller.js";

const router = Router();

router.get("/", sayHola); // GET /api/ping
export default router;
