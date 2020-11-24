import express from 'express';
import reportController from '../controllers/report.controller.js';
import { verifyToken, manager } from '../middlewares/authMiddlewares.js';
import asyncRoute from '../utils/asyncRoute.js';
import handleResponse from '../utils/handleResponse.js';

const router = express.Router();

router.route('/user-reports')
  .get(verifyToken, asyncRoute(async (req, res) => {
    const data = await reportController.getReportsList({
      userId: req.user.id,
      byMe: Number(req.query.byMe) === 1
    });
    return handleResponse(res, data);
  }))
  .post(verifyToken, asyncRoute(async (req, res) => {
    const {
      reviewerId,
      tables,
      sectionKeys,
      charts,
      keys,
      name,
      templateId
    } = req.body;
    const data = await reportController.createReport({
      userId: req.user.id,
      reviewerId,
      tables,
      sectionKeys,
      charts,
      keys,
      name,
      templateId
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
      tables,
      sectionKeys,
      charts,
      keys,
      name
    } = req.body;

    const data = await reportController.updateReport({
      id: req.params.id,
      userId: req.user.id,
      tables,
      sectionKeys,
      charts,
      keys,
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
