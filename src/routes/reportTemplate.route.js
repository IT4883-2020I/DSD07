import express from 'express';
import reportTemplateController from '../controllers/reportTemplate.controller.js';
import { isValidSection } from '../validations/reportTemplate.validation.js';
import { verifyToken, manager, nonStaff } from '../middlewares/authMiddlewares.js';
import asyncRoute from '../utils/asyncRoute.js';
import handleResponse from '../utils/handleResponse.js';

const router = express.Router();

router.route('/reports/templates')
  .get(asyncRoute(async (req, res) => {
    const data = await reportTemplateController.getTemplatesList();
    return handleResponse(res, data);
  }))
  .post(verifyToken, nonStaff, asyncRoute(async (req, res) => {
    const {
      type,
      sections
    } = req.body;
    if (!Array.isArray(sections) || sections.some(section => !isValidSection(section))) {
      res.status(400);
      throw new Error('Bad request: Some sections are invalid');
    }
    const data = await reportTemplateController.createTemplate({
      type,
      sections
    });
    return handleResponse(res, data);
  }))

router.route('/reports/templates/:id')
  .get(asyncRoute(async (req, res) => {
    const data = await reportTemplateController.getTemplate({ id: req.params.id });
    return handleResponse(res, data);
  }))
  .patch(verifyToken, nonStaff, asyncRoute(async (req, res) => {
    if (!req.params.id) {
      res.statusCode = 400;
      throw new Error('Bad request: template id is required');
    }
    const {
      type,
      sections
    } = req.body;
    if (sections) {
      if (!Array.isArray(sections) || sections.some(section => !isValidSection(section))) {
        res.status(400);
        throw new Error('Bad request: Some sections are invalid');
      }
    }
    const data = await reportTemplateController.updateTemplate({
      id: req.params.id,
      type,
      sections
    });
    return handleResponse(res, data);
  }))
  .delete(verifyToken, nonStaff, asyncRoute(async (req, res) => {
    if (!req.params.id) {
      res.statusCode = 400;
      throw new Error('Bad request: template id is required');
    }
    const data = await reportTemplateController.deleteTemplate({
      id: req.params.id
    });
    return handleResponse(res, data);
  }));

export default router;
