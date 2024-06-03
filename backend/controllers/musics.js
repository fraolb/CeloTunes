const Music = require("../models/Music");
const User = require("../models/User");

const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllMusic = async (req, res) => {
  const musics = await Music.find({});
  res.status(StatusCodes.OK).json({ musics, count: musics.length });
};

const getSingleMusic = async (req, res) => {
  const { musicIds } = req.body;
  const music = await Music.find({ _id: musicIds });

  if (!music) {
    throw new error("No music was found");
  }

  res.status(StatusCodes.OK).json({ music });
};

const getMyMusic = async (req, res) => {
  try {
    const { address } = req.query;

    // console.log("The user address is: ", address);

    const myMusic = await Music.find({ createdBy: address });
    //const boughtMusic = await User.find({ createdBy: address });

    // console.log("The user musics are : ", myMusic);

    const count = myMusic.length;

    res.status(200).json({ myMusic, count }); // Using 200 directly for simplicity
  } catch (error) {
    console.error("Error fetching music data: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadMusic = async (req, res) => {
  // console.log("The body data of the music is: ", req.body);
  //const music = await Music.create(req.body);
  //res.status(StatusCodes.CREATED).json(music);

  try {
    // Check if image files were uploaded
    const filePaths = req.files.map((file) => file.path);

    const imageFiles = filePaths.filter((filePath) =>
      /\.(png|jpe?g|gif)$/i.test(filePath)
    );

    const musicFiles = filePaths.filter((filePath) =>
      /\.(mp3|wav)$/i.test(filePath)
    );

    if (imageFiles == null || musicFiles == null) {
      throw Error("File Missing!");
    }

    // console.log("the image is ", imageFiles);
    // Upload images to Cloudinary
    const imageUploadPromises = imageFiles.map((image) =>
      cloudinary.uploader.upload(image, {
        use_filename: true,
        folder: "file-upload", // Specify the folder on Cloudinary
      })
    );

    // Upload musics to Cloudinary
    const musicUploadPromises = musicFiles.map((music) =>
      cloudinary.uploader.upload(music, {
        resource_type: "video",
        use_filename: true,
        folder: "file-upload", // Specify the folder on Cloudinary
      })
    );

    // Wait for all image uploads to complete
    const uploadedImages = await Promise.all(imageUploadPromises);
    // console.log("image upload complete");
    // Wait for all music uploads to complete
    const uploadedMusics = await Promise.all(musicUploadPromises);
    // console.log("music upload complete");

    // Remove temporary image and music files
    imageFiles.forEach((image) => fs.unlinkSync(image));
    musicFiles.forEach((music) => fs.unlinkSync(music));

    // console.log("the uploaded images are ", uploadedImages);

    // Map Cloudinary results to an array of image URLs
    const imageUrls = uploadedImages.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    // Map Cloudinary results to an array of music URLs
    const musicUrls = uploadedMusics.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    // Add the array of image URLs to req.body
    req.body.image = imageUrls;
    // Add the array of music URLs to req.body
    req.body.music = musicUrls;

    // Add other necessary properties to req.body
    //req.body.createdBy = req.user.userId;

    // Create the music with the updated req.body
    const product = await Music.create(req.body);

    // Respond with the created product
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

const addMusic = async (req, res) => {
  try {
    const { address, musicIds } = req.body;

    if (!address || !musicIds) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Address and musicId are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ address });
    //console.log("user found ", user);

    if (!user) {
      // User does not exist, return error
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User doesn't exist" });
    }

    // Validate that the provided music ID exists in the Music collection
    const validMusic = await Music.findById(musicIds);
    if (!validMusic) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid music ID" });
    }

    //console.log("music found ", validMusic);

    // Update user's music array with the new music ID if it's not already present
    if (!user.music.includes(musicIds)) {
      user.music.push(musicIds);
      await user.save();
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error("Error in addMusic: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMusic,
  getSingleMusic,
  getMyMusic,
  uploadMusic,
  addMusic,
};
