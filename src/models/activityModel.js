import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },

    eventId: {
      type: String,
      required: true,
    },

    adminId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const activity = mongoose.model('history', activitySchema);
export default activity;
