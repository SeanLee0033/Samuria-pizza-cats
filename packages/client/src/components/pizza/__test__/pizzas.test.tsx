import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { graphql } from 'msw';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { Pizza } from '../../../types';
import { server, setupMswServer } from '../../../lib/test/msw-server';
import { createTestPizza } from '../../../lib/test/helper/pizza';
import Pizzas from '../Pizzas';

describe('Pizzas', () => {
  setupMswServer();

  const mockPizzaQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('getPizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: true,
            pizzas: { results: [...data], cursor: '6377149c89d44349ca48f47e', hasNextPage: true, totalCount: 5 },
          })
        );
      })
    );
  };

  const renderPizzaList = () => {
    const view = renderWithProviders(<Pizzas />);
    return {
      ...view,
      $findPizzaItems: () => screen.getAllByTestId(/^pizza-item-/),
      $queryPizzaItems: () => screen.queryByTestId(/^pizza-list-loading/),
      $getNexPageButton: () => screen.getByTestId('next-page-button'),
    };
  };

  beforeEach(() => {
    const pizza1 = createTestPizza();
    const pizza2 = createTestPizza();

    mockPizzaQuery([pizza1, pizza2]);
  });
  test('should display a list of pizzas', async () => {
    const { $findPizzaItems } = renderPizzaList();
    await waitFor(() => {
      expect($findPizzaItems()).toHaveLength(2);
    });
  });
  test('should display loading page', async () => {
    const { $queryPizzaItems } = renderPizzaList();

    expect(
      await waitFor(() => {
        $queryPizzaItems();
      })
    ).not.toBeNull();
  });
  test('should call getNextPage when click next page button', async () => {
    const getNextPage = jest.fn();
    renderWithProviders(
      <input type="button" onClick={(): void => getNextPage()} data-testid="next-page-button" value="NEXT" />
    );
    act(() => userEvent.click(screen.getByTestId('next-page-button')));
    expect(getNextPage).toHaveBeenCalledTimes(1);
  });
});
