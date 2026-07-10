import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    platform: { type: String, required: true },
    tags: [{ type: String }],
    prompt: { type: String, required: true },
    thumbnail: { type: String }, // Cloudinary URL
    isFavorite: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt;
