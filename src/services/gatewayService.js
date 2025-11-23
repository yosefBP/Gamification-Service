const axios = require('axios');

/**
 * Service for communicating with the API Gateway.
 * @namespace gatewayService
 */
const gatewayService = {
  /**
   * Updates the Todero's cached stats in the API Gateway.
   *
   * @param {string} toderoId - The ID of the Todero to update.
   * @param {object} data - The data to send to the API Gateway.
   * @returns {Promise<void>}
   * @throws {Error} If the request to the API Gateway fails.
   */
  async updateToderoCache(toderoId, data) {
    const url = `${process.env.API_GATEWAY_URL}/api/internal/toderos/${toderoId}/stats-cache`;
    const secret = process.env.API_GATEWAY_INTERNAL_SECRET;

    try {
      await axios.patch(url, data, {
        headers: {
          'X-Service-Internal-Secret': secret,
        },
      });
      console.log(`Successfully updated cache for Todero ${toderoId}`);
    } catch (error) {
      console.error(`Failed to update cache for Todero ${toderoId}:`, error.message);
      throw new Error('Failed to communicate with API Gateway.');
    }
  },
};

module.exports = gatewayService;
