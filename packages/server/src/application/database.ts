import { Db, MongoClient, Document } from 'mongodb';
require('dotenv').config();

const setupDb = (): Db => {
  const uri = process.env.MONGO_CONNECTION_STRING ?? '';
  const dbName = process.env.DB_NAME;

  console.log(`MongoDB is connecting to ${uri}`);
  const client = new MongoClient(uri);

  try {
    client.connect(() => {
      console.log(`MongoDb connected to ${dbName}`);
    });

    return client.db(dbName);
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export { Document, setupDb };
