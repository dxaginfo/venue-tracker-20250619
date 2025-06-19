const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venue.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/venues:
 *   get:
 *     summary: Get all venues with optional filtering
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter venues by name (case-insensitive, partial match)
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter venues by city (case-insensitive, partial match)
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter venues by state (case-insensitive, partial match)
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter venues by country (case-insensitive, partial match)
 *       - in: query
 *         name: capacity_min
 *         schema:
 *           type: integer
 *         description: Filter venues with capacity greater than or equal to this value
 *       - in: query
 *         name: capacity_max
 *         schema:
 *           type: integer
 *         description: Filter venues with capacity less than or equal to this value
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *           default: name
 *         description: Field to sort results by
 *       - in: query
 *         name: sort_order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order (ascending or descending)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Successfully retrieved venues
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', venueController.getAllVenues);

/**
 * @swagger
 * /api/venues/{venue_id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the venue to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the venue
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.get('/:venue_id', venueController.getVenueById);

/**
 * @swagger
 * /api/venues:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the venue
 *               address:
 *                 type: string
 *                 description: Street address of the venue
 *               city:
 *                 type: string
 *                 description: City where the venue is located
 *               state:
 *                 type: string
 *                 description: State/province where the venue is located
 *               country:
 *                 type: string
 *                 description: Country where the venue is located
 *               zip_code:
 *                 type: string
 *                 description: Postal/ZIP code of the venue
 *               capacity:
 *                 type: integer
 *                 description: Maximum capacity of the venue
 *               website:
 *                 type: string
 *                 description: Website URL of the venue
 *               phone:
 *                 type: string
 *                 description: Contact phone number for the venue
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact email for the venue
 *               description:
 *                 type: string
 *                 description: Detailed description of the venue
 *               amenities:
 *                 type: object
 *                 description: Available amenities at the venue
 *               load_in_info:
 *                 type: string
 *                 description: Information about load-in procedures
 *               parking_info:
 *                 type: string
 *                 description: Information about parking at or near the venue
 *     responses:
 *       201:
 *         description: Venue created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', venueController.createVenue);

/**
 * @swagger
 * /api/venues/{venue_id}:
 *   put:
 *     summary: Update a venue
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the venue to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the venue
 *               address:
 *                 type: string
 *                 description: Street address of the venue
 *               city:
 *                 type: string
 *                 description: City where the venue is located
 *               state:
 *                 type: string
 *                 description: State/province where the venue is located
 *               country:
 *                 type: string
 *                 description: Country where the venue is located
 *               zip_code:
 *                 type: string
 *                 description: Postal/ZIP code of the venue
 *               capacity:
 *                 type: integer
 *                 description: Maximum capacity of the venue
 *               website:
 *                 type: string
 *                 description: Website URL of the venue
 *               phone:
 *                 type: string
 *                 description: Contact phone number for the venue
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact email for the venue
 *               description:
 *                 type: string
 *                 description: Detailed description of the venue
 *               amenities:
 *                 type: object
 *                 description: Available amenities at the venue
 *               load_in_info:
 *                 type: string
 *                 description: Information about load-in procedures
 *               parking_info:
 *                 type: string
 *                 description: Information about parking at or near the venue
 *     responses:
 *       200:
 *         description: Venue updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.put('/:venue_id', venueController.updateVenue);

/**
 * @swagger
 * /api/venues/{venue_id}:
 *   delete:
 *     summary: Delete a venue
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: venue_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the venue to delete
 *     responses:
 *       200:
 *         description: Venue deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.delete('/:venue_id', venueController.deleteVenue);

module.exports = router;