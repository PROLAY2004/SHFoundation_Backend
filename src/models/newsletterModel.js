import mongoose from 'mongoose';

const newsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['weekly', 'monthly', 'disabled'],
      default: 'weekly',
    },
  },
  {
    timestamps: true,
  }
);

const newsLetter = mongoose.model('newsLetter', newsLetterSchema);
export default newsLetter;
