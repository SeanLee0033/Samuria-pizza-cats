import React from 'react';
import { AddCircle, Delete } from '@material-ui/icons';
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
} from '@material-ui/core';

import useToppingMutations from '../../hooks/topping/use-topping-mutations';

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
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

interface ToppingModalProps {
  selectedTopping?: any;
  setSelectedTopping: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToppingModal = ({ selectedTopping, setSelectedTopping, open, setOpen }: ToppingModalProps): JSX.Element => {
  const classes = useStyles();

  const { onCreateTopping, onDeleteTopping, onUpdateTopping } = useToppingMutations();

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
          <h2>{selectedTopping ? 'Edit' : 'Add'} Topping</h2>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="name-input"
              label="Topping Name"
              defaultValue={selectedTopping?.name}
              onChange={(event): void => setSelectedTopping({ ...selectedTopping, name: event.target.value })}
            />
            <TextField
              id="price-input"
              label="Topping Price in Cents"
              type="number"
              defaultValue={selectedTopping?.priceCents}
              onChange={(event): void =>
                setSelectedTopping({ ...selectedTopping, priceCents: parseInt(event.target.value) })
              }
            />
            <IconButton
              edge="end"
              aria-label="update"
              type="button"
              onClick={(): void => {
                selectedTopping?.id ? onUpdateTopping(selectedTopping) : onCreateTopping(selectedTopping);
                setOpen(false);
              }}
            >
              <AddCircle />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              type="button"
              onClick={(): void => {
                onDeleteTopping(selectedTopping);
                setOpen(false);
              }}
            >
              <Delete />
            </IconButton>
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ToppingModal;
