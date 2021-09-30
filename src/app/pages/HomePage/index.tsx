import List from 'app/pages/HomePage/components/List/List';
import { Helmet } from 'react-helmet-async';
import Display from 'app/pages/HomePage/components/Display/Display';
import './index.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHomeSlice } from './slice';
import {
  selectInfo,
  selectList,
  selectTask,
  selectUpdateDialogCondition,
} from './slice/selectors';

export function HomePage() {
  const { actions } = useHomeSlice();

  const dispatch = useDispatch();
  const updateDialogState = useSelector(selectUpdateDialogCondition);
  const info = useSelector(selectInfo);
  const list = useSelector(selectList);
  const task = useSelector(selectTask);

  console.log(task, info);

  const onAdd = task => {
    dispatch(actions.addList(task.field));
  };

  const onUpdate = (id, value) => {
    dispatch(actions.openUpdate());
    dispatch(actions.updateInfo(id, value));
    dispatch(actions.updateTask(value));
  };

  const onDelete = id => {
    dispatch(actions.deleteList(id));
  };

  function handleUpdate() {
    dispatch(actions.openUpdate());
    dispatch(actions.updateList(info.id, task.field));
    dispatch(actions.closeUpdate());
  }

  return (
    <>
      <Helmet>
        <title>To-Do List</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <h1 className="heading">ToDo List</h1>
      <List
        onAdd={task => {
          onAdd(task);
        }}
        item={list}
      />
      {list.length !== 0 ? (
        <Display
          onUpdate={(id, value) => {
            onUpdate(id, value);
          }}
          onDelete={id => {
            onDelete(id);
          }}
          item={list}
          checkBoxToggle={(id, checked) => {
            dispatch(actions.checkBoxToggle(id, checked));
          }}
          dndUpdateList={(destinationIndex, sourceIndex) => {
            dispatch(actions.dndUpdateList(destinationIndex, sourceIndex));
          }}
        />
      ) : (
        ''
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        open={updateDialogState}
        aria-labelledby="form-dialog-title"
        onClose={() => {
          dispatch(actions.closeUpdate());
          dispatch(actions.updateTask(''));
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
            onChange={e => dispatch(actions.updateTask(e.target.value))}
            defaultValue={info.value}
            onKeyPress={e => {
              if (e.key === 'Enter' && task.field.length !== 0) {
                handleUpdate();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(actions.closeUpdate());
              dispatch(actions.updateTask(''));
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            disabled={task.field.length !== 0 ? false : true}
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
