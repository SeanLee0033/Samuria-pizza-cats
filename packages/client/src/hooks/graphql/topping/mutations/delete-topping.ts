import { gql } from '@apollo/client';

export const DELETE_TOPPING = gql`
  mutation ($deleteToppingInput: DeleteToppingInput!) {
    deleteTopping(input: $deleteToppingInput)
  }
`;
