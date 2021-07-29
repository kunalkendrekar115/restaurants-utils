const { logger } = require("./logger");
const { CustomError } = require("./custom-error");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    res.status(error.code).json({ message: error.message });
    return;
  }

  if (error) {
    const errorMessage = `Path: ${req.path}, ${error.toString()}`;
    logger.error(errorMessage);
    res.status(500).json({ message: error.toString(), path: req.path });
    return;
  }
  res.status(500).json({ message: "Something went wrong" });
};

module.exports = { errorHandler };
