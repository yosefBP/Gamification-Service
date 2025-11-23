const ServiceRating = require('../models/ServiceRating.model');
const PromotionLog = require('../models/PromotionLog.model');
const gatewayService = require('./gatewayService');

/**
 * Determines the new rank based on the number of completed services and average rating.
 * @param {number} servicesCompleted - The number of completed services.
 * @param {number} ratingAverage - The average rating.
 * @returns {string} The new rank.
 */
function determineRank(servicesCompleted, ratingAverage) {
  if (servicesCompleted >= 100 && ratingAverage >= 4.8) {
    return 'Maestro';
  }
  if (servicesCompleted >= 50 && ratingAverage >= 4.5) {
    return 'Experto';
  }
  if (servicesCompleted >= 20 && ratingAverage >= 4.0) {
    return 'Avanzado';
  }
  if (servicesCompleted >= 5 && ratingAverage >= 3.5) {
    return 'Intermedio';
  }
  return 'Novato';
}

/**
 * Service for processing ratings and ranks.
 * @namespace rankService
 */
const rankService = {
  /**
   * Processes a new rating for a Todero.
   *
   * @param {string} toderoId - The ID of the Todero.
   * @returns {Promise<void>}
   */
  async processNewRating(toderoId) {
    const stats = await ServiceRating.aggregate([
      { $match: { toderoId: new mongoose.Types.ObjectId(toderoId) } },
      {
        $group: {
          _id: '$toderoId',
          servicesCompleted: { $sum: 1 },
          ratingAverage: { $avg: '$starRating' },
          punctuality: { $avg: { $cond: ['$detailedMetrics.punctuality', 1, 0] } },
          cleanliness: { $avg: { $cond: ['$detailedMetrics.cleanliness', 1, 0] } },
          communication: { $avg: { $cond: ['$detailedMetrics.communication', 1, 0] } },
          quality: { $avg: { $cond: ['$detailedMetrics.quality', 1, 0] } },
        },
      },
    ]);

    if (stats.length === 0) {
      return;
    }

    const { servicesCompleted, ratingAverage } = stats[0];
    const newRank = determineRank(servicesCompleted, ratingAverage);

    // For now, we assume we don't have the previous rank.
    // In a real scenario, we might fetch it before updating.
    const previousRank = 'Novato'; // Placeholder

    if (newRank !== previousRank) {
      await PromotionLog.create({
        toderoId,
        previousRank,
        newRank,
        reason: `Completed ${servicesCompleted} services with an average rating of ${ratingAverage.toFixed(2)}.`,
      });
    }

    const dataToUpdate = {
      rank: newRank,
      servicesCompleted,
      ratingAverage: parseFloat(ratingAverage.toFixed(2)),
    };

    await gatewayService.updateToderoCache(toderoId, dataToUpdate);
  },
};

// This is needed to correctly use the $match with ObjectId
const mongoose = require('mongoose');

module.exports = rankService;
