import { v2 as cloudinary } from 'cloudinary';

import newsLetter from '../models/newsletterModel.js';
import user from '../models/userModel.js';
import volunteer from '../models/voluenteerModel.js';
import contact from '../models/contactModel.js';
import activity from '../models/activityModel.js';

export default class AdminController {
  // Dashboard Controllers
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

        volunteer.aggregate([
          {
            $facet: {
              volunteerCount: [{ $count: 'count' }],
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

        volunteer.find({}).sort({ createdAt: -1 }).limit(3).lean(),
        cloudinary.api.usage(),
      ]);

      const getCount = (data, key) => data[0][key][0]?.count || 0;

      const allUsersCount = getCount(userStats, 'allUsersCount');
      const verifiedCount = getCount(userStats, 'verifiedCount');
      const pendingCount = getCount(userStats, 'pendingCount');

      const volunteerCount = getCount(volunteerStats, 'volunteerCount');
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
          volunteerCount,
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

  //Contact Controllers
  getContactData = async (req, res, next) => {
    try {
      const currentUser = req.user;
      const { page = 1, limit = 5, filter = 'all', query = '' } = req.body;
      const skip = (page - 1) * limit;
      let dbQuery = { isDeleted: false }; // 1. Build Base Query Object (Search + Deletion status)

      if (query) {
        dbQuery.$or = [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
          { subject: { $regex: query, $options: 'i' } },
        ];
      }

      if (filter === 'new') dbQuery.status = 'new';
      if (filter === 'viewed') dbQuery.status = 'viewed';

      const newCountQuery = { ...dbQuery, status: 'new' };
      const [contactDetails, totalCount, newCount, users] = await Promise.all([
        contact
          .find(dbQuery)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .lean(),
        contact.countDocuments(dbQuery), // Total matching search
        contact.countDocuments(newCountQuery), // New matching search (FIXED)
        user.find({}).select('email').lean(),
      ]);

      const userEmailSet = new Set(users.map((u) => u.email));
      const userMessageCount = await contact.countDocuments({
        ...dbQuery,
        email: { $in: Array.from(userEmailSet) },
      });
      const guestMessageCount = totalCount - userMessageCount;

      res.status(200).json({
        success: true,
        data: {
          currentUser,
          contactDetails,
          totalContact: totalCount,
          newContact: newCount, // This will now update as you type
          userMessageCount,
          guestMessageCount,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
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
