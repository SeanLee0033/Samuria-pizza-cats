import { ObjectId } from 'bson';

import { Pizza } from '../../../types/schema';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  id: new ObjectId().toHexString(),
  name: 'A Pizza',
  description: 'A Pizza Description',
  imgSrc: 'A Pizza Image',
  toppings: [{ id: new ObjectId().toHexString(), name: 'A topping', priceCents: 3_50 }],
  priceCents: 3_50,
  ...data,
});
