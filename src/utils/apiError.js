class ApiError extends Error {
  constructor(statusCode,
    message = "An error occurred",
    error=[],
    stack = "" 
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = true;
    this.message = message
    this.success = false
    this.errors = this.errors
    if(stack){
        this.stack = stack;
    } 
    else {
        Error.captureStackTrace(this, this.constructor);
    } // Indicates that this error is expected and can be handled
  }
}