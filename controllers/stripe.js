const stripe = require("stripe")(process.env.STRIPE_SK);

exports.payment = async (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        next(new errorResponse("Bad request", 400));
      } else {
        res.status(200).json({ success: true, stripeRes });
      }
    }
  );
};
