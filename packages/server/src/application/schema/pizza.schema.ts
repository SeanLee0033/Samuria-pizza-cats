import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppings: [Topping!]!
    imgSrc: String!
    priceCents: Int!
  }
  type PizzaResponse {
    results: [Pizza!]!
    totalCount: Int!
    hasNextPage: Boolean!
    cursor: String
  }
  type Query {
    pizzas(input: QueryInput): PizzaResponse!
  }
  input QueryInput {
    limit: Int!
    cursor: String!
  }
  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    updatePizza(input: UpdatePizzaInput!): Pizza!
    deletePizza(input: DeletePizzaInput!): ObjectID!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [ObjectID!]!
  }

  input DeletePizzaInput {
    id: ObjectID!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String
    description: String
    imgSrc: String
    toppingIds: [ObjectID!]
  }
`;

export { typeDefs };
