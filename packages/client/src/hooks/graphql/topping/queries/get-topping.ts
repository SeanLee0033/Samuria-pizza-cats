import { gql } from '@apollo/client';

export const GET_TOPPING = gql`
  query Get_Topping($toppingId: ObjectID!) {
    topping(id: $toppingId) {
      id
      name
      priceCents
    }
  }
`;
