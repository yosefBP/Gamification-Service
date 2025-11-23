const express = require('express');
const ratingsController = require('../controllers/ratingsController');

const router = express.Router();

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Submit a new rating for a service.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceRating'
 *     responses:
 *       201:
 *         description: Rating submitted successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/api/ratings', ratingsController.submitRating);

module.exports = router;
