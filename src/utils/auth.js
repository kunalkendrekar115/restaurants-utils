const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { CustomError } = require("./custom-error");

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword);
};

const generateToken = (userId, email, name) => {
  return jwt.sign({ userId, email, name }, "SecretTokenKey", {
    expiresIn: "2h"
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["access-token"];

  if (!token) {
    throw new CustomError(401, "A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "SecretTokenKey");

    const { userId, email, name } = decoded;
    req.body = { ...req.body, userId, email, name };
  } catch (err) {
    next(err);
  }
  return next();
};

module.exports = {
  encryptPassword,
  generateToken,
  comparePassword,
  verifyToken
};
