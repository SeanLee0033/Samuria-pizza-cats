import { Collection } from 'mongodb';
import { reveal, stub } from 'jest-auto-stub';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { PizzaProvider } from '../../src/application/providers/pizzas/pizza.provider';
import { CursorProvider } from '../../src/application/providers/pizzas/cursor.provider';
import { mockSortToArray, mockToArray } from '../helpers/mongo.helper';
import { createMockPizzaDocument, createMockPizzaResponse } from '../helpers/pizza.helpers';
import { createMockToppingDocument } from '../helpers/topping.helper';
import { PizzaDocument, toPizzaObject } from '../../src/entities/pizza';
import { ToppingDocument } from '../../src/entities/topping';
const stubPizzaCollection = stub<Collection<PizzaDocument>>();
const stubToppingCollection = stub<Collection<ToppingDocument>>();
const toppingProvider = new ToppingProvider(stubToppingCollection);
const cursorProvider = new CursorProvider(stubPizzaCollection);
const pizzaProvider = new PizzaProvider(stubPizzaCollection, toppingProvider, cursorProvider);

beforeEach(jest.clearAllMocks);

describe('pizzaProvider', (): void => {
  const mockPizzaDocument = createMockPizzaDocument();
  const mockPizza = toPizzaObject(mockPizzaDocument);
  const mockResponse = createMockPizzaResponse();
  describe('getPizzas', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).find.mockImplementation(mockToArray([mockPizzaDocument]));
      jest.spyOn(cursorProvider, 'getCursorResult').mockResolvedValue(mockResponse);
    });

    test('should call find once', async () => {
      await cursorProvider.getCursorIndex('3a653aabc755306f12660be0');
      expect(stubPizzaCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get pizzaResponse', async () => {
      const result = await pizzaProvider.getPizzas();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createPizza', (): void => {
    const testPizzaData = {
      name: 'create pizza',
      description: 'create description',
      imgSrc: 'create image',
      toppingIds: ['19651dda4a0af8315d840412'],
    };

    const validPizza = createMockPizzaDocument(testPizzaData);
    const validTopping = createMockToppingDocument({ name: 'test topping', priceCents: 300 });
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
      reveal(stubToppingCollection).find.mockImplementation(mockSortToArray([validTopping]));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.createPizza(testPizzaData);
      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
    test('should return a pizza when passed valid input', async () => {
      const result = await pizzaProvider.createPizza(testPizzaData);
      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });

  describe('deletePizza', (): void => {
    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: mockPizzaDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await pizzaProvider.deletePizza(mockPizza.id);
      expect(stubPizzaCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });
    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubPizzaCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));
      await expect(pizzaProvider.deletePizza(mockPizza.id)).rejects.toThrow(new Error('Could not delete the pizza'));
    });
    test('should return an id', async () => {
      const result = await pizzaProvider.deletePizza(mockPizza.id);
      expect(result).toEqual(mockPizza.id);
    });
  });

  describe('updatePizza', (): void => {
    const testPizzaData = {
      name: 'test pizza',
      description: 'test description',
      imgSrc: 'test image',
      toppingIds: ['19651dda4a0af8315d840412'],
    };
    const validPizza = createMockPizzaDocument(testPizzaData);

    beforeEach(() => {
      reveal(stubPizzaCollection).findOneAndUpdate.mockImplementation(() => ({ value: validPizza }));
    });

    test('should call findOneAndUpdate once', async () => {
      await pizzaProvider.updatePizza({
        id: validPizza.id,
        ...validPizza,
      });

      expect(stubPizzaCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a topping', async () => {
      const result = await pizzaProvider.updatePizza({
        id: validPizza.id,
        ...validPizza,
      });

      expect(result).toEqual(toPizzaObject(validPizza));
    });
  });
});
