import { merge } from 'lodash';
import { pizzaResolver } from './pizza.resolver';
import { toppingResolver } from './topping.resolver';

const resolvers = merge(toppingResolver, pizzaResolver);

export { resolvers };
