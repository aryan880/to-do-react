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

function List(props) {
  return (
    <div>
      <StylesProvider injectFirst>
        <Fab size="large" onClick={props.open} aria-label="add">
          <Add />
        </Fab>
      </StylesProvider>
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.condition}
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
            onChange={e => props.task(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onAdd();
              props.close();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => {
  console.log(state);
  return {
    condition: state.dialog.open,
    item: state.task,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    open: () => dispatch(openDialog()),
    close: () => dispatch(closeDialog()),
    task: e => dispatch(addTask(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
