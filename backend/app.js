require("dotenv").config();
require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 4000;

// Home page
app.get("/api/v1", (req, res) => {
  res.send("Home page");
});

//routes
// app.use('/api/v1/musics',)

// Start the server
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
