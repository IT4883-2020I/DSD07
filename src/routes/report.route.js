import express from 'express';
import reportController from '../controllers/report.controller.js';
import { verifyToken, manager } from '../middlewares/authMiddlewares.js';
import asyncRoute from '../utils/asyncRoute.js';
import { isValidSection } from '../utils/commonUtils.js';
import handleResponse from '../utils/handleResponse.js';

const router = express.Router();

router.route('/user-reports')
  .get(verifyToken, asyncRoute(async (req, res) => {
    const role = req.query.role || 'author';
    if (role !== 'author' && role !== 'reviewer') {
      res.status(400);
      throw new Error('Bad request: invalid role');
    }
    const data = await reportController.getReportsList({
      userId: req.user.id,
      role
    });
    return handleResponse(res, data);
  }))
  .post(verifyToken, asyncRoute(async (req, res) => {
    const {
      reviewerId,
      sections,
      name,
    } = req.body;
    if (sections && Array.isArray(sections) && sections.some(section => isValidSection(section))) {
      res.status(400);
      throw new Error('Bad request: invalid sections');
    }
    const data = await reportController.createReport({
      userId: req.user.id,
      reviewerId,
      sections: sections && Array.isArray(sections) ? sections : [],
      name,
    });
    return handleResponse(res, data);
  }))

router.route('/user-reports/:id')
  .get(verifyToken, asyncRoute(async (req, res) => {
    const data = await reportController.getReport({
      reportId: req.params.id,
      userId: req.user.id
    });

    return handleResponse(res, data);
  }))
  .patch(verifyToken, asyncRoute(async (req, res) => {
    const {
      sections,
      name
    } = req.body;

    const data = await reportController.updateReport({
      id: req.params.id,
      userId: req.user.id,
      sections: sections && Array.isArray(sections) ? sections : [],
      name
    })

    return handleResponse(res, data);
  }))
  .delete(verifyToken, asyncRoute(async (req, res) => {
    const data = await reportController.deleteReport({
      id: req.params.id,
      userId: req.user.id
    });

    return handleResponse(res, data);
  }));


export default router;
