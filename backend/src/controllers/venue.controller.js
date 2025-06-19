const Venue = require('../models/venue.model');
const { NotFoundError, ValidationError } = require('../utils/errors');

/**
 * Get all venues with optional filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAllVenues = async (req, res, next) => {
  try {
    const { 
      name, city, state, country, capacity_min, capacity_max, 
      sort_by = 'name', sort_order = 'asc', page = 1, limit = 20 
    } = req.query;
    
    let query = Venue.query();
    
    // Apply filters if they exist
    if (name) {
      query = query.where('name', 'ilike', `%${name}%`);
    }
    if (city) {
      query = query.where('city', 'ilike', `%${city}%`);
    }
    if (state) {
      query = query.where('state', 'ilike', `%${state}%`);
    }
    if (country) {
      query = query.where('country', 'ilike', `%${country}%`);
    }
    if (capacity_min) {
      query = query.where('capacity', '>=', parseInt(capacity_min));
    }
    if (capacity_max) {
      query = query.where('capacity', '<=', parseInt(capacity_max));
    }
    
    // Sort results
    query = query.orderBy(sort_by, sort_order);
    
    // Pagination
    const offset = (page - 1) * limit;
    query = query.offset(offset).limit(limit);
    
    // Execute query
    const venues = await query;
    
    // Get total count for pagination
    const totalQuery = Venue.query().count('venue_id as count');
    
    // Apply same filters to count query
    if (name) {
      totalQuery.where('name', 'ilike', `%${name}%`);
    }
    if (city) {
      totalQuery.where('city', 'ilike', `%${city}%`);
    }
    if (state) {
      totalQuery.where('state', 'ilike', `%${state}%`);
    }
    if (country) {
      totalQuery.where('country', 'ilike', `%${country}%`);
    }
    if (capacity_min) {
      totalQuery.where('capacity', '>=', parseInt(capacity_min));
    }
    if (capacity_max) {
      totalQuery.where('capacity', '<=', parseInt(capacity_max));
    }
    
    const totalCount = await totalQuery;
    const count = parseInt(totalCount[0].count);
    
    res.status(200).json({
      success: true,
      count,
      page: parseInt(page),
      limit: parseInt(limit),
      total_pages: Math.ceil(count / limit),
      data: venues
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a venue by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getVenueById = async (req, res, next) => {
  try {
    const { venue_id } = req.params;
    
    const venue = await Venue.query()
      .findById(venue_id)
      .withGraphFetched('[contacts, bookings, ratings, tags]');
      
    if (!venue) {
      throw new NotFoundError(`Venue with ID ${venue_id} not found`);
    }
    
    res.status(200).json({
      success: true,
      data: venue
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new venue
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createVenue = async (req, res, next) => {
  try {
    // Extract venue data from request body
    const venueData = req.body;
    
    // Validate venue data
    if (!venueData.name) {
      throw new ValidationError('Venue name is required');
    }
    
    // Create venue
    const venue = await Venue.query().insert(venueData);
    
    res.status(201).json({
      success: true,
      data: venue
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a venue
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateVenue = async (req, res, next) => {
  try {
    const { venue_id } = req.params;
    const venueData = req.body;
    
    // Check if venue exists
    const existingVenue = await Venue.query().findById(venue_id);
    
    if (!existingVenue) {
      throw new NotFoundError(`Venue with ID ${venue_id} not found`);
    }
    
    // Update venue
    const updatedVenue = await Venue.query().patchAndFetchById(venue_id, venueData);
    
    res.status(200).json({
      success: true,
      data: updatedVenue
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a venue
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteVenue = async (req, res, next) => {
  try {
    const { venue_id } = req.params;
    
    // Check if venue exists
    const existingVenue = await Venue.query().findById(venue_id);
    
    if (!existingVenue) {
      throw new NotFoundError(`Venue with ID ${venue_id} not found`);
    }
    
    // Delete venue
    await Venue.query().deleteById(venue_id);
    
    res.status(200).json({
      success: true,
      message: `Venue with ID ${venue_id} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};