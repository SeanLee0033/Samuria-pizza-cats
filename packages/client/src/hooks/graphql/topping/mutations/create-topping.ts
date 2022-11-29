import { gql } from '@apollo/client';

export const CREATE_TOPPING = gql`
  mutation ($createToppingInput: CreateToppingInput!) {
    createTopping(input: $createToppingInput) {
      name
      priceCents
    }
  }
`;
