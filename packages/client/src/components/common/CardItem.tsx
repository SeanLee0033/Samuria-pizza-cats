import React from 'react';
import { Card, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2, 2, 2),
    height: theme.typography.pxToRem(500),
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface CardItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  rootClassName?: string;
}

const CardItem = ({ children, onClick, rootClassName, ...props }: CardItemProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card {...props} className={`${classes.root} ${rootClassName}`} onClick={onClick}>
      {children}
    </Card>
  );
};

export default CardItem;
