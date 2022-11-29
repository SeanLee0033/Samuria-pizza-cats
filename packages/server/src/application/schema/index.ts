import { gql } from 'apollo-server-core';
import { typeDefs as pizzaTypeDefs } from './pizza.schema';
import { typeDefs as toppingTypeDefs } from './topping.schema';

const scalarSchema = gql`
  scalar ObjectID
  scalar Long
`;

const typeDefs = gql`
  ${scalarSchema}
  ${pizzaTypeDefs}
  ${toppingTypeDefs}
`;

export { typeDefs };
