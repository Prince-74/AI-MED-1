import express, { Request, Response } from 'express';
import Report from '../models/Report.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// All report routes require authentication
router.use(authenticate);

// Create a new report
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    // Force userId from the authenticated token, not from request body
    const report = new Report({ ...req.body, userId: req.userId });
    await report.save();
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
});

// Get all reports for the authenticated user
router.get('/user/:userId', async (req: AuthRequest, res: Response) => {
  try {
    // Only allow fetching own reports — ignore the URL param, use token userId
    const reports = await Report.find({ userId: req.userId })
      .sort({ uploadDate: -1 });
    res.json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Get a single report by ID (only if it belongs to the authenticated user)
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, userId: req.userId });
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Update a report (only if it belongs to the authenticated user)
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    // Prevent userId from being changed
    delete req.body.userId;
    const report = await Report.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
});

// Delete a report (only if it belongs to the authenticated user)
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default router;
