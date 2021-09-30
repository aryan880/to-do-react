import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';

import './List.css';
import { Alert, AlertTitle } from '@mui/material';
import { useListSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialogCondition, selectTask } from './slice/selectors';

export default function List(props) {
  const dispatch = useDispatch();
  const { actions } = useListSlice();
  const dialogState = useSelector(selectDialogCondition);
  const task = useSelector(selectTask);

  const changeTask = value => {
    dispatch(actions.addTask(value));
  };

  const openDialog = () => {
    dispatch(actions.openDialog());
  };

  const closeDialog = () => {
    dispatch(actions.closeDialog());
  };

  return (
    <>
      <StylesProvider injectFirst>
        {props.item.length === 0 ? (
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Click the button below to <strong>add tasks!</strong>
          </Alert>
        ) : (
          ''
        )}
        <Fab size="large" onClick={openDialog} aria-label="add">
          <Add />
        </Fab>
      </StylesProvider>
      <Dialog
        fullWidth
        maxWidth="md"
        open={dialogState}
        aria-labelledby="form-dialog-title"
        onClose={() => {
          closeDialog();
          changeTask('');
        }}
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Your Daily Tasks</DialogContentText>
          <TextField
            onKeyPress={e => {
              if (e.key === 'Enter' && task.field.length !== 0) {
                props.onAdd(task);
                changeTask('');
                closeDialog();
              }
            }}
            autoFocus
            margin="dense"
            name="field"
            id="name"
            label="Task..."
            type="text"
            fullWidth
            onChange={e => changeTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            id="cancel"
            onClick={() => {
              closeDialog();
              changeTask('');
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onAdd(task);
              changeTask('');
              closeDialog();
            }}
            color="primary"
            disabled={task.field.length !== 0 ? false : true}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
