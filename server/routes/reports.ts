import express, { Request, Response } from 'express';
import Report from '../models/Report';

const router = express.Router();

// Create a new report
router.post('/', async (req: Request, res: Response) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
});

// Get all reports for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const reports = await Report.find({ userId: req.params.userId })
      .sort({ uploadDate: -1 });
    res.json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Get a single report by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Update a report
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
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

// Delete a report
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default router;
