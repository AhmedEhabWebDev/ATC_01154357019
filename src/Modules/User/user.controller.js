import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
// Models
import { User } from "../../../DB/Models/index.js";
// Utils
import { ErrorClass } from "../../Utils/index.js";


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message }
 * @api {POST} api/users/register Register a new user
 * @description Register a new user
 */

export const registerUser = async (req, res, next) => {
  // destruct name, email, password, role, gender from req.body
  const { name, email, password, role, gender } = req.body;

  // check if user already exists
  const user = await User.findOne({ email });
  if (user)
    return next(new ErrorClass("User already exists", 400, "User already exists"));

  // create new user
  const newUser = new User({
    name,
    email,
    password,
    role,
    gender
  });

  // save user
  await newUser.save();

  // response
  res.status(201).json({
    status: "success",
    message: "User created successfully"
  });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { message, token }
 * @description User signin 
 * @api {POST} api/user/signin
 */

export const signIn = async (req, res, next) => {
  // destruct email and password from req.body
  const { email, password } = req.body;
  // find user
  const user = await User.findOne({ email });
  if (!user)
    return next(new ErrorClass("invalid email or password", 404, "invalid email or password"));

  // compare password
  const isMatch = compareSync(password, user.password);

  if (!isMatch)
    return  next(new ErrorClass("invalid email or password", 404, "invalid email or password"));

  // generate the access token
  const token = jwt.sign({ userId: user._id, email, role: user.role }, process.env.LOGIN_SECRET);

  // response
  res.status(200).json({
    message: "Login success",
    token
  });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message }
 * @api {PUT} api/user/update Update username, email, password
 * @description Update User
 */

export const updateUser = async (req, res, next) => {
  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // destruct name, email, password from req.body
  const { name, email, password } = req.body;

  // find User by id
  const user = await User.findById(_id);
  if (!user) {
    return next(new ErrorClass("User not found", 404, "User not found"));
  }

  // update User email
  if (email) {
    user.email = email;
  }
  // update User name
  if (name) {
    user.name = name;
  }
  // update User password
  if (password) {
    user.password = password;
  }

  // save User
  await user.save();

  res.status(200).json({
    status: "success",
    message: "User updated successfully"
  });
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message, data }
 * @api {GET} api/user/me Get User
 * @description Get User
 */

export const getMe = async (req, res, next) => {
  // destruct _id from req.authUser
  const { _id } = req.authUser;
  // find User by id
  const user = await User.findById(_id).select("-password");
  if (!user) {
    return next(new ErrorClass("User not found", 404, "User not found"));
  }
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
};