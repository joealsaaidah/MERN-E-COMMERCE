const Cart = require("../models/Cart");

//Create
exports.createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json({ success: true, savedCart });
  } catch (error) {
    next(error);
  }
};

//UPDATE
exports.updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedCart,
    });
  } catch (error) {
    return next(new errorResponse("can't update Your cart ", 400));
  }
};

//DELETE
exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: "Cart has been deleted" });
  } catch (error) {
    return next(new errorResponse("can't delete this Cart! ", 409));
  }
};

//GET USER CART
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return next(new errorResponse("can't get your cart ", 404));
  }
};

//GET ALL
exports.getAll = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ success: true, carts });
  } catch (error) {
    return next(new errorResponse("can't get the carts ", 404));
  }
};
