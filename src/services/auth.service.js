import createHttpError from "http-errors";
import valdator from "validator";
import { UserModel } from "../models/index.js";

// env variabel
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;
  console.info("createUser", userData);
  console.log("====================================");
  console.log("def pic", DEFAULT_PICTURE, DEFAULT_STATUS);
  console.log("====================================");

  // check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }

  // check name lenght
  if (
    !valdator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make soure name between 2 and 16 characture."
    );
  }

  // check status lenght
  if (status && status.length > 64) {
    throw createHttpError.BadRequest(
      "Please make soure your status less than 64 charactures."
    );
  }

  // check if email address is valid
  if (!valdator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make soure preovide a valid email address."
    );
  }

  // check if user already exist
  const checkDb = await UserModel.findOne({ email: email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "Please try again with a defferent email address, this email already exist."
    );
  }

  // check password lenght
  if (
    !valdator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make soure your password between 6 and 128 charactures."
    );
  }

  // hash password

  // adding user in database
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};
