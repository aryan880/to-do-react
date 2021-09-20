import List from 'app/components/List/List';
import { Helmet } from 'react-helmet-async';
import Display from 'app/components/Display/Display';
import './index.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  addList,
  addUpdatedTask,
  closeUpdateDialog,
  deleteList,
  openUpdateDialog,
  updateInfo,
  updateList,
} from 'app/components/List/ListActions';

function HomePage(props) {
  function handleUpdate() {
    props.openUpdate();
    props.updateList(props.updatedText, props.task);
    props.closeUpdate();
  }

  return (
    <>
      <Helmet>
        <title>To-Do List</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <h1 className="heading">ToDo List</h1>
      <List onAdd={() => props.list(props.task)} />
      <Display
        onUpdate={(id, text) => {
          props.openUpdate();
          props.updateInfo(id, text);
        }}
        onDelete={id => props.delete(id)}
        item={props.item}
      />
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.updateDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Your Daily Tasks</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="field"
            id="name"
            label="Task..."
            type="text"
            fullWidth
            onChange={e => props.updatedTask(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeUpdate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
const mapStateToProps = state => {
  console.log(state);
  return {
    task: state.task,
    item: state.list.list,
    updateDialog: state.updateDialog.updateOpen,
    updatedText: state.update.text,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    list: task => dispatch(addList(task)),
    delete: id => dispatch(deleteList(id)),
    openUpdate: () => dispatch(openUpdateDialog()),
    closeUpdate: () => dispatch(closeUpdateDialog()),
    updatedTask: e => dispatch(addUpdatedTask(e)),
    updateInfo: (id, text) => dispatch(updateInfo(id, text)),
    updateList: (updateInfo, task) => dispatch(updateList(updateInfo, task)),
  };
};

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

export { HomePageContainer };
