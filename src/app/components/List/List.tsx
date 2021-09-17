import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';

import './List.css';

function List(props) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    field: '',
  });

  function handleClick() {
    setOpen(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTask(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleDialogSubmit() {
    setOpen(false);
    props.onAdd(task);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <StylesProvider injectFirst>
        <Fab size="large" onClick={handleClick} aria-label="add">
          <Add />
        </Fab>
      </StylesProvider>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Your Daily Tasks</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="field"
            id="name"
            label="Task..."
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default List;
