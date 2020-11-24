import express from 'express';
import reportTemplateRoutes from './reportTemplate.route.js'

const router = express.Router();

router.use(reportTemplateRoutes);

export default router;
