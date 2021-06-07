import mongoose from "mongoose";

type VideoForm = {
  title: string;
  discription: string;
  createdAt: Date;
  hashtags: [{ type: string }];
  metaDB: {
    views: number;
    rating: number;
  };
};

const videoSchema = new mongoose.Schema<VideoForm>({
  title: String,
  discription: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  metaDB: {
    views: Number,
    rating: Number,
  },
});

const VideoModel = mongoose.model<VideoForm>("Video", videoSchema);

export default VideoModel;
