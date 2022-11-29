import { Document } from 'mongodb';
import { Topping } from '../application/providers/toppings/topping.provider.types';

interface ToppingDocument extends Document, Omit<Topping, 'id'> {}

const toToppingObject = (topping: ToppingDocument): Topping => {
  return {
    id: topping._id.toHexString(),
    name: topping.name,
    priceCents: topping.priceCents,
  };
};

export { ToppingDocument, toToppingObject };
