// ApiResponse.js

// This code defines a class called ApiResponse.
// A class is like a blueprint for creating objects with specific properties and behaviors.

class ApiResponse {
    // The constructor is a special function that runs when you create a new ApiResponse object.
    // It sets up the initial values for the object.
    constructor(statusCode, message = "success ", data) {
        // 'this.statusCode' saves the status code (like 200 for success, 404 for not found).
        this.statusCode = statusCode;

        // 'this.data' stores any data you want to send back (like user info, results, etc.).
        this.data = data;

        // 'this.message' is a short text message about the response (like "success" or "error").
        // If you don't provide a message, it uses "success " by default.
        this.message = message;

        // 'this.success' is a true/false value.
        // It checks if the status code is less than 400.
        // In web APIs, codes below 400 mean the request worked (true), 400 or above means an error (false).
        this.success = this.statusCode < 400;
    }
}
export default ApiResponse;
// Example usage:
// let response = new ApiResponse(200, "OK", { user: "Alice" });
// This creates an object representing a successful API response with some data.