const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");

const users = require("./routes/api/users");
// const profile = require("./routes/api/profile");
const items = require("./routes/api/items");

const app = express();

//  Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

//  DB Config
const db = require("./config/keys").mongoURI;

//  Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//  Passport Middleware
app.use(passport.initialize());

//  Passport Config
require('./config/passport')(passport);

//  Use Routes
app.use("/api/users", users);
// app.use("/api/profile", profile);
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
