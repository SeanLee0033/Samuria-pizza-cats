import { IconButton, ListItem, Theme } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import toDollars from '../../lib/format-dollars';
import { Topping } from '../../types';

const useStyles = makeStyles(({ typography }: Theme) => ({
  container: {
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
}));

export interface ToppingItemProps {
  topping?: Topping;
  handleOpen: (topping?: Topping) => void;
}

const ToppingItem: React.FC<ToppingItemProps> = ({ topping, handleOpen, ...props }) => {
  const classes = useStyles();

  return (
    <ListItem {...props} className={classes.container}>
      <p data-testid={`topping-name-${topping?.id}`} className={classes.name}>
        {topping?.name ?? 'Add topping'}
      </p>
      <div className={classes.right}>
        <p data-testid={`topping-price-${topping?.id}`}>{topping?.priceCents ? toDollars(topping.priceCents) : ''}</p>
        <IconButton edge="end" aria-label="modify" type="button" onClick={(): void => handleOpen(topping)}>
          {topping ? <Edit /> : <AddCircle />}
        </IconButton>
      </div>
    </ListItem>
  );
};

export default ToppingItem;
