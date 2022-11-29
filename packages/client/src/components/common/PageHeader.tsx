import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    margin: theme.spacing(2, 0, 2),
    fontSize: theme.typography.pxToRem(24),
    textTransform: 'capitalize',
  },
}));

interface PageHeaderProps {
  pageHeader: string;
}

const PageHeader = ({ pageHeader }: PageHeaderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h1>{pageHeader}</h1>
    </div>
  );
};

export default PageHeader;
