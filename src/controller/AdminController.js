import { v2 as cloudinary } from 'cloudinary';

import newsLetter from '../models/newsletterModel.js';
import user from '../models/userModel.js';
import volunteer from '../models/voluenteerModel.js';
import contact from '../models/contactModel.js';

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

          volunteers, // ✅ SAME AS ORIGINAL
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
        contact.find({ isDeleted: false }).lean(),
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

          userMessageCount, // ✅ messages from registered users
          guestMessageCount, // ✅ messages from guests
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
