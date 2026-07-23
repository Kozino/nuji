import { Router } from 'express';
import { prisma } from '../server';

const router = Router();

// @route    POST /api/contributions
// @desc     Save a new anonymous contribution
// @access   Public
router.post('/', async (req, res) => {
  try {
    const { language, state, type } = req.body;

    if (!language || !state || !type) {
      return res.status(400).json({ error: 'Missing required fields: language, state, type' });
    }

    // Create new contribution in the database
    const contribution = await prisma.contribution.create({
      data: { 
        language, 
        state, 
        type, 
        points: 10 // Award 10 points per contribution
      },
    });

    res.status(201).json({
      message: 'Contribution saved successfully',
      data: contribution
    });
  } catch (error) {
    console.error('Error saving contribution:', error);
    res.status(500).json({ error: 'Failed to save contribution' });
  }
});

// @route    GET /api/contributions/leaderboard
// @desc     Get aggregated leaderboard by state
// @access   Public
router.get('/leaderboard', async (req, res) => {
  try {
    // Group by state, sum the points, and count the total contributions
    const leaderboardData = await prisma.contribution.groupBy({
      by: ['state'],
      _sum: {
        points: true,
      },
      _count: {
        id: true, 
      },
      orderBy: {
        _sum: {
          points: 'desc',
        },
      },
      take: 10, // Top 10 states
    });

    // Format the response to match frontend expectations
    const formattedLeaderboard = leaderboardData.map((entry, index) => ({
      rank: index + 1,
      state: entry.state,
      points: entry._sum.points || 0,
      contributors: entry._count.id // Note: counts total clips, not unique users (since no auth)
    }));

    res.status(200).json(formattedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
