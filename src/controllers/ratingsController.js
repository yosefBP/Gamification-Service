const ServiceRating = require('../models/ServiceRating.model');
const rankService = require('../services/rankService');

/**
 * Controller for handling ratings.
 * @namespace ratingsController
 */
const ratingsController = {
  /**
   * Submits a new rating.
   *
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   * @returns {Promise<void>}
   */
  async submitRating(req, res) {
    try {
      const rating = await ServiceRating.create(req.body);
      res.status(201).json(rating);

      // Asynchronously process the new rating for rank updates.
      rankService.processNewRating(rating.toderoId);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = ratingsController;
