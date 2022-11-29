import { ObjectId } from 'bson';
import { Topping } from '../../src/application/schema/types/schema';
import { ToppingDocument } from '../../src/entities/topping';

const createMockTopping = (data?: Partial<Topping>): Topping => {
  return {
    __typename: 'Topping',
    id: new ObjectId().toHexString(),
    name: 'Tomato Sauce',
    priceCents: 250,
    ...data,
  };
};

const createMockToppingDocument = (data?: Partial<ToppingDocument>): ToppingDocument => {
  return {
    _id: new ObjectId(),
    name: 'Tomato Sauce',
    priceCents: 250,
    ...data,
  };
};

export { createMockTopping, createMockToppingDocument };
