require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/mongodb");
const { registerUser, loginUser } = require("./controllers/userController");

// connect to mongodb
connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
