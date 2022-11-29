import React from 'react';
import { Field, Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import {
  Backdrop,
  createStyles,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Theme,
  Grid,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { Topping } from '../../types';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import makePizzaImage from '../../assets/img/default-pizza.jpeg';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 3, 2),
      width: '420px',
    },
    image: {
      borderRadius: '5px',
      height: '300px',
      width: '100%',
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0),
        width: '100%',
        display: 'flex',
      },
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  imgSrc: yup.string().required('imgSrc is required'),
  toppingIds: yup.array().required('toppings are required'),
});
const PizzaModal = ({ selectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();
  const { data } = useQuery(GET_TOPPINGS);

  const allToppings: Topping[] = data?.toppings;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(): void => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <img
            className={classes.image}
            data-testid={`pizza-image-${selectedPizza?.imgSrc}`}
            src={selectedPizza ? selectedPizza.imgSrc : makePizzaImage}
          ></img>
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: selectedPizza?.id,
              name: selectedPizza?.name,
              description: selectedPizza?.description,
              imgSrc: selectedPizza?.imgSrc,
              toppingIds: selectedPizza?.toppings.map((topping: any) => topping.id),
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {}}
          >
            {({ values, handleChange, handleBlur, touched, errors, isValid }) => (
              <Form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="name-input"
                  label="Pizza Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  id="description-input"
                  label="Pizza Description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField
                  id="name-input"
                  label="Pizza Image"
                  name="imgSrc"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.imgSrc}
                  error={touched.imgSrc && Boolean(errors.imgSrc)}
                  helperText={touched.imgSrc && errors.imgSrc}
                />

                <Grid container spacing={0}>
                  {allToppings.map((topping) => {
                    return (
                      <Grid item xs={4}>
                        <Field key={topping.id} type="checkbox" name="toppingIds" value={topping.id} />
                        {topping.name}
                      </Grid>
                    );
                  })}
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <IconButton
                      edge="end"
                      aria-label="update"
                      type="button"
                      color="inherit"
                      onClick={(): void => {
                        values?.id ? onUpdatePizza(values) : onCreatePizza(values);
                        setOpen(false);
                      }}
                      disabled={!isValid}
                    >
                      <Button variant="contained">Submit</Button>
                    </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      type="button"
                      onClick={(): void => {
                        onDeletePizza(values);
                        setOpen(false);
                      }}
                    >
                      {selectedPizza && <Button variant="contained">Delete</Button>}
                    </IconButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;
