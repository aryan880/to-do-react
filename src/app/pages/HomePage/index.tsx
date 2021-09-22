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
  addTask,
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
    props.updatedTask('');
    props.updateList(props.infoId, props.task.field);
    props.closeUpdate();
  }

  return (
    <>
      <Helmet>
        <title>To-Do List</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <h1 className="heading">ToDo List</h1>
      <List
        onAdd={() => {
          props.list(props.task);
          props.addTask('');
        }}
      />
      {props.listArray.length !== 0 ? (
        <Display
          onUpdate={(id, text) => {
            props.openUpdate();
            props.updateInfo(id, text);
            props.updatedTask(text);
          }}
          onDelete={id => props.delete(id)}
          item={props.item}
        />
      ) : (
        ''
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.updateDialog}
        aria-labelledby="form-dialog-title"
        onClose={() => {
          props.closeUpdate();
          props.updatedTask('');
        }}
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
            onChange={e => props.updatedTask(e.target.value)}
            defaultValue={props.infoText}
            onKeyPress={e => {
              if (e.key === 'Enter' && props.task.field.length !== 0) {
                handleUpdate();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.closeUpdate();
              props.updatedTask('');
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            disabled={props.task.field.length !== 0 ? false : true}
            onClick={handleUpdate}
            color="primary"
          >
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
    listArray: state.list.list,
    infoId: state.update.id,
    infoText: state.update.text,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    list: task => dispatch(addList(task)),
    delete: id => dispatch(deleteList(id)),
    openUpdate: () => dispatch(openUpdateDialog()),
    closeUpdate: () => dispatch(closeUpdateDialog()),
    addTask: v => dispatch(addTask(v)),
    updatedTask: v => dispatch(addUpdatedTask(v)),
    updateInfo: (id, text) => dispatch(updateInfo(id, text)),
    updateList: (updateInfo, task) => dispatch(updateList(updateInfo, task)),
  };
};

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

export { HomePageContainer };
