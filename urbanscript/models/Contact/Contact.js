import mongoose, { Schema } from "mongoose";

// Updated schema to include first_name, last_name, and phone_number
const contactSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
    minLength: [2, "First name must be larger than 2 characters"],
    maxLength: [50, "First name must be lesser than 50 characters"],
  },

  last_name: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
    minLength: [2, "Last name must be larger than 2 characters"],
    maxLength: [50, "Last name must be lesser than 50 characters"],
  },

  fullname: {
    type: String,
    trim: true,
    minLength: [2, "Full name must be larger than 2 characters"],
    maxLength: [100, "Full name must be lesser than 100 characters"],
    // Store the fullname as a concatenation of first and last names
    default: function () {
      return `${this.first_name} ${this.last_name}`;
    },
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },

  phone_number: {
    type: String,
    required: false, // Make it optional
    validate: {
      validator: function (v) {
        return v === "" || /^\+?[1-9]\d{1,14}$/.test(v); // Allow empty string or valid format
      },
      message: "Invalid phone number",
    },
  },
  

  message: {
    type: String,
    required: [true, "Message is required."],
    trim: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the schema
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
