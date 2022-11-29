import { gql } from '@apollo/client';

export const CREATE_PIZZA = gql`
  mutation ($createPizzaInput: CreatePizzaInput!) {
    createPizza(input: $createPizzaInput) {
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
