import { screen } from '@testing-library/react';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Topping } from '../../../types';
import { server } from '../../../lib/test/msw-server';
import { createTestTopping } from '../../../lib/test/helper/topping';
import Toppings from '../Toppings';

describe('Toppings', () => {
  const renderToppingList = () => {
    const view = renderWithProviders(<Toppings />);

    return {
      ...view,
      $findToppingItems: () => screen.findAllByTestId(/^topping-item-/),
      $findToppingItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockToppingsQuery = (data: Partial<Topping[]>) => {
    server.use(
      graphql.query('Toppings', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            toppings: [...data],
          })
        );
      })
    );
  };

  beforeEach(() => {
    const topping1 = createTestTopping();
    const topping2 = createTestTopping();
    mockToppingsQuery([topping1, topping2]);
  });

  test('should display a list of toppings', async () => {
    const { $findToppingItems } = renderToppingList();

    expect(await $findToppingItems()).toHaveLength(2);
  });
});
