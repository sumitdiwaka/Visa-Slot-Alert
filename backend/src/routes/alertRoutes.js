const express = require('express');
const router = express.Router();
const alertController = require('../controllers/AlertController');
const { validateAlert } = require('../middleware/Validator');

// GET /alerts - Get all alerts with optional filtering
router.get('/', alertController.getAlerts);

// GET /alerts/:id - Get single alert
router.get('/:id', alertController.getAlertById);

// POST /alerts - Create new alert
router.post('/', validateAlert, alertController.createAlert);

// PUT /alerts/:id - Update alert
router.put('/:id', validateAlert, alertController.updateAlert);

// PATCH /alerts/:id/status - Update alert status only
router.patch('/:id/status', alertController.updateStatus);

// DELETE /alerts/:id - Delete alert
router.delete('/:id', alertController.deleteAlert);

module.exports = router;