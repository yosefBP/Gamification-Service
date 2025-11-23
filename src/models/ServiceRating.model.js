const mongoose = require('mongoose');

/**
 * @typedef {object} DetailedMetrics
 * @property {boolean} punctuality - Whether the service was punctual.
 * @property {boolean} cleanliness - Whether the service was clean.
 * @property {boolean} communication - Whether the communication was good.
 * @property {boolean} quality - Whether the quality of the service was good.
 */

/**
 * @typedef {object} ServiceRating
 * @property {mongoose.Schema.Types.ObjectId} toderoId - The ID of the Todero.
 * @property {mongoose.Schema.Types.ObjectId} clientId - The ID of the Client.
 * @property {mongoose.Schema.Types.ObjectId} serviceId - The ID of the Service.
 * @property {number} starRating - The star rating from 1 to 5.
 * @property {DetailedMetrics} detailedMetrics - Detailed metrics of the service.
 * @property {string} comments - Comments about the service.
 */
const serviceRatingSchema = new mongoose.Schema({
  toderoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todero', // Assuming a Todero model exists in the API Gateway
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Assuming a Client model exists
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service', // Assuming a Service model exists
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  detailedMetrics: {
    punctuality: { type: Boolean, default: false },
    cleanliness: { type: Boolean, default: false },
    communication: { type: Boolean, default: false },
    quality: { type: Boolean, default: false },
  },
  comments: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const ServiceRating = mongoose.model('ServiceRating', serviceRatingSchema);

module.exports = ServiceRating;
