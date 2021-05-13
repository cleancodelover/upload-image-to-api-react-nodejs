require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const PORT = process.env.APP_PORT || 3100;

const userRouter = require("./routes/user/user.routes");
const videoRouter = require("./routes/upload/video.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/", videoRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: ${process.env.DB_HOST}:${PORT}`);
  });
});
