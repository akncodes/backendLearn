import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
/**
 * Mongoose schema for the User model.
 *
 * Fields:
 * @property {String} username - Unique username for the user. Required, trimmed, lowercase, indexed.
 * @property {String} email - Unique email address of the user. Required, trimmed, lowercase.
 * @property {String} fullname - Full name of the user. Required, trimmed, indexed.
 * @property {String} avatar - URL or path to the user's avatar image. Required.
 * @property {String} coverImage - URL or path to the user's cover image. Required.
 * @property {mongoose.Schema.Types.ObjectId} watchHistory - Reference to the Video model representing the user's watch history.
 * @property {String} password - Hashed password for the user. Required.
 * @property {Date} createdAt - Date when the user was created. Defaults to current date.
 * @property {String} refrshToken - Refresh token for authentication (optional).
 * @property {Date} updatedAt - Date when the user was last updated. Defaults to current date.
 *
 * Schema Options:
 * @option {Boolean} timestamps - Automatically manages `createdAt` and `updatedAt` fields.
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,

      index: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    refrshToken: {
      type: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save",async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname,
     }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  };
  userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  };
export const User = mongoose.model("User", userSchema);
