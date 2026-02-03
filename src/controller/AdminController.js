import { v2 as cloudinary } from 'cloudinary';

import newsLetter from '../models/newsletterModel.js';
import user from '../models/userModel.js';
import volunteer from '../models/voluenteerModel.js';
import contact from '../models/contactModel.js';
import activity from '../models/activityModel.js';

export default class AdminController {
  getDashboardData = async (req, res, next) => {
    try {
      const currentUser = req.user;

      const [
        userStats,
        volunteerStats,
        newsletterStats,
        contactStats,
        volunteers,
        usage,
      ] = await Promise.all([
        // USERS STATS
        user.aggregate([
          {
            $facet: {
              allUsersCount: [{ $count: 'count' }],
              verifiedCount: [
                { $match: { isVerified: true } },
                { $count: 'count' },
              ],
              pendingCount: [
                { $match: { isVerified: false } },
                { $count: 'count' },
              ],
            },
          },
        ]),

        // VOLUNTEER STATS (COUNTS ONLY)
        volunteer.aggregate([
          {
            $facet: {
              pendingVoluenteer: [
                { $match: { status: 'pending' } },
                { $count: 'count' },
              ],
              approvedVoluenteer: [
                { $match: { status: 'approved' } },
                { $count: 'count' },
              ],
            },
          },
        ]),

        // NEWSLETTER STATS
        newsLetter.aggregate([
          {
            $facet: {
              newsLetterCount: [{ $count: 'count' }],
              blockedNewsletter: [
                { $match: { isActive: false } },
                { $count: 'count' },
              ],
              activeNewsletter: [
                {
                  $match: {
                    isActive: true,
                    type: { $in: ['weekly', 'monthly'] },
                  },
                },
                { $count: 'count' },
              ],
            },
          },
        ]),

        // CONTACT STATS
        contact.aggregate([
          {
            $facet: {
              contactCount: [
                { $match: { isDeleted: false } },
                { $count: 'count' },
              ],
              newContactCount: [
                { $match: { isDeleted: false, status: 'new' } },
                { $count: 'count' },
              ],
            },
          },
        ]),

        // ALL VOLUNTEERS (FULL DETAILS)
        volunteer.find({}).lean(),

        // CLOUDINARY (EXTERNAL)
        cloudinary.api.usage(),
      ]);

      // Safe count extractor
      const getCount = (data, key) => data[0][key][0]?.count || 0;

      const allUsersCount = getCount(userStats, 'allUsersCount');
      const verifiedCount = getCount(userStats, 'verifiedCount');
      const pendingCount = getCount(userStats, 'pendingCount');

      const pendingVoluenteer = getCount(volunteerStats, 'pendingVoluenteer');
      const approvedVoluenteer = getCount(volunteerStats, 'approvedVoluenteer');

      const newsLetterCount = getCount(newsletterStats, 'newsLetterCount');
      const blockedNewsletter = getCount(newsletterStats, 'blockedNewsletter');
      const activeNewsletter = getCount(newsletterStats, 'activeNewsletter');

      const contactCount = getCount(contactStats, 'contactCount');
      const newContactCount = getCount(contactStats, 'newContactCount');

      res.status(200).json({
        success: true,
        message: 'All details fetched successfully',
        data: {
          currentUser,
          usage,

          allUsersCount,
          verifiedCount,
          pendingCount,

          volunteers,
          pendingVoluenteer,
          approvedVoluenteer,

          newsLetterCount,
          activeNewsletter,
          blockedNewsletter,

          contactCount,
          newContactCount,
          oldContactCount: contactCount - newContactCount,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  getContactData = async (req, res, next) => {
    try {
      const currentUser = req.user;

      // Fetch contacts & new-contact count in parallel
      const [contactDetails, newContact] = await Promise.all([
        contact.find({ isDeleted: false }).sort({ createdAt: -1 }).lean(),
        contact.countDocuments({ isDeleted: false, status: 'new' }),
      ]);

      const totalContact = contactDetails.length;

      // Extract unique emails from contacts
      const contactEmails = [
        ...new Set(contactDetails.map((c) => c.email).filter(Boolean)),
      ];

      // Get all registered users with those emails
      const users = await user
        .find({ email: { $in: contactEmails } })
        .select('email')
        .lean();

      // Convert user emails to Set for O(1) lookup
      const userEmailSet = new Set(users.map((u) => u.email));

      // Count messages
      let userMessageCount = 0;
      let guestMessageCount = 0;

      for (const msg of contactDetails) {
        if (userEmailSet.has(msg.email)) {
          userMessageCount++;
        } else {
          guestMessageCount++;
        }
      }

      res.status(200).json({
        success: true,
        message: 'All details fetched successfully',
        data: {
          currentUser,

          contactDetails,
          totalContact,
          newContact,

          userMessageCount,
          guestMessageCount,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  getUserInfo = async (req, res, next) => {
    try {
      const currentUser = req.user;
      let query;

      if (req.body.type === 'email') {
        query = {
          email: req.body.key,
        };
      } else if (req.body.type === 'userId') {
        query = {
          _id: req.body.key,
        };
      }

      const userInfo = await user.findOne(query);

      if (!userInfo) {
        res.status(404);

        throw new Error('Email not registered');
      }

      res.status(200).json({
        success: true,
        message: 'User information fetched successfully',
        data: {
          currentUser,
          userInfo,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  deleteMsg = async (req, res, next) => {
    try {
      const currentUser = req.user;
      const messageId = req.body.messageId;
      const deletedMsg = await contact.findByIdAndUpdate(
        messageId,
        { isDeleted: true },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!deletedMsg) {
        res.status(404);

        throw new Error('Message not Found');
      }

      const newActivity = new activity({
        eventName: 'Contact Message Deleted',
        eventId: deletedMsg._id,
        adminId: currentUser._id,
      });

      await newActivity.save();

      res.status(200).json({
        success: true,
        message: 'Message Deleted Successfully',
      });
    } catch (err) {
      next(err);
    }
  };

  changeStatus = async (req, res, next) => {
    try {
      const currentUser = req.user;
      const messageId = req.body.messageId;
      const updatedMsg = await contact.findByIdAndUpdate(
        messageId,
        { status: 'viewed' },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedMsg) {
        res.status(404);

        throw new Error('Message not Found');
      }

      const newActivity = new activity({
        eventName: 'Contact Message Viewed',
        eventId: updatedMsg._id,
        adminId: currentUser._id,
      });

      await newActivity.save();

      res.status(200).json({
        success: true,
        message: 'Message Status Changed (Viewed)',
      });
    } catch (err) {
      next(err);
    }
  };

  getContactInfo = async (req, res, next) => {
    try {
      const messageInfo = await contact.findOne({
        _id: req.body.messageId,
        isDeleted: false,
      });

      if (!messageInfo) {
        res.status(404);

        throw new Error('Message not Found');
      }

      res.status(200).json({
        success: true,
        message: 'Message fetched successfully',
        data: {
          messageInfo,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
