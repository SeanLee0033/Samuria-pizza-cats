import { NavLink, useLocation } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'space-between',
    },
    linkContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2, 0, 2),
    },
    link: {
      textDecoration: 'none',
      fontWeight: 700,
      color: 'white',
      fontSize: theme.typography.pxToRem(20),
      padding: theme.spacing(0, 2),
    },
    logo: {
      width: theme.typography.pxToRem(50),
    },
    logoText: {
      fontFamily: 'Metal Mania',
    },
  })
);

const Nav = (): JSX.Element | null => {
  const classes = useStyles();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <div className={classes.linkContainer}>
          <NavLink className={classes.link} to="/">
            <img
              alt="samurai-pizza-cats"
              className={classes.logo}
              src={'https://i.pinimg.com/564x/34/50/56/345056b367f0934aa86b5e21dee6f1de.jpg'}
            />
          </NavLink>
          <NavLink className={classes.link} to="/pizzas">
            Pizzas
          </NavLink>
          <NavLink className={classes.link} to="/toppings">
            Toppings
          </NavLink>
        </div>
        <h1 className={classes.logoText}>SAMURAI PIZZA CATS</h1>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
