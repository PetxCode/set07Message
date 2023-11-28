import { Router } from "express";
import {
  createAuth,
  findAuth,
  findOneAuth,
  makeFriends,
  unFriends,
  updateAuth,
} from "../controller/authController";

const router: Router = Router();

router.route("/create-auth").post(createAuth);
router.route("/find-auth").get(findAuth);
router.route("/find-one-auth/:authID").get(findOneAuth);
router.route("/update-one-auth/:userID").patch(updateAuth);
router.route("/make-friend/:authID/:friendID").patch(makeFriends);
router.route("/un-friend/:authID/:friendID").patch(unFriends);

export default router;
