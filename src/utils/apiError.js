// This class defines a custom error type called ApiError.
// It helps you create error objects with extra information for APIs.

class ApiError extends Error { // 'extends Error' means ApiError is based on the built-in Error class
  // The constructor is a special function that runs when you create a new ApiError.
  constructor(
    statusCode, // The HTTP status code (like 404, 500, etc.)
    message = "An error occurred", // The error message (default if not provided)
    error = [], // Extra error details (default is an empty array)
    stack = "" // The stack trace (shows where the error happened)
  ) {
    super(message); // Calls the parent Error class with the message

    // Set the HTTP status code for this error
    this.statusCode = statusCode;

    // Indicates that this is an error response (true means error)
    this.data = true;

    // The error message
    this.message = message;

    // Indicates if the request was successful (false means it failed)
    this.success = false;

    // Stores extra error details (should be 'this.errors = error', see note below)
    this.errors = error; // This line has a bug! Should be: this.errors = error;

    // If a stack trace is provided, use it; otherwise, capture the current stack trace
    if (stack) {
      this.stack = stack;
    } else {
      // This helps show where the error happened in your code
      Error.captureStackTrace(this, this.constructor);
    }
    // This comment says: This error is expected and can be handled
  }
}

// --- Full Explanation ---
// - 'class' lets you create a blueprint for objects. Here, ApiError is a blueprint for error objects.
// - 'extends Error' means ApiError gets all features of the built-in Error class, plus any new ones you add.
// - The constructor lets you set up the error with a status code, message, extra details, and stack trace.
// - This is useful in APIs to send clear error messages to users or other programs.
// - There is a bug: 'this.errors = this.errors' should be 'this.errors = error' to store the error details passed in.