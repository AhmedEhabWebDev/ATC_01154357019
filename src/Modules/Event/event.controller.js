// Models
import { Event, User } from "../../../DB/Models/index.js";
// Utils
import { ErrorClass } from "../../Utils/index.js";


/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message, data }
 * @api {POST} api/events/add Add a new event
 * @description Add a new event
 */

export const addEvent = async (req, res, next) => {
  // destruct _id from req.authUser
  const { _id } = req.authUser;
  // destruct name, email, password, role, gender from req.body
  const { title, description, date, location, totalSeats } = req.body;

  // check if user already exists
  const user = await User.findById(_id);
  if (!user)
    return next(new ErrorClass("User not found", 404, "User not found"));

  // create new event
  const newEvent = new Event({
    title,
    description,
    date,
    location,
    totalSeats,
    createdBy: _id,
    availableSeats: totalSeats
  });

  // save user
  await newEvent.save();

  // response
  res.status(201).json({
    status: "success",
    message: "Event created successfully",
    data: newEvent,
  });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message, data }
 * @api {GET} api/events/
 * @description get all events
 */

export const getAllEvents = async (req, res, next) => {
  // find all events
  const events = await Event.find().sort({date: 1})
  // check if events exists
  if (events.length === 0) {
    return res.status(200).json({
      massage: "There are no events"
    });
  }

  res.status(200).json({
    status: "success",
    massage: "Events get successfully",
    data: events
  })
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message, data }
 * @api {POST} api/events/:id Add a new event
 * @description Add a new event
 */

export const getEventById = async (req, res, next) => {
  // destruct _id from params
  const { _id } = req.params
  // find event by id
  const event = await Event.findById(_id)
  if (!event) 
    return next(new ErrorClass("Event not found", 404, "Event not found"))

  res.status(200).json({
    status: "success",
    massage: "Event get successfully",
    data: event
  })
}

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message, data }
 * @api {POST} api/events/update/:_id
 * @description update event
 */

export const updateEvent = async (req, res, next) => {
  // destruct userId from req.authUser
  const { _id: userId } = req.authUser
  // destruct name, email, password, role, gender from req.body
  const { title, description, date, location, totalSeats } = req.body;
  // destruct eventId from params
  const { _id } = req.params

  // check if user already exists
  const user = await User.findById(userId)
  if (!user) 
    return next(new ErrorClass("User not found", 404, "User not found"))

  // find event by id
  const event = await Event.findById(_id);
  if (!event) 
    return next(new ErrorClass("Event not found", 404, "Event not found"))

  // update event
  if (title) event.title = title;
  if (description) event.description = description;
  if (date) event.date = date;
  if (location) event.location = location;
  if (totalSeats) {
    const diff = totalSeats - event.totalSeats;
    event.totalSeats = totalSeats;
    event.availableSeats += diff;
  }

  // save event
  await event.save();

  res.status(200).json({
    status: "success",
    massage: "Event updated successfully",
    data: event
  })
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { status, message }
 * @api {POST} api/events/delete/:_id
 * @description delete event
 */

export const deleteEvent = async (req, res, next) => {
  // destruct userId from req.authUser
  const { _id: userId } = req.authUser;
  // destruct eventId from params
  const { _id } = req.params;

  // check if user already exists
  const user = await User.findById(userId);
  if (!user) 
    return next(new ErrorClass("User not found", 404, "User not found"));

  // find event by id
  const event = await Event.findByIdAndDelete(_id);
  if (!event) 
    return next(new ErrorClass("Event not found", 404, "Event not found"));

  res.status(200).json({
    status: "success",
    massage: "Event deleted successfully"
  });
}