const express = require("express");
const db = require("../../models");
const fs = require("fs");
const fbUpload = require("facebook-api-video-upload");

module.exports = {
  createVideo: (data, callBack) => {
    db.Video.create({
      videoPath: data.videoPath,
      videoType: data.videoType,
      videoExtension: data.videoExtension,
      UserId: 1,
      title: data.title,
      description: data.description,
    })
      .then((result) => {
        return callBack(null, result);
        // const vidpath = `${__dirname}../../../${data.videoPath}`;
        // const args = {
        //   token: process.env.FB_TOKEN,
        //   id: process.env.FB_ID,
        //   stream: fs.createReadStream(vidpath),
        //   title: data.title,
        //   description: data.description,
        //   thumb: {
        //     value: fs.createReadStream(vidpath),
        //     options: {
        //       filename: "../../images/multidirect.PNG",
        //       contentType: "image/png",
        //     },
        //   },
        // };
        // fbUpload(args)
        //   .then((result1) => {
        //     console.log(result1);
        //     return callBack(null, result1);
        //   })
        //   .catch((error1) => {
        //     console.log(error1);
        //     return callBack(error1);
        //   });
      })
      .catch((error2) => {
        console.log(error2);
        return callBack(error2);
      });
  },
  getVideos: (callBack) => {
    db.Video.findAll({ raw: true })
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  getVideoById: (id, callBack) => {
    db.Video.findByPk(id)
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  updateVideo: (data, callBack) => {
    db.Video.update(
      {
        videoPath: data.videoPath,
        videoType: data.videoType,
        videoExtension: data.videoExtension,
      },
      { returning: true, where: { id: data.id } }
    )
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
  deleteVideo: (data, callBack) => {
    db.Video.destroy({
      where: { id: data.id },
    })
      .then((result) => {
        return callBack(null, result);
      })
      .catch((error) => {
        return callBack(error);
      });
  },
};
