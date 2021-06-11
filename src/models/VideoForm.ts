import mongoose from "mongoose";

export type Hashs = [{ type: string }] | null;

export type VideoForm = {
  title: string;
  description?: string;
  createdAt: Date;
  hashtags?: Hashs;
  metaDB: {
    views: number;
    rating: number;
  };
};

const videoSchema = new mongoose.Schema<VideoForm>({
  title: { type: String, required: true, trim: true, maxLength: 40 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String || Number || (String && Number), trim: true }],
  metaDB: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

const VideoModel = mongoose.model<VideoForm>("Video", videoSchema);

export default VideoModel;
