import { gql } from '@apollo/client';

export const DELETE_PIZZA = gql`
  mutation ($deletePizzaInput: DeletePizzaInput!) {
    deletePizza(input: $deletePizzaInput)
  }
`;
