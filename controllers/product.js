const Product = require("../models/Product");

//Create
exports.createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, savedProduct });
  } catch (error) {
    next(error);
  }
};

//UPDATE
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    return next(new errorResponse("can't update this product ", 400));
  }
};

//DELETE
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: "Product has been deleted" });
  } catch (error) {
    return next(new errorResponse("can't delete this product! ", 409));
  }
};

//GET PRODUCT
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new errorResponse("can't get this product! ", 404));
  }
};

//GET ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new errorResponse("can't get these products! ", 404));
  }
};
