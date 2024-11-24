// 20241121205926-add-users-collection.cjs
module.exports = {
  async up(db, client) {
    // Create the users collection with schema validation
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['firstName', 'lastName', 'email', 'password', 'role'],
          properties: {
            firstName: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            lastName: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            email: {
              bsonType: 'string',
              pattern: '^.+@.+\..+$',
              description: 'must be a string and match the email pattern'
            },
            password: {
              bsonType: 'string',
              minLength: 6,
              description: 'must be a string with at least 6 characters and is required'
            },
            role: {
              bsonType: 'string',
              enum: ['admin', 'agent', 'client'],
              description: 'can only be one of the enum values and is required'
            }
          }
        }
      }
    });

    // Create the clients collection with schema validation
    await db.createCollection('clients', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['address', 'phoneNumber', 'user'],
          properties: {
            address: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            phoneNumber: {
              bsonType: 'string',
              pattern: '^(8|\\(\\+375\\))\\s?\\(?0?29\\)?\\s?\\d{3}[-\\s]?\\d{2}[-\\s]?\\d{2}$',
              description: 'must be a string and match the phone number pattern'
            },
            user: {
              bsonType: 'objectId',
              description: 'must be an objectId and is required'
            }
          }
        }
      }
    });

    // Create the agents collection with schema validation
    await db.createCollection('agents', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['agencyName', 'licenseNumber'],
          properties: {
            agencyName: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            licenseNumber: {
              bsonType: 'string',
              description: 'must be a string and is required'
            }
          }
        }
      }
    });

    // Create the affiliates collection with schema validation
    await db.createCollection('affiliates', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'address'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            address: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            phone: {
              bsonType: 'string',
              pattern: '^(8|\\(\\+375\\))\\s?\\(?0?29\\)?\\s?\\d{3}[-\\s]?\\d{2}[-\\s]?\\d{2}$',
              description: 'must be a string and match the phone number pattern'
            }
          }
        }
      }
    });
  },

  async down(db, client) {
    // Drop the collections if rolling back
    await db.collection('users').drop();
    await db.collection('clients').drop();
    await db.collection('agents').drop();
    await db.collection('affiliates').drop();
  }
};