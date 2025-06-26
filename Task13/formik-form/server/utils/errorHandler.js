export const formatZodError = (error) => {
    return error.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  };
  