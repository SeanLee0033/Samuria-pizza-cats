import { gql } from '@apollo/client';

const GET_TOPPINGS = gql`
  query Toppings {
    toppings {
      id
      name
      priceCents
    }
  }
`;

export { GET_TOPPINGS };
