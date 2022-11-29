import { Collection } from 'mongodb';

import { reveal, stub } from 'jest-auto-stub';
import { ToppingProvider } from '../../src/application/providers/toppings/topping.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockToppingDocument } from '../helpers/topping.helper';
import { ToppingDocument, toToppingObject } from '../../src/entities/topping';

const stubToppingCollection = stub<Collection<ToppingDocument>>();

const toppingProvider = new ToppingProvider(stubToppingCollection);

beforeEach(jest.clearAllMocks);

describe('toppingProvider', (): void => {
  const mockToppingDocument = createMockToppingDocument();
  const mockTopping = toToppingObject(mockToppingDocument);

  describe('getToppings', (): void => {
    beforeEach(() => {
      reveal(stubToppingCollection).find.mockImplementation(mockSortToArray([mockToppingDocument]));
    });
    test('should call find once', async () => {
      await toppingProvider.getToppings();

      expect(stubToppingCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all toppings', async () => {
      const result = await toppingProvider.getToppings();

      expect(result).toEqual([mockTopping]);
    });
  });
  describe('createTopping', (): void => {
    const validTopping = createMockToppingDocument({ name: 'test topping', priceCents: 12345 });

    beforeEach(() => {
      reveal(stubToppingCollection).findOneAndUpdate.mockImplementation(() => ({ value: validTopping }));
    });
    test('should call findOneAndUpdate once', async () => {
      await toppingProvider.createTopping({ name: validTopping.name, priceCents: validTopping.priceCents });

      expect(stubToppingCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a topping when passed valid input', async () => {
      const result = await toppingProvider.createTopping({
        name: validTopping.name,
        priceCents: validTopping.priceCents,
      });

      expect(result).toEqual(toToppingObject(validTopping));
    });
  });
  describe('deleteTopping', (): void => {
    beforeEach(() => {
      reveal(stubToppingCollection).findOneAndDelete.mockImplementation(() => ({ value: mockToppingDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await toppingProvider.deleteTopping(mockTopping.id);

      expect(stubToppingCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubToppingCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

      await expect(toppingProvider.deleteTopping(mockTopping.id)).rejects.toThrow(
        new Error('Could not delete the topping')
      );
    });

    test('should return an id', async () => {
      const result = await toppingProvider.deleteTopping(mockTopping.id);

      expect(result).toEqual(mockTopping.id);
    });
  });
  describe('updateTopping', (): void => {
    const validTopping = createMockToppingDocument({ name: 'test topping', priceCents: 12345 });

    beforeEach(() => {
      reveal(stubToppingCollection).findOneAndUpdate.mockImplementation(() => ({ value: validTopping }));
    });

    test('should call findOneAndUpdate once', async () => {
      await toppingProvider.updateTopping({
        id: validTopping.id,
        name: validTopping.name,
        priceCents: validTopping.priceCents,
      });

      expect(stubToppingCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a topping', async () => {
      const result = await toppingProvider.updateTopping({
        id: validTopping.id,
        name: validTopping.name,
        priceCents: validTopping.priceCents,
      });

      expect(result).toEqual(toToppingObject(validTopping));
    });
  });
});
