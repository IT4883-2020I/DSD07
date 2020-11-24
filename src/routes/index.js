import express from 'express';
import reportRoutes from './report.route.js'

const router = express.Router();

router.use(reportRoutes);

export default router;
