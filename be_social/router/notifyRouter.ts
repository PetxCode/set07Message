import { Router } from "express";
import { createNotice, readNotice } from "../controller/notifyController";

const router: Router = Router();

router.route("/notify").post(createNotice);
router.route("/read-notify").get(readNotice);

export default router;
