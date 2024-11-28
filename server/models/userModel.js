import { Schema, model } from "mongoose";
import { Affiliate } from "./affiliateModel.js";
import pkg from "validator";
import bcrypt from "bcryptjs";

const { isEmail } = pkg;

// User Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please fill your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please fill your last name"],
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    minLength: 6,
    default: null,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Your password and confirmation password are not the same",
    },
    default: null,
  },
  role: {
    type: String,
    enum: ["admin", "agent", "client"],
    default: "client",
  },
  birthdate: {
    type: Date,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  profileImage: {
    type: String,
    default: null,
  },
}, { timestamps: true });

// Pre-save middleware to hash password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Method to check if passwords match
userSchema.methods.correctPassword = async function(typedPassword, originalPassword) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

// Client Schema
const phoneRegex = /^(8|(\+375))\s?\(?0?29\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

const clientSchema = new Schema({
  address: {
    type: String,
    nullable: true,
  },
  phoneNumber: {
    type: String,
    nullable: true,
    validate: {
      validator: function(v) {
        if (v == null) {
          return true;
        }
        return phoneRegex.test(v);
      },
      message: "Please provide a valid phone number",
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Ensure one-to-one relationship
  },
});

// Agent Schema
const agentSchema = new Schema({
  affiliate: {
    type: Schema.Types.ObjectId,
    ref: 'Affiliate',
    required: true,
  },
  tarriffRate: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Ensure one-to-one relationship
  },
  salary: {
    type: Number,
    required: true,
  }
});

// Models
const User = model("User", userSchema);
const Client = model("Client", clientSchema);
const Agent = model("Agent", agentSchema);

export { User, Client, Agent };