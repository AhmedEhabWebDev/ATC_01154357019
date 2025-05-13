import { Router } from "express";
// controllers
import * as controller from "./booking.controller.js";
// middlewares
import * as Middlewares from "../../Middlewares/index.js";

const bookingRouter = Router();
const { errorHandler, auth } = Middlewares;

bookingRouter.post("/book", auth(), errorHandler(controller.bookEvent));

bookingRouter.get("/getBookingsForUser", auth(), errorHandler(controller.getBookings));

bookingRouter.delete("/cancel/:bookingId", auth(), errorHandler(controller.cancelBooking));

export { bookingRouter };