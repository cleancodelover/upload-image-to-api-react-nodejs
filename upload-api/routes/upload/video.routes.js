const {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} = require("../../controllers/upload/upload.controller");
const { checkToken } = require("../../auth/token_validation");
const router = require("express").Router();
const multer = require("multer");
const upload = multer();

router.post("/video", upload.single("video"), createVideo);
router.get("/videos", getVideos);
router.get("/video/:id", getVideoById);
router.patch("/update-video", upload.single("video"), checkToken, updateVideo);
router.delete("/delete-video", checkToken, deleteVideo);

module.exports = router;
