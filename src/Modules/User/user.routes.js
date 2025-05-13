import { Router } from "express";
// controllers
import * as controller from "./user.controller.js";
// middlewares
import * as Middlewares from "../../Middlewares/index.js";
// schemas
import { 
  registerSchema, 
  signInSchema, 
  updateSchema
} from "./user.schema.js";

const userRouter = Router();
const { 
  errorHandler, 
  auth, 
  validationMiddleware 
} = Middlewares;

userRouter.post(
  "/register", 
  validationMiddleware(registerSchema), 
  errorHandler(controller.registerUser)
);

userRouter.post(
  "/signin", 
  validationMiddleware(signInSchema), 
  errorHandler(controller.signIn)
);

userRouter.put(
  "/update", 
  auth(), 
  validationMiddleware(updateSchema),
  errorHandler(controller.updateUser)
);

userRouter.get(
  "/me", 
  auth(), 
  errorHandler(controller.getMe)
);

export { userRouter };