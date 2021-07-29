const auth = require("./auth");
const logger = require("./logger");
const errorHandler = require("./error-handler");
const customError = require("./custom-error");

module.exports = {
  ...auth,
  ...logger,
  ...errorHandler,
  ...customError
};
