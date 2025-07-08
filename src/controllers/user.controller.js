import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req, res) => {
  //get  user data from frontend
  // validation - not empty, valid email, password length, etc.
  // check if user already exists: username or email
  //check for images , check for avatar
  // upload images to cloudinary
  // create user object - create entry in database
  // remove password and refresh token fields from response
  // check if user is created successfully
  // return if failed
  });

export default registerUser;