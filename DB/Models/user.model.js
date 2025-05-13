import { hashSync } from "bcrypt";
import mongoose from "../global-setup.js";
import { Gender, Role } from "../../src/Utils/index.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
  name: { 
    type: String, 
    unique: true 
  },
  email: { 
    type: String, 
    unique: true 
  },
  password: { 
    type: String, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: Object.values(Role), 
    default: 'user' 
  },
  gender: { 
    type: String, 
    enum: Object.values(Gender), 
    default: 'male' 
  },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, +process.env.SALT_ROUNDS);
    next();
  };
});

export const User = 
  mongoose.models.User || model("User", userSchema);