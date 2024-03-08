import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  signupSchema,
  loginSchema,
  verifySchema,
} from "../schemas/usersSchemas.js";
import authtenticate from "../middlewares/autenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  validateBody(signupSchema),
  authControllers.signup
);

authRouter.post(
  "/users/login",
  validateBody(loginSchema),
  authControllers.login
);

authRouter.get("/users/current", authtenticate);

authRouter.post("/users/logout", authtenticate, authControllers.logout);

authRouter.patch(
  "/users/avatars",
  upload.single("photo"),
  authtenticate,
  authControllers.changeAvatar
);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post(
  "/users/verify",
  validateBody(verifySchema),
  authControllers.resendVerificationEmail
);

export default authRouter;
