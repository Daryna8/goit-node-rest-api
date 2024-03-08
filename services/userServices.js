import User from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);
export const findUserById = (id) => User.findById(id);
export const changeAvatar = (id, avatarURL) =>
  User.findByIdAndUpdate(id, { avatarURL });
export const updateUser = (filter, data) =>
  User.updateOne(filter, { $set: data });
