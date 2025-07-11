import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
// Assuming you have a User model defined in models/user.model.js
/**
 * Registers a new user in the system.
 *
 * This controller function handles the registration process for a new user. It performs the following steps:
 * - Validates required fields (username, email, fullname, password) to ensure they are not empty.
 * - Checks if a user with the given username or email already exists in the database.
 * - Validates the presence of avatar and cover image files in the request.
 * - Uploads avatar and cover image to Cloudinary and retrieves their URLs.
 * - Creates a new user entry in the database with the provided and processed data.
 * - Removes sensitive fields (password, refreshToken) from the response.
 * - Returns a success response with the created user data, or appropriate error messages if any step fails.
 *
 * @function registerUser
 * @async
 * @param {import('express').Request} req - Express request object containing user data and files.
 * @param {import('express').Response} res - Express response object used to send the result.
 * @throws {ApiError} Throws error with appropriate status code and message if validation fails, user exists, image upload fails, or user creation fails.
 * @returns {Promise<void>} Sends a JSON response with the created user data on success.
 */
// Line-by-line explanation:
// 1. Multi-line JSDoc comment starts.
// 2. Brief summary of the function's purpose.
// 3-9. Step-by-step explanation of the registration process.
// 10. Function name annotation.
// 11. Marks the function as asynchronous.
// 12-13. Describes the parameters (req, res) with their types.
// 14. Describes possible thrown errors.
// 15. Describes the return value.
// 16. End of JSDoc comment.
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  //console.log("req.body:", req.body);
  const { fullname, email, username, password } = req.body;
  //console.log("email: ", email);
  if (!fullname || !email || !username || !password) {
        throw new ApiError(400, "Missing required fields");
    }
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  console.log("req.files:", req.files);
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log("avatar:", avatar);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  /*  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  } */
  /* 
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); */
  //const normalizedUsername = username?.trim().toLowerCase() || "";
  /*
  const createdUser = {
    fullname,
    avatar:  avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: normalizedUsername,
  };*/

  
  const user = await User.create({
        fullname: fullname.trim(),
        email: email.toLowerCase().trim(),
        username: username?.toLowerCase().trim(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export default registerUser;
