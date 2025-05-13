import { Router } from "express";
// controllers
import * as controller from "./event.controller.js";
// middlewares
import * as Middlewares from "../../Middlewares/index.js";

const eventRouter = Router();
const { errorHandler, auth, authorization } = Middlewares;

eventRouter.post("/add", auth(), authorization(["admin"]), errorHandler(controller.addEvent));

eventRouter.get("/", errorHandler(controller.getAllEvents))

eventRouter.get("/:_id", errorHandler(controller.getEventById))

eventRouter.put("/update/:_id", auth(), authorization(["admin"]), errorHandler(controller.updateEvent))

eventRouter.delete("/delete/:_id", auth(), authorization(["admin"]), errorHandler(controller.deleteEvent))


export { eventRouter };