import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signupSchema, loginSchema } from "../schemas/usersSchemas.js";
import authtenticate from "../middlewares/autenticate.js";

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

export default authRouter;
