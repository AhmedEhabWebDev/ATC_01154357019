import mongoose from "../global-setup.js";

const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
  title: {
    type: String, 
    required: true 
  },
  description: String,
  date: { 
    type: Date, 
    required: true 
  },
  location: String,
  totalSeats: { 
    type: Number, 
    required: true 
  },
  availableSeats: { 
    type: Number, 
    required: true 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }
  },
  {
    timestamps: true,
  }
);

export const Event = 
  mongoose.models.Event || model("Event", eventSchema);