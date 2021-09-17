import List from 'app/components/List/List';
import { useState } from 'react';
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
import React from 'react';
import { useRef } from 'react';

export function HomePage() {
  const [task, setTask] = useState() as any;
  const [list, setList] = useState([]) as any;
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState('');

  function onAdd(task) {
    setList(prevList => {
      return [...prevList, task];
    });
  }

  function onDelete(id) {
    setList(prevList => {
      return list.filter((item, i) => {
        return i !== id;
      });
    });
  }

  function onUpdate(id, text) {
    setOpen(true);
    setUpdate(text);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleUpdate() {
    setList(() => {
      return list.map(l => {
        const { field } = l;
        if (field === update) return { ...l, field: task.field };
        else {
          return l;
        }
      });
    });
    setOpen(false);
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

  return (
    <>
      <Helmet>
        <title>To-Do List</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <h1 className="heading">ToDo List</h1>
      <List onAdd={onAdd} />
      <Display onUpdate={onUpdate} onDelete={onDelete} item={list} />
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
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
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
