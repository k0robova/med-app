import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";

export const registerUser = ctrlWrapper(async (req, res) => {
  const { name, email } = req.body;
  const ifUserExists = await authServices.emailUnique(email);

  if (ifUserExists) {
    throw HttpError(409, "User with such email already in use");
  }

  const newUser = await authServices.registerUserDB(req.body);

  res.status(201).json({
    token: newUser.token,
    user: {
      name,
      email,
    },
  });
});

export const loginUser = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.emailUnique(email);

  if (!user) {
    throw HttpError(409, "User with such email already in use");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw HttpError(400, "Invalid email or password");
  }

  const newUser = await authServices.loginUserDB(user._id);

  res.json({
    token: newUser.token,
    user: {
      name: newUser.name,
      email,
    },
  });
});

export const getCurrentUser = ctrlWrapper(async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
});

export const logoutUser = ctrlWrapper(async (req, res) => {
  await authServices.logoutUserDB(req.user._id);

  res.json({
    message: "Logout was successful",
  });
});

// export const updateUser = ctrlWrapper(async (req, res) => {

// });
