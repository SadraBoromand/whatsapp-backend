import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import trimRequest from "trim-request";
("trim-request");
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshToken").post(trimRequest.all, refreshToken);
router
  .route("/testingauth")
  .get(trimRequest.all, authMiddleware, (req, res) => {
    res.send(req.user);
  });

export default router;
