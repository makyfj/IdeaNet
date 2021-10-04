import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamp: true,
  }
);

// Compares encryptedPassword/hash with password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypts new user password when registered
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Hash and salt password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
