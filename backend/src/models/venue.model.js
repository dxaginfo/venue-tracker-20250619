const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Venue extends Model {
  static get tableName() {
    return 'venues';
  }

  static get idColumn() {
    return 'venue_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        venue_id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        address: { type: 'string', maxLength: 255 },
        city: { type: 'string', maxLength: 100 },
        state: { type: 'string', maxLength: 100 },
        country: { type: 'string', maxLength: 100 },
        zip_code: { type: 'string', maxLength: 20 },
        capacity: { type: 'integer', minimum: 0 },
        website: { type: 'string', maxLength: 255 },
        phone: { type: 'string', maxLength: 20 },
        email: { type: 'string', format: 'email', maxLength: 255 },
        description: { type: 'string' },
        amenities: { 
          type: 'object',
          properties: {
            parking: { type: 'boolean' },
            sound_system: { type: 'boolean' },
            in_house_engineer: { type: 'boolean' },
            stage_lighting: { type: 'boolean' },
            dressing_room: { type: 'boolean' },
            bar: { type: 'boolean' },
            food_service: { type: 'boolean' },
            accessible: { type: 'boolean' },
            wifi: { type: 'boolean' },
            merchandise_space: { type: 'boolean' }
          }
        },
        load_in_info: { type: 'string' },
        parking_info: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const Contact = require('./contact.model');
    const Booking = require('./booking.model');
    const Rating = require('./rating.model');
    const Tag = require('./tag.model');

    return {
      contacts: {
        relation: Model.HasManyRelation,
        modelClass: Contact,
        join: {
          from: 'venues.venue_id',
          to: 'contacts.venue_id'
        }
      },
      bookings: {
        relation: Model.HasManyRelation,
        modelClass: Booking,
        join: {
          from: 'venues.venue_id',
          to: 'bookings.venue_id'
        }
      },
      ratings: {
        relation: Model.HasManyRelation,
        modelClass: Rating,
        join: {
          from: 'venues.venue_id',
          to: 'ratings.venue_id'
        }
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: 'venues.venue_id',
          through: {
            from: 'venue_tags.venue_id',
            to: 'venue_tags.tag_id'
          },
          to: 'tags.tag_id'
        }
      }
    };
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Venue;