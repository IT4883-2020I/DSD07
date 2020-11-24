import express from 'express';
import reportController from '../controllers/report.controller.js';
import { verifyToken, manager } from '../middlewares/authMiddlewares.js';
import asyncRoute from '../utils/asyncRoute.js';
import handleResponse from '../utils/handleResponse.js';

const router = express.Router();

router.route('/reports/templates')
  .get(asyncRoute(async (req, res) => {
    const data = await reportController.getTemplatesList();
    return handleResponse(res, data);
  }));

router.route('/reports/templates/:id')
  .get(asyncRoute(async (req, res) => {
    const data = await reportController.getTemplate({ id: req.params.id });
    return handleResponse(res, data);
  }));

export default router;
