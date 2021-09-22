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
import { connect } from 'react-redux';
import { addTask, closeDialog, openDialog } from './ListActions';
import { Alert, AlertTitle } from '@mui/material';

function List(props) {
  return (
    <>
      <StylesProvider injectFirst>
        {props.listArray.length === 0 ? (
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Click the button below to <strong>add tasks!</strong>
          </Alert>
        ) : (
          ''
        )}
        <Fab size="large" onClick={props.open} aria-label="add">
          <Add />
        </Fab>
      </StylesProvider>
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.condition}
        aria-labelledby="form-dialog-title"
        onClose={() => {
          props.close();
          props.task('');
        }}
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Your Daily Tasks</DialogContentText>
          <TextField
            onKeyPress={e => {
              if (e.key === 'Enter' && props.item.field.length !== 0) {
                props.onAdd();
                props.task('');
                props.close();
              }
            }}
            autoFocus
            margin="dense"
            name="field"
            id="name"
            label="Task..."
            type="text"
            fullWidth
            onChange={e => props.task(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            id="cancel"
            onClick={() => {
              props.close();
              props.task('');
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onAdd();
              props.task('');
              props.close();
            }}
            color="primary"
            disabled={props.item.field.length !== 0 ? false : true}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
const mapStateToProps = state => {
  console.log(state.task.field.length);
  return {
    condition: state.dialog.open,
    item: state.task,
    listArray: state.list.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    open: () => dispatch(openDialog()),
    close: () => dispatch(closeDialog()),
    task: v => dispatch(addTask(v)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
