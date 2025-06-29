
import app from "./app.js";
import connectDB from "./db/index.js";
//require("dotenv").config();
import dotenv from "dotenv";

dotenv.config({
    path: "./config/.env"
});


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    p// Exit process with failure
  });


/*
import express from "express";

;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    
    
    app.on("error", (err) => {
      console.log("Server error:", err);
      throw err;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
                                         

  } catch (error) {
    console.error("MongoDB connection error:", error);

  }
})();
*/