const {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} = require("../../services/upload/upload.service");

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const { next } = require("process");
// const jwt = require("jsonwebtoken");
module.exports = {
  createVideo: (req, res) => {
    const body = req.body;
    const video = req.file;

    // console.log(video);
    if (video.detectedFileExtension != ".mp4") {
      next(new Error("Invalid file type"));
    }

    const fileName =
      Math.floor(Math.random() * 1000) + video.detectedFileExtension;
    pipeline(
      video.stream,
      fs.createWriteStream(`${__dirname}/../../upload/videos/${fileName}`)
    )
      .then(() => {
        const uploadedVideo = {
          videoPath: `/upload/videos/${fileName}`,
          videoExtension: video.detectedFileExtension,
          videoType: video.detectedMimeType,
          UserId: body.UserId,
          title: body.title,
          description: body.description,
        };
        createVideo(uploadedVideo, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Unable to upload file",
        });
      });
  },
  getVideoById: (req, res) => {
    const id = req.params.id;
    //let range = req.headers.range;
    ///console.log(range);
    getVideoById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: "Error trying to get records",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      if (results) {
        const videoPath = `http://localhost:4700${results.videoPath}`;
        const locVideoPath = `${__dirname}/../..${results.videoPath}`;
        // const videoSize = fs.statAsync(`../..${results.videoPath}`).size;
        const videoSize = 7657576;
        const CHUNK_SIZE = 10 ** 6;
        const start = 0; // Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": results.videoType.replace(".", ""),
        };

        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(locVideoPath, { start, end });
        videoStream.pipe(res);

        // const result = {
        //   videoPath: videoPath,
        //   videoType: results.videoType,
        //   videoExtension: results.videoExtension,
        //   UserId: results.UserId,
        //   title: results.title,
        //   description: results.description,
        //   videoStream: videoStream,
        // };
        // return res.json({
        //   success: 1,
        //   data: result,
        // });
      }
    });
  },
  getVideos: (req, res) => {
    getVideos((err, result) => {
      if (err) {
        return;
      }
      if (!result) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      if (result) {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },
  updateVideo: (req, res) => {
    const body = req.body;
    const video = req.file;
    if (video.detectedFileExtension != ".mp4") {
      next(new Error("Invalid file type"));
    }

    const fileName =
      Math.floor(Math.random() * 1000) + video.detectedFileExtension;
    pipeline(
      video.stream,
      fs.createWriteStream(`${__dirname}/../../upload/videos/${fileName}`)
    );

    const uploadedVideo = {
      videoPath: `${__dirname}/../../upload/videos/${fileName}`,
      videoExtension: video.detectedFileExtension,
      videoType: "",
      UserId: "",
      id: body.id,
    };

    updateVideo(uploadedVideo, (err, results) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Unable to update user",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Unable to update user",
        });
      }
      if (results) {
        return res.json({
          success: 1,
          data: "Video updated successful",
        });
      }
    });
  },
  deleteVideo: (req, res) => {
    const body = req.body;
    deleteVideo(body, (err, results) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Unable to update video",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      if (results) {
        return res.json({
          success: 1,
          data: "Video deleted successful",
        });
      }
    });
  },
};
