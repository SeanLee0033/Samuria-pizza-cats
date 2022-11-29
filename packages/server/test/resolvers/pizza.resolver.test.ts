import { gql } from 'apollo-server-core';
import { resolvers } from '../../src/application/resolvers';
import { pizzaProvider } from '../../src/application/providers';
import { toppingProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
  QueryPizzasArgs,
} from '../../src/application/schema/types/schema';
import { createMockPizza, createMockPizzaDocument } from '../helpers/pizza.helpers';
import { TestClient } from '../helpers/client.helper';
import { toPizzaObject } from '../../src/entities/pizza';
import { PizzaResponse } from '../../src/application/providers/pizzas/pizza.provider.types';
let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockPizza = createMockPizza();
const mockPizzaDocument = createMockPizzaDocument();
const pizzaInputData = {
  name: 'Test Pizza',
  description: 'test Pizza description',
  imgSrc: 'testImg',
  toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
};
beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, resolvers);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query getPizzas($input: QueryInput!) {
          pizzas(input: $input) {
            results {
              id
              name
              description
              imgSrc
              toppings {
                id
                name
                priceCents
              }
              priceCents
            }
            hasNextPage
            totalCount
            cursor
          }
        }
      `;
      test('should get pizza response', async () => {
        const mockProviderPizzaResponse: PizzaResponse = {
          results: [
            {
              id: mockPizzaDocument._id,
              name: mockPizzaDocument.name,
              description: mockPizzaDocument.description,
              toppingIds: mockPizzaDocument.toppingIds,
              imgSrc: mockPizzaDocument.imgSrc,
            },
          ],
          totalCount: 5,
          cursor: 'true',
          hasNextPage: true,
        };

        jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue(mockProviderPizzaResponse);
        jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(mockPizza.toppings);
        jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(mockPizza.priceCents);
        const variables: QueryPizzasArgs = {
          input: { limit: 5, cursor: '3a653aabc755306f12660be0' },
        };

        const result = await client.query({ query, variables });
        expect(result.data).toEqual({
          pizzas: {
            __typename: 'PizzaResponse',
            results: [
              {
                __typename: 'Pizza',
                id: mockPizzaDocument._id,
                name: mockPizzaDocument.name,
                description: mockPizzaDocument.description,
                imgSrc: mockPizzaDocument.imgSrc,
                toppings: mockPizza.toppings,
                priceCents: mockPizza.priceCents,
              },
            ],
            totalCount: 5,
            cursor: 'true',
            hasNextPage: true,
          },
        });
      });
    });
  });
  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            id
            name
            description
            imgSrc
            toppings {
              id
              name
              priceCents
            }
            priceCents
          }
        }
      `;

      const validPizza = createMockPizzaDocument(pizzaInputData);

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(toPizzaObject(validPizza));
        jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(mockPizza.toppings);
        jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(mockPizza.priceCents);
      });

      test('should call create pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: pizzaInputData,
        };
        await client.mutate({ mutation, variables });
        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return created topping when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: pizzaInputData,
        };
        const result = await client.mutate({ mutation, variables });
        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            id: validPizza._id.toString(),
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppings: mockPizza.toppings,
            priceCents: mockPizza.priceCents,
          },
        });
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input)
        }
      `;

      const variables: MutationDeletePizzaArgs = { input: { id: mockPizzaDocument._id } };
      const testPizza = {
        id: mockPizzaDocument._id,
        name: 'delete Pizza',
        description: mockPizzaDocument.description,
        imgSrc: mockPizzaDocument.imgSrc,
        toppingIds: mockPizzaDocument.toppingIds,
      };
      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(testPizza.id);
        jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(mockPizza.toppings);
        jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(mockPizza.priceCents);
      });

      test('should call deletePizza with id', async () => {
        await client.mutate({ mutation, variables });
        expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return delete pizza id', async () => {
        const result = await client.mutate({ mutation, variables });
        expect(result.data).toEqual({
          deletePizza: testPizza.id,
        });
      });
    });

    describe('updatePizza', () => {
      const mutation = gql`
        mutation ($input: UpdatePizzaInput!) {
          updatePizza(input: $input) {
            id
            name
            description
            imgSrc
            toppings {
              id
              name
              priceCents
            }
            priceCents
          }
        }
      `;
      const updatePizza = {
        id: mockPizzaDocument._id,
        name: 'update pizza',
        description: 'update Pizza description',
        imgSrc: 'updateImg',
        toppingIds: ['19651dda4a0af8315d840412', 'e9e565e9a57cf33fb9b8ceed'],
      };

      const variables: MutationUpdatePizzaArgs = { input: updatePizza };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatePizza);
        jest.spyOn(toppingProvider, 'getToppingsByIds').mockResolvedValue(mockPizza.toppings);
        jest.spyOn(toppingProvider, 'getPriceCents').mockResolvedValue(mockPizza.priceCents);
      });

      test('should call updateTopping with input', async () => {
        await client.mutate({ mutation, variables });
        expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
      });

      test('should return updated pizza', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updatePizza: {
            __typename: 'Pizza',
            id: updatePizza.id,
            name: updatePizza.name,
            description: updatePizza.description,
            imgSrc: updatePizza.imgSrc,
            toppings: mockPizza.toppings,
            priceCents: mockPizza.priceCents,
          },
        });
      });
    });
  });
});
