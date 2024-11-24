module.exports = {
  async up(db, client) {
    // Create InsuranceObject collection
    await db.createCollection('insuranceobjects', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['insuranceType', 'name', 'description'],
          properties: {
            insuranceType: {
              bsonType: 'string',
              enum: ["MEDICAL", "AUTO", "TRAVEL", "BUSINESS"],
              description: "must be a string and is required"
            },
            name: {
              bsonType: 'string',
              description: "must be a string and is required"
            },
            description: {
              bsonType: 'string',
              description: "must be a string and is required"
            }
          }
        }
      }
    });

    // Create InsuranceRisk collection
    await db.createCollection('insurancerisks', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['insuranceObject', 'name'],
          properties: {
            insuranceObject: {
              bsonType: 'objectId',
              description: "must be an objectId and is required"
            },
            name: {
              bsonType: 'string',
              description: "must be a string and is required"
            }
          }
        }
      }
    });

    // Create Contract collection
    await db.createCollection('contracts', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['client', 'affiliate'],
          properties: {
            status: {
              bsonType: 'string',
              enum: ["CREATED", "CONFIRMED", "COMPLETED"],
              description: "must be a string and is required"
            },
            client: {
              bsonType: 'objectId',
              description: "must be an objectId and is required"
            },
            affiliate: {
              bsonType: 'objectId',
              description: "must be an objectId and is required"
            }
          }
        }
      }
    });

    // Create Policy collection
    await db.createCollection('policies', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['agent', 'contract', 'insuranceSum', 'price', 'startDate', 'endDate'],
          properties: {
            agent: {
              bsonType: 'objectId',
              description: "must be an objectId and is required"
            },
            contract: {
              bsonType: 'objectId',
              description: "must be an objectId and is required"
            },
            insuranceSum: {
              bsonType: 'number',
              description: "must be a number and is required"
            },
            price: {
              bsonType: 'number',
              description: "must be a number and is required"
            },
            startDate: {
              bsonType: 'date',
              description: "must be a date and is required"
            },
            endDate: {
              bsonType: 'date',
              description: "must be a date and is required"
            }
          }
        }
      }
    });
  },

  async down(db, client) {
    // Drop the collections
    await db.collection('insuranceobjects').drop();
    await db.collection('insurancerisks').drop();
    await db.collection('contracts').drop();
    await db.collection('policies').drop();
  }
};