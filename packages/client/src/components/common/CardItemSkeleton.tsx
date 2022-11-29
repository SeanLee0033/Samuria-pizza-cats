import { Skeleton } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core';

import CardItem from './CardItem';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.typography.pxToRem(400),
  },
  img: {
    width: theme.typography.pxToRem(350),
    height: theme.typography.pxToRem(350),
  },
}));

const CardItemSkeleton = ({ ...props }): JSX.Element => {
  const classes = useStyles();

  return (
    <CardItem {...props} rootClassName={classes.root}>
      <Skeleton variant="rect" className={classes.img} />
      <Skeleton width="100%" />
      <Skeleton width="60%" />
    </CardItem>
  );
};

export default CardItemSkeleton;
