import mongoose from 'mongoose';

const newsLetterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['weekly', 'monthly'],
      default: 'weekly',
    },
  },
  {
    timestamps: true,
  }
);

const newsLetter = mongoose.model('newsLetter', newsLetterSchema);
export default newsLetter;
