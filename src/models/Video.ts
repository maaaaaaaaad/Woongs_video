import mongoose, { Schema } from "mongoose";

const videoSchema: mongoose.Schema = new mongoose.Schema({
  title: String,
  discription: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  metaDB: {
    views: Number,
    rating: Number,
  },
});

const VideoModel: mongoose.Model<string, Schema> = mongoose.model(
  "Video",
  videoSchema
);

export default VideoModel;
