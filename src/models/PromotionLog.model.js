const mongoose = require('mongoose');

/**
 * @typedef {object} PromotionLog
 * @property {mongoose.Schema.Types.ObjectId} toderoId - The ID of the Todero.
 * @property {string} previousRank - The previous rank of the Todero.
 * @property {string} newRank - The new rank of the Todero.
 * @property {string} reason - The reason for the promotion.
 * @property {Date} date - The date of the promotion.
 */
const promotionLogSchema = new mongoose.Schema({
  toderoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todero',
    required: true,
  },
  previousRank: {
    type: String,
    required: true,
  },
  newRank: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PromotionLog = mongoose.model('PromotionLog', promotionLogSchema);

module.exports = PromotionLog;
