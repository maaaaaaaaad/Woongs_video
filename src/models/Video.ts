import mongoose from "mongoose";

type VideoForm = {
  title: string;
  discription: string;
  createdAt: Date;
  hashtags?: [{ type: string }] | null;
  metaDB: {
    views: number;
    rating: number;
  };
};

const videoSchema = new mongoose.Schema<VideoForm>({
  title: { type: String, required: true, trim: true, maxLength: 40 },
  discription: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  metaDB: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

const VideoModel = mongoose.model<VideoForm>("Video", videoSchema);

export default VideoModel;