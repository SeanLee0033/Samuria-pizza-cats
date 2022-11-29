import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { createTestTopping } from '../../../lib/test/helper/topping';
import ToppingItem, { ToppingItemProps } from '../ToppingItem';
import { act } from 'react-dom/test-utils';

describe('ToppingItem', () => {
  const renderToppingList = (props: ToppingItemProps) => {
    const view = renderWithProviders(<ToppingItem {...props} />);

    return {
      ...view,
      $getPrice: () => screen.getByTestId(/^topping-price/),
      $getName: () => screen.getByTestId(/^topping-name/),
      $getModifyButton: () => screen.getByRole('button'),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    topping: createTestTopping(),
  };

  test('should display all components of the topping item', async () => {
    const { $getPrice, $getName, $getModifyButton } = renderToppingList(props);

    expect($getPrice()).toBeVisible();
    expect($getName()).toBeVisible();
    expect($getModifyButton()).toBeVisible();
  });

  test('should call handleOpen when the modify button is clicked', async () => {
    const { $getModifyButton } = renderToppingList(props);

    act(() => userEvent.click($getModifyButton()));

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});
