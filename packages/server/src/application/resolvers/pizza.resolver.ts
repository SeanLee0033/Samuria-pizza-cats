import {
  Pizza as SchemaPizza,
  CreatePizzaInput,
  DeletePizzaInput,
  UpdatePizzaInput,
  QueryInput,
} from '../schema/types/schema';
import { pizzaProvider } from '../providers';
import { Root } from '../schema/types/types';
import { PizzaResponse } from '../providers/pizzas/pizza.provider.types';

type Pizza = Omit<SchemaPizza, 'toppings' | 'priceCents'> & { toppingIds: string[] };
const pizzaResolver = {
  Query: {
    pizzas: async (_: Root, args: { input?: QueryInput }): Promise<PizzaResponse> => {
      return pizzaProvider.getPizzas(args.input);
    },
  },
  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.createPizza(args.input);
    },
    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },
    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.updatePizza(args.input);
    },
  },
};

export { pizzaResolver };
