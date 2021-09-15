require("dotenv").config({ path: "./config.env" });
const express = require("express");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

//initialize the app
const app = express();

//connect to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB SUCCESSFULLY 👍"))
  .catch((err) => console.log(`${err} 😢`));

app.use(express.json());

app.use("/api/users", require("./routes/user"));

// server listening
app.listen(PORT, () => {
  console.log(`SERVER is running on port no. ${PORT} 👌`);
});
