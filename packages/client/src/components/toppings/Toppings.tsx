import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Container, createStyles, List, ListItem, Theme } from '@material-ui/core';

import { Topping } from '../../types';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import PageHeader from '../common/PageHeader';
import ToppingModal from './ToppingModal';
import ToppingItem from './ToppingItem';

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      minWidth: typography.pxToRem(650),
    },
    skeleton: {
      display: 'flex',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
    header: {
      display: 'flex',
    },
    name: {
      minWidth: typography.pxToRem(500),
    },
    right: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
  })
);

const Toppings: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedTopping, setSelectedTopping] = React.useState<Partial<Topping>>();

  const { loading, data } = useQuery(GET_TOPPINGS);

  const handleOpen = (topping?: Topping): void => {
    setSelectedTopping(topping);
    setOpen(true);
  };

  if (loading) {
    return <div className={classes.skeleton}>Loading ...</div>;
  }

  const toppingList = data?.toppings.map((topping: Topping) => (
    <ToppingItem
      data-testid={`topping-item-${topping?.id}`}
      key={topping.id}
      handleOpen={handleOpen}
      topping={topping}
    />
  ));

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Toppings'} />
      <List className={classes.container}>
        <ListItem className={classes.header}>
          <h2 className={classes.name}>Topping</h2>
          <div className={classes.right}>
            <h2>Price</h2>
            <h2>Modify</h2>
          </div>
        </ListItem>
        <ToppingItem key="add-topping" handleOpen={handleOpen} />
        {toppingList}
      </List>

      <ToppingModal
        selectedTopping={selectedTopping}
        setSelectedTopping={setSelectedTopping}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
};

export default Toppings;
