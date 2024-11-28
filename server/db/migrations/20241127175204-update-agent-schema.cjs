module.exports = {
  async up(db, client) {
    await db.createCollection('agents', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user', 'affiliate', ''],
          properties: {
            user: {
              bsonType: 'objectId',
              description: "must be an objectId and is required"
            },
            affiliate: {
              bsonType: 'objectId',
              description: "must be an objectId and is required"
            },
            tarriffRate: {
              bsonType: 'int32',
              description: "must be an int and is required"
            },
            salary: {
              bsonType: 'int32',
              description: "must be an int and is required"
            },
          }
        }
      }
    });
  },

  async down(db, client) {
    await db.collection('agents').drop();
  }
};
