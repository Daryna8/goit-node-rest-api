import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signupSchema, loginSchema } from "../schemas/usersSchemas.js";

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

export default authRouter;
