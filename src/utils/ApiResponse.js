class ApiResponse{
    constructor(statusCode, message = "success ", data ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = this.statusCode < 400; // Assuming status codes < 400 are successful
    }
}