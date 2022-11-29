import { ObjectId } from 'bson';
import { Pizza } from '../../src/application/schema/types/schema';
import { PizzaDocument } from '../../src/entities/pizza';
import { PizzaResponse } from '../../src/application/providers/pizzas/pizza.provider.types';
const createMockPizza = (data?: Partial<Pizza>): Pizza => {
  return {
    __typename: 'Pizza',
    id: new ObjectId().toHexString(),
    name: 'Test Pizza',
    description: 'test Pizza description',
    imgSrc: 'testImg',
    toppings: [
      {
        __typename: 'Topping',
        id: '19651dda4a0af8315d840412',
        name: 'Anchovy',
        priceCents: 300,
      },
      {
        __typename: 'Topping',
        id: 'e9e565e9a57cf33fb9b8ceed',
        name: 'BBQ Sauce',
        priceCents: 400,
      },
    ],
    priceCents: 700,
    ...data,
  };
};
const createMockPizzaResponse = (data?: Partial<PizzaDocument>): PizzaResponse => {
  return {
    results: [
      {
        id: new ObjectId().toString(),
        name: 'Test Pizza',
        description: 'test Pizza description',
        imgSrc: 'testImg',
        toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
        ...data,
      },
    ],
    totalCount: 5,
    hasNextPage: true,
    cursor: '3a653aabc755306f12660be0',
  };
};
const createMockPizzaDocument = (data?: Partial<PizzaDocument>): PizzaDocument => {
  return {
    _id: new ObjectId(),
    name: 'Test Pizza',
    description: 'test Pizza description',
    imgSrc: 'testImg',
    toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
    ...data,
  };
};

export { createMockPizza, createMockPizzaDocument, createMockPizzaResponse };
