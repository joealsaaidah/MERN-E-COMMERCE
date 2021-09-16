const jwt = require("jsonwebtoken");
const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");

exports.verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new errorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new errorResponse("No user found with this id", 404));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new errorResponse("Not authorized to access this route", 401));
  }
};

exports.verifyAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(new errorResponse("Not authorized to access this route", 401));
  }
};