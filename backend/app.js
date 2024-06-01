require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;

const Upload = require("./multer"); // Import the Multer configuration
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload endpoint
app.post("/upload", Upload.array("data", 2), (req, res) => {
  const filePaths = req.files.map((file) => file.path);

  const imageFiles = filePaths.filter((filePath) =>
    /\.(png|jpe?g|gif)$/i.test(filePath)
  );

  const musicFiles = filePaths.filter((filePath) =>
    /\.(mp3|wav)$/i.test(filePath)
  );

  res.json({
    message: "Files uploaded successfully",
    images: imageFiles,
    musics: musicFiles,
  });
});

const Musics = require("./routes/musics");
const Subscription = require("./routes/subscription");

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home page
app.get("/api/v1", (req, res) => {
  res.send("Home page");
});

//routes
app.use("/api/v1/musics", Musics);
app.use("/api/v1/subscribe", Subscription);

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
