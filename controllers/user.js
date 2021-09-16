const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");

//UPDATE
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    return next(new errorResponse("can't update your information ", 400));
  }
};

//DELETE
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: "User has been deleted" });
  } catch (error) {
    return next(new errorResponse("can't delete this! ", 409));
  }
};

//GET USER
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    //const { password, ...others } = user._doc;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new errorResponse("can't get this user! ", 404));
  }
};

//GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new errorResponse("can't get the users ", 404));
  }
};

//GET USER STATS
exports.getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ success: true, data });
  } catch (error) {
    return next(new errorResponse("can't perform this action ", 500));
  }
};
