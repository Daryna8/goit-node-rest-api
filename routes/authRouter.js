import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signupSchema, loginSchema } from "../schemas/usersSchemas.js";
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

export default authRouter;
