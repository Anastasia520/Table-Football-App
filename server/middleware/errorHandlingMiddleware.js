const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiErrorHandler) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unexpected error!" });
};
