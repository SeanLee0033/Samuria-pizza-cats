import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_TOPPINGS } from '../graphql/topping/queries/get-toppings';
import { CREATE_TOPPING } from '../graphql/topping/mutations/create-topping';
import { DELETE_TOPPING } from '../graphql/topping/mutations/delete-topping';
import { UPDATE_TOPPING } from '../graphql/topping/mutations/update-topping';

interface UseToppingMutationsOutput {
  onCreateTopping: (selectedTopping: any) => void;
  onDeleteTopping: (selectedTopping: any) => Promise<void>;
  onUpdateTopping: (selectedTopping: any) => void;
}

const useToppingMutations = (): UseToppingMutationsOutput => {
  const [createTopping] = useMutation(CREATE_TOPPING, { refetchQueries: [GET_TOPPINGS, 'Toppings'] });
  const [deleteTopping] = useMutation(DELETE_TOPPING, { refetchQueries: [GET_TOPPINGS, 'Toppings'] });
  const [updateTopping] = useMutation(UPDATE_TOPPING);

  const onCreateTopping = useCallback(
    (selectedTopping) => {
      try {
        createTopping({
          variables: {
            createToppingInput: {
              name: selectedTopping.name,
              priceCents: selectedTopping.priceCents,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [createTopping]
  );

  const onDeleteTopping = useCallback(
    async (selectedTopping) => {
      try {
        await deleteTopping({
          variables: {
            deleteToppingInput: {
              id: selectedTopping.id,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [deleteTopping]
  );

  const onUpdateTopping = useCallback(
    (selectedTopping) => {
      try {
        updateTopping({
          variables: {
            updateToppingInput: {
              id: selectedTopping.id,
              name: selectedTopping?.name,
              priceCents: selectedTopping?.priceCents,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [updateTopping]
  );

  return { onCreateTopping, onDeleteTopping, onUpdateTopping };
};

export default useToppingMutations;
