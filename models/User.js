
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "superadmin"]
      }
    
    },
    { timestamps: true }
  );

const User = mongoose.model('user', userSchema)
module.exports = User