import { MongoClient } from 'mongodb';
import { SeedPizza, toppings, pizzas, SeedTopping } from './initial-data';

require('dotenv').config();

const uri = process.env.MONGO_CONNECTION_STRING ?? '';
const dbName = process.env.DB_NAME;

let client = new MongoClient(uri);

const seedCollection = async (collectionName: string, data: SeedPizza[] | SeedTopping[]): Promise<void> => {
  try {
    console.log(`MongoDB is connecting to ${uri}`);

    client = await client.connect();

    const collection = client.db(dbName).collection(collectionName);

    console.log(`Destroying ${collectionName}...`);

    if (await collection.countDocuments()) {
      await collection.drop();
    }

    console.log(`Seeding ${collectionName}...`);
    await collection.insertMany(data);

    console.log(`Done seeding ${collectionName}.`);

    client.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

(async (): Promise<void> => {
  try {
    await seedCollection('pizzas', pizzas);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await seedCollection('toppings', toppings);
  } catch (error) {
    console.log(error);
  }
})();
