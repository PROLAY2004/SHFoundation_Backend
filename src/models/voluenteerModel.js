import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
      default: [],
    },

    availability: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },

    termsAccepted: {
      type: Boolean,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const volunteer = mongoose.model('volunteer', volunteerSchema);
export default volunteer;