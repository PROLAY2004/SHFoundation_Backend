import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    message: {
      type: String,
      required : true,
    },

    status: {
      type: String,
      required: true,
      enum: ['new', 'viewed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const contact = mongoose.model('contactResponse', contactSchema);
export default contact;
