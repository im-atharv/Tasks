
export const sendSuccess = (res, statusCode = 200, data = {}, message = "Success") => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  export const sendError = (res, err, fallbackMessage = "Something went wrong") => {
    console.error("[Error]:", err);
  
    // Handle Zod validation errors
    if (err?.errors && Array.isArray(err.errors)) {
      return res.status(400).json({
        success: false,
        error: err.errors.map(e => ({ path: e.path, message: e.message })),
      });
    }
  
    // Handle general error
    const statusCode = err?.statusCode || 500;
    const message = err?.message || fallbackMessage;
  
    return res.status(statusCode).json({
      success: false,
      error: [{ message }],
    });
  };
  