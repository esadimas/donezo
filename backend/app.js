require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/mongodb");
const { registerUser, loginUser, userProfile } = require("./controllers/userController");
const { protect } = require("./middleware/authMiddleware");

// connect to mongodb
connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);
app.get("/api/users/profile", protect, userProfile);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
