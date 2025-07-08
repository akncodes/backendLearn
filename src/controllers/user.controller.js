import { asyncHandler } from "../middlewares/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  // Logic to register a user
    // For example, saving user data to the database
  res.status(200).json({ message: "Ok" });
});

export default registerUser