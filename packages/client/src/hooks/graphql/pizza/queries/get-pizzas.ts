import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query getPizzas($input: QueryInput) {
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

export { GET_PIZZAS };
