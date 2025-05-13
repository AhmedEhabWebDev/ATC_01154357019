// Models
import { 
  Booking, 
  Event, 
  User 
} from "../../../DB/Models/index.js";
// Utils
import { ErrorClass } from "../../Utils/index.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message, data }
 * @api {POST} api/booking/book
 * @description book a event
 */

export const bookEvent = async (req, res, next) => {
  // destruct userId from req.authUser
  const { _id } = req.authUser;
  // destruct eventId, numberOfTickets from req.body
  const { eventId, numberOfTickets } = req.body;

  // check if user already exists
  const user = await User.findById(_id);
  if (!user) 
    return next(new ErrorClass("User not found", 404, "User not found"));

  // find event by id
  const event = await Event.findById(eventId);
  if (!event) 
    return next(new ErrorClass("Event not found", 404, "Event not found"));

  // create new booking
  const booking = new Booking({
    user: _id,
    event: eventId,
    numberOfTickets,
  });

  // update event available seats when user book
  event.availableSeats -= numberOfTickets;
  // save event
  await event.save();

  // save booking
  await booking.save();

  res.status(201).json({
    status: 'success',
    message: 'Booking created successfully', 
    data: booking 
  });
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message, data }
 * @api {POST} api/booking/getBookingsForUser
 * @description Get all bookings for user
*/

export const getBookings = async (req, res, next) => {
  // destruct userId from req.authUser
  const { _id } = req.authUser;

  // check if user already exists
  const user = await User.findById(_id);
  if (!user)
    return next(new ErrorClass("User not found", 404, "User not found"));

  // find bookings by userId
  const bookings = await Booking.find({ user: _id }).populate('event');
  
  res.status(200).json({
    status: 'success',
    message: 'Bookings fetched successfully',
    data: bookings 
  });
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message }
 * @api {POST} api/booking/cancel
 * @description cancel a booking
 */

export const cancelBooking = async (req, res, next) => {
  // destruct userId from req.authUser
  const { _id } = req.authUser;
  // destruct bookingId from params
  const { bookingId } = req.params;

  // check if user already exists
  const user = await User.findById(_id);
  if (!user) 
    return next(new ErrorClass("User not found", 404, "User not found"));

  // find and delete booking by id
  const booking = await Booking.findByIdAndDelete({_id: bookingId});
  if (!booking) 
    return next(new ErrorClass("Booking not found", 404, "Booking not found"));

  res.status(200).json({
    status: 'success',
    message: 'Booking canceled successfully'
  });
}