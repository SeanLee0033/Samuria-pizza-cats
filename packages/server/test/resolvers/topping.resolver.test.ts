import { gql } from 'apollo-server-core';

import { toppingResolver } from '../../src/application/resolvers/topping.resolver';
import { toppingProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreateToppingArgs,
  MutationDeleteToppingArgs,
  MutationUpdateToppingArgs,
} from '../../src/application/schema/types/schema';

import { createMockTopping } from '../helpers/topping.helper';
import { TestClient } from '../helpers/client.helper';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockTopping = createMockTopping();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, toppingResolver);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('toppingResolver', (): void => {
  describe('Query', () => {
    describe('toppings', () => {
      const query = gql`
        query getToppings {
          toppings {
            id
            name
            priceCents
          }
        }
      `;
      test('should get all toppings', async () => {
        jest.spyOn(toppingProvider, 'getToppings').mockResolvedValue([mockTopping]);

        const result = await client.query({ query });

        expect(result.data).toEqual({
          toppings: [
            {
              __typename: 'Topping',
              id: mockTopping.id,
              name: mockTopping.name,
              priceCents: mockTopping.priceCents,
            },
          ],
        });

        expect(toppingProvider.getToppings).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Mutation', () => {
    describe('createTopping', () => {
      const mutation = gql`
        mutation ($input: CreateToppingInput!) {
          createTopping(input: $input) {
            name
            priceCents
          }
        }
      `;

      const validTopping = createMockTopping({ name: 'test topping', priceCents: 12345 });

      beforeEach(() => {
        jest.spyOn(toppingProvider, 'createTopping').mockResolvedValue(validTopping);
      });

      test('should call create topping when passed a valid input', async () => {
        const variables: MutationCreateToppingArgs = {
          input: { name: validTopping.name, priceCents: validTopping.priceCents },
        };

        await client.mutate({ mutation, variables });

        expect(toppingProvider.createTopping).toHaveBeenCalledWith(variables.input);
      });
      test('should return created topping when passed a valid input', async () => {
        const variables: MutationCreateToppingArgs = {
          input: { name: validTopping.name, priceCents: validTopping.priceCents },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createTopping: {
            __typename: 'Topping',
            name: validTopping.name,
            priceCents: validTopping.priceCents,
          },
        });
      });
    });

    describe('deleteTopping', () => {
      const mutation = gql`
        mutation ($input: DeleteToppingInput!) {
          deleteTopping(input: $input)
        }
      `;

      const variables: MutationDeleteToppingArgs = { input: { id: mockTopping.id } };

      beforeEach(() => {
        jest.spyOn(toppingProvider, 'deleteTopping').mockResolvedValue(mockTopping.id);
      });

      test('should call deleteTopping with id', async () => {
        await client.mutate({ mutation, variables });

        expect(toppingProvider.deleteTopping).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted topping id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deleteTopping: mockTopping.id,
        });
      });
    });

    describe('updateTopping', () => {
      const mutation = gql`
        mutation ($input: UpdateToppingInput!) {
          updateTopping(input: $input) {
            id
            name
            priceCents
          }
        }
      `;
      const updatedTopping = createMockTopping({ name: 'updated topping', priceCents: 2_00 });

      const variables: MutationUpdateToppingArgs = { input: { id: mockTopping.id, name: updatedTopping.name } };

      beforeEach(() => {
        jest.spyOn(toppingProvider, 'updateTopping').mockResolvedValue(updatedTopping);
      });

      test('should call updateTopping with input', async () => {
        await client.mutate({ mutation, variables });

        expect(toppingProvider.updateTopping).toHaveBeenCalledWith(variables.input);
      });

      test('should return updated topping', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updateTopping: {
            ...updatedTopping,
          },
        });
      });
    });
  });
});
