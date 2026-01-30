const alertService = require('../services/AlertService');

class AlertController {
  async getAlerts(req, res) {
    try {
      const { page, limit, ...filters } = req.query;
      
      if (page || limit) {
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const result = alertService.getPaginatedAlerts(pageNum, limitNum, filters);
        
        return res.status(200).json({
          success: true,
          data: result.data,
          pagination: result.pagination
        });
      }
      
      const alerts = alertService.getAllAlerts(filters);
      res.status(200).json({
        success: true,
        data: alerts,
        count: alerts.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch alerts'
      });
    }
  }

  async getAlertById(req, res) {
    try {
      const alert = alertService.getAlertById(req.params.id);
      
      if (!alert) {
        return res.status(404).json({
          success: false,
          error: 'Alert not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: alert
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch alert'
      });
    }
  }

  async createAlert(req, res) {
    try {
      const alert = alertService.createAlert(req.body);
      
      res.status(201).json({
        success: true,
        data: alert,
        message: 'Alert created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create alert'
      });
    }
  }

  async updateAlert(req, res) {
    try {
      const alert = alertService.updateAlert(req.params.id, req.body);
      
      if (!alert) {
        return res.status(404).json({
          success: false,
          error: 'Alert not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: alert,
        message: 'Alert updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update alert'
      });
    }
  }

  async deleteAlert(req, res) {
    try {
      const deleted = alertService.deleteAlert(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Alert not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Alert deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete alert'
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status is required'
        });
      }
      
      const alert = alertService.updateAlert(req.params.id, { status });
      
      if (!alert) {
        return res.status(404).json({
          success: false,
          error: 'Alert not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: alert,
        message: 'Status updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update status'
      });
    }
  }
}

module.exports = new AlertController();