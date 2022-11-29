import { ObjectId } from 'bson';

import { Topping } from '../../../types/schema';

export const createTestTopping = (data: Partial<Topping> = {}): Topping & { __typename: string } => ({
  __typename: 'Topping',
  id: new ObjectId().toHexString(),
  name: 'A topping',
  priceCents: 3_50,
  ...data,
});
