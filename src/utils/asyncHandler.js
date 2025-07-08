const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};


export {asyncHandler};
/*
const asyncHandler = (fn) => async (req ,res ,next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error("Error in async handler:", error);
        res.status(500).json({
            success :false,
             message: "Internal Server Error" });
    }
}*/