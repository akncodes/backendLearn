import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 
import ApiResponse from "../utils/ApiResponse.js";
// Assuming you have a User model defined in models/user.model.js
const registerUser = asyncHandler(async (req, res) => {
  //get  user data from frontend
  // validation - not empty, valid email, password length, etc.
  // check if user already exists: username or email
  //check for images , check for avatar
  // upload images to cloudinary
  // create user object - create entry in database
  // remove password and refresh token fields from response
  // check if user is created successfully
  // return if failed
  const { username, email, fullname, password } = req.body;
  console.log("email", email);

  if (fullname === "") {
    throw new ApiError(400, "Fullname is required");
  }

  if ([username, email, fullname, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] })

  // TODO: Implement user registration logic hereEWSEEASD-+VVBVVVVVVVVVV`
  if (existedUser) {
    throw new ApiError(409, "User already exists with this username or email");
  }
  const avatarlocalpath = req.files?.avatar[0]?.path ;
  const coverImagelocalpath = req.files?.coverImage[0]?.path ;
    if (!avatarlocalpath ) {
        throw new ApiError(400, "Avatar and cover image are required");     
    }
    const avatar =await uploadOnCloudinary(avatarlocalpath);
    const coverImage = await uploadOnCloudinary(coverImagelocalpath);
    if (!avatar ) {
        throw new ApiError(400, "Failed to upload avatar image");
    }
    const user = await User.create({
      
        fullname,
        avatar : avatar.url,
        coverImage: coverImage?.url,
        email,  
        username:username.tolowercase(),
        password, // Ensure password is hashed before saving

        
    })
    const createdUser = await User.findById(user._id).select("-password -refrshToken");
    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }
    return res.status(201).json(
        new ApiResponse(201, "User created successfully", createdUser)
    );
  });

export default registerUser;
