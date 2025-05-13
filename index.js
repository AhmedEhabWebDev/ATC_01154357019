import express from "express";
import { config } from "dotenv";
import { rateLimit } from "express-rate-limit";
import { globaleResponse } from "./src/Middlewares/index.js";
import db_connection from "./DB/connection.js";
import * as router from "./src/Modules/index.js";
import cors from "cors";

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, // Limit each IP to 100 requests
	standardHeaders: 'draft-8', 
	legacyHeaders: false
})



config();

const app = express();
const port = process.env.PORT || 5000;

app.use(limiter)
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", router.userRouter);
app.use("/api/v1/events", router.eventRouter);
app.use("/api/v1/booking", router.bookingRouter);

app.use("*", (req, res,next) => 
  res.status(404).json({massage:"Route Not Found"})
);

app.use(globaleResponse);

db_connection();


app.get("/", (req, res) => res.send("Hello World!"));
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));