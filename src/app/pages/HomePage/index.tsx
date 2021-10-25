import { useEffect } from 'react';
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
import _ from 'lodash';

export function HomePage(props) {
  const { actions } = useHomeSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.params.hasOwnProperty('id')) {
      dispatch(actions.getDataById(props.match.params.id));
    } else {
      dispatch(actions.getData());
      console.log('Calling get data');
      console.log('No params');
    }
  }, []);

  const updateDialogState = useSelector(selectUpdateDialogCondition);
  const info = useSelector(selectInfo);
  const list = useSelector(selectList);
  const task = useSelector(selectTask);

  console.log(props);

  const onAdd = task => {
    let sortOrder = 1;

    if (list.length > 0) {
      const task = _.maxBy(list, todo => {
        return todo.sortOrder;
      });

      sortOrder = task.sortOrder + 1;
    }
    dispatch(actions.postData(task.field, sortOrder));
  };

  const onUpdate = (id, value) => {
    dispatch(actions.openUpdate());
    dispatch(actions.updateInfo(id, value));
    dispatch(actions.updateTask(value));
  };

  const onDelete = id => {
    dispatch(actions.deleteDataById(id));
  };

  function handleUpdate() {
    dispatch(actions.updateDataById(info.id, task.field));
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
            dispatch(actions.updateCheckBoxById(id, checked));
          }}
          dndUpdateList={(destinationIndex, sourceIndex) => {
            const source = _.find(list, (item, index) => {
              return index === sourceIndex;
            });

            const destination = _.find(list, (item, index) => {
              return index === destinationIndex;
            });
            dispatch(
              actions.dndUpdateList(
                destination,
                destinationIndex,
                source,
                sourceIndex,
              ),
            );
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
