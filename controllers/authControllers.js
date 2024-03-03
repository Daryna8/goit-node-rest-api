import * as authServices from "../services/authServices.js";
import * as userServices from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import gravatar from "gravatar";
import Jimp from "jimp";

const { JWT_SECRET } = process.env;

const avatarsDir = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = await authServices.signup({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "48h" });
  await authServices.setToken(user._id, token);

  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.setToken(_id);

  res.status(204).json({
    message: "No Content",
  });
};

const changeAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  Jimp.read(oldPath)
    .then((image) => image.resize(250, 250).write(`${avatarsDir}/${filename}`))
    .catch((err) => {
      console.error(err);
    });

  await fs.rm(oldPath);

  const avatarURL = path.join("avatars", filename);

  await userServices.changeAvatar(_id, avatarURL);
  return res.json({ avatarURL });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeAvatar: ctrlWrapper(changeAvatar),
};
