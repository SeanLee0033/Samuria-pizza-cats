import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { AddCircle, CallMissedSharp } from '@material-ui/icons';
import { Container, createStyles, Theme, Grid, IconButton } from '@material-ui/core';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Pizza } from '../../types';
import CardItem from '../common/CardItem';
import PizzaModal from './PizzaModal';
import PizzaItem from './PizzaItem';
import PageHeader from '../common/PageHeader';
import CardItemSkeleton from '../common/CardItemSkeleton';
import makePizzaBackimage from '../../assets/img/make-pizza.jpeg';

const useStyles = makeStyles(({ typography, spacing }: Theme) =>
  createStyles({
    container: {
      minWidth: typography.pxToRem(650),
      display: 'flex',
      flexWrap: 'wrap',
    },
    makePizza: {
      justifyContent: 'space-between',
      color: 'white',
      backgroundImage: `url(${makePizzaBackimage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    PageNationButton: {
      marginTop: '.5rem',
      width: '100%',
      height: '50px',
      border: 'none',
      outline: 'none',
      background: 'black',
      color: '#fff',
      fontSize: '22px',
      borderRadius: '10px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    },

    LastPage: {
      cursor: 'auto',
      background: 'white',
      color: 'black',
    },
  })
);

const Pizzas: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [pageLimit, setPageLimit] = React.useState<number>(6);
  const [cursor, setCursor] = React.useState<string>();
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();
  const { loading, data, error, fetchMore } = useQuery(GET_PIZZAS, {
    variables: { input: { limit: 5, cursor: 'initial' } },
  });
  React.useEffect(() => {
    setCursor(data?.pizzas.cursor);
  }, [data]);
  const selectPizza = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };
  if (error) return <div>Error! {error.message}</div>;

  const numOfSkeleton: number = 9;
  const makeSkeletonArray = (): number[] => {
    let array = [];
    for (let i = 0; i < numOfSkeleton; i++) {
      array.push(i);
    }
    return array;
  };
  const pizzasSkeleton = makeSkeletonArray().map((el, index) => (
    <Grid item xs={4} md={4} key={index}>
      <CardItemSkeleton data-testid="pizza-list-loading"></CardItemSkeleton>
    </Grid>
  ));

  const getNextPage = () => {
    fetchMore({
      variables: { input: { limit: pageLimit, cursor: cursor } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const { results, hasNextPage, cursor, totalCount, __typename } = fetchMoreResult.pizzas;
        return Object.assign({}, prev, {
          pizzas: {
            results: [...prev.pizzas.results, ...results],
            cursor: cursor,
            hasNextPage: hasNextPage,
            totalCount: totalCount,
            __typename: __typename,
          },
        });
      },
    });
  };

  const pizzaList = data?.pizzas.results.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} pizza={pizza} key={pizza.id} selectPizza={selectPizza} />
  ));
  return (
    <Container maxWidth="lg">
      <PageHeader pageHeader={'Pizza List'} />
      <Grid container spacing={2}>
        {loading ? (
          pizzasSkeleton
        ) : (
          <Grid item xs={4} md={4}>
            <CardItem rootClassName={classes.makePizza}>
              <h1>Make A New Pizza</h1>
              <IconButton
                edge="end"
                size="medium"
                aria-label="update"
                type="button"
                color="inherit"
                onClick={(): void => {
                  selectPizza();
                  setOpen(true);
                }}
              >
                <AddCircle fontSize="large" />
              </IconButton>
            </CardItem>
          </Grid>
        )}

        {pizzaList}
      </Grid>

      <PizzaModal selectedPizza={selectedPizza} open={open} setOpen={setOpen} />
      <form>
        <input
          type="button"
          data-testid="next-page-button"
          onClick={(): void => getNextPage()}
          className={
            data?.pizzas.hasNextPage == true
              ? classes.PageNationButton
              : `${classes.PageNationButton} ${classes.LastPage}`
          }
          disabled={data?.pizzas.hasNextPage == false ? true : false}
          value={data?.pizzas.hasNextPage == false ? 'NO MORE PIZZA! Thank you! :)' : 'NEXT'}
        />
      </form>
    </Container>
  );
};

export default Pizzas;
