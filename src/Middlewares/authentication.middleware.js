import jwt from "jsonwebtoken";
import { User } from "../../DB/Models/index.js";

/**
 * @returns {function} return middleware function
 * @description Check if the user is authenticated or not
 */

export const auth = () => {
  return async (req, res, next) => {
    try {
      // destruct token from headers
      const { token } = req.headers;

      // check if token is exists
      if (!token) return res.status(404).json({ message: "Token is required" });

      // check if token starts with prefix
      if (!token.startsWith(process.env.PREFIX_SECRET))
        return res.status(400).json({ message: "Invalid token" });

      // retrieve original token after adding the prefix
      const originalToken = token.split(" ")[1];

      // verify token
      const decodedToken = jwt.verify(originalToken, process.env.LOGIN_SECRET);

      // check if token payload has userId
      if (!decodedToken?.userId)
        return res.status(400).json({ message: "Invalid token payload" });

      // find user by userId
      const isUserExists = await User.findById(decodedToken?.userId);

      if (!isUserExists)
        return res.status(404).json({ message: "User not found" });

      // add the user data in req object
      req.authUser = isUserExists;

      next();
    } catch (error) {
      console.log("server error", error);
      res.status(500).json({ msg: "internal server error" });
    }
  };
};
