import express from 'express';
import reportTemplateRoutes from './reportTemplate.route.js';
import reportRoutes from './report.route.js';

const router = express.Router();

router.use(reportTemplateRoutes);
router.use(reportRoutes);

export default router;
