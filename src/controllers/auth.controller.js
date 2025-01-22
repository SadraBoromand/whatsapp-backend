import { createUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
