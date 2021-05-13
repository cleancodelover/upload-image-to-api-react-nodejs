module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define("Video", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoExtension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Video;
};
