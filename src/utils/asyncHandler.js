const asyncHandler = (requestHander) => {
    (req, res, next) => {
    return Promise.resolve(requestHander(req, res, next))
        .catch((error) => {
            console.error("Error in async handler:", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        });
    }
}


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