require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const reportsRouter = require("./routes/reportsRouter");
const usersRouter = require("./routes/usersRouter");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "4mb" }));
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(cookieParser());

// routes
app.use("/api/reports", reportsRouter);
app.use("/api/users", usersRouter);

const mongoUri =
  process.env.NODE_ENV === "dev"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGODB_URI;

mongoose.connect(mongoUri).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT} and connected to db`);
  });
});
