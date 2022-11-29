import { gql } from '@apollo/client';

export const UPDATE_TOPPING = gql`
  mutation ($updateToppingInput: UpdateToppingInput!) {
    updateTopping(input: $updateToppingInput) {
      id
      name
      priceCents
    }
  }
`;
