const Order = require("../models/Order");

//Create
exports.createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, savedOrder });
  } catch (error) {
    next(error);
  }
};

//UPDATE
exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedOrder,
    });
  } catch (error) {
    return next(new errorResponse("can't update this Order ", 400));
  }
};

//DELETE
exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: "Order has been deleted" });
  } catch (error) {
    return next(new errorResponse("can't delete this Order! ", 409));
  }
};

//GET USER ORDERS
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new errorResponse("can't get your orders ", 404));
  }
};

//GET ALL
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    return next(new errorResponse("can't get the orders ", 404));
  }
};

//GET MONTHLY INCOME
exports.getIncome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({ success: true, income });
  } catch (error) {
    return next(new errorResponse("can't perform this action ", 500));
  }
};
