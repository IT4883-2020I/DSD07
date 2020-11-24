import express from 'express';
import reportController from '../controllers/reportTemplate.controller.js';
import { verifyToken, manager } from '../middlewares/authMiddlewares.js';
import asyncRoute from '../utils/asyncRoute.js';
import handleResponse from '../utils/handleResponse.js';

const router = express.Router();

router.route('/reports/templates')
  .get(asyncRoute(async (req, res) => {
    const data = await reportController.getTemplatesList();
    return handleResponse(res, data);
  }))
  .post(verifyToken, manager, asyncRoute(async (req, res) => {
    const {
      type,
      title,
      opening,
      sectionKeys,
      tables,
      charts
    } = req.body;
    const data = await reportController.createTemplate({
      type,
      title,
      opening,
      sectionKeys,
      tables,
      charts
    });
    return handleResponse(res, data);
  }))

router.route('/reports/templates/:id')
  .get(asyncRoute(async (req, res) => {
    const data = await reportController.getTemplate({ id: req.params.id });
    return handleResponse(res, data);
  }))
  .patch(verifyToken, manager, asyncRoute(async (req, res) => {
    if (!req.params.id) {
      res.statusCode = 400;
      throw new Error('Bad request: template id is required');
    }
    const {
      type,
      title,
      opening,
      sectionKeys,
      tables,
      charts
    } = req.body;
    const data = await reportController.updateTemplate({
      id: req.params.id,
      type,
      title,
      opening,
      sectionKeys,
      tables,
      charts
    });
    return handleResponse(res, data);
  }))
  .delete(verifyToken, manager, asyncRoute(async (req, res) => {
    if (!req.params.id) {
      res.statusCode = 400;
      throw new Error('Bad request: template id is required');
    }
    const data = await reportController.deleteTemplate({
      id: req.params.id
    });
    return handleResponse(res, data);
  }));

export default router;
