import { Schema, model } from "mongoose";
import validator from "validator";

const phoneRegex = /^(8|(\+375))\s?\(?0?29\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

// Agent Schema
const affiliateSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please fill your agency name"],
  },
  address: {
    type: String,
    required: [true, "Please fill your license number"],
  },
  phone: {
    type: String,
    required: [false, "Please fill affiliate phone number"],
    validate: {
      validator: function(v) {
        return phoneRegex.test(v);
      },
      message: "Please provide a valid phone number",
    },
  }
});

const Affiliate = model("Affiliate", affiliateSchema);
export { Affiliate };