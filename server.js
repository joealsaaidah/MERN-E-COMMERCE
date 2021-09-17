//env should be always all the way on the top
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

//connect to the database
connectDB();

//initialize the app
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/checkout", require("./routes/stripe"));

// Error Handler (should be the last middleware)
app.use(errorHandler);

// server listening
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`SERVER is running on port no. ${PORT} 👌`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
