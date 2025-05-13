import mongoose from '../global-setup.js';

const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  event: { 
    type: Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  bookedAt: { 
    type: Date, 
    default: Date.now 
  },
  numberOfTickets: { 
    type: Number, 
    required: true 
  },
  },
  {
    timestamps: true
  }
);

export const Booking = 
  mongoose.models.Booking || model('Booking', bookingSchema);
