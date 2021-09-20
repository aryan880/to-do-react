import {
  ADD_LIST,
  ADD_TASK,
  ADD_UPDATED_TASK,
  CLOSE_DIALOG,
  CLOSE_UPDATE_DIALOG,
  DELETE_LIST,
  OPEN_DIALOG,
  OPEN_UPDATE_DIALOG,
  UPDATE_INFO,
  UPDATE_LIST,
} from './ListTypes';

export const openDialog = () => {
  return {
    type: OPEN_DIALOG,
  };
};

export const closeDialog = () => {
  return {
    type: CLOSE_DIALOG,
  };
};

export const addTask = e => {
  console.log(e);
  return {
    type: ADD_TASK,
    payload: e.target.value,
  };
};

export const addUpdatedTask = e => {
  console.log(e);
  return {
    type: ADD_UPDATED_TASK,
    payload: e.target.value,
  };
};

export const addList = task => {
  return {
    type: ADD_LIST,
    payload: task,
  };
};

export const deleteList = id => {
  return {
    type: DELETE_LIST,
    payload: id,
  };
};

export const updateList = (text, task) => {
  return {
    type: UPDATE_LIST,
    payload: [text, task],
  };
};

export const openUpdateDialog = () => {
  return {
    type: OPEN_UPDATE_DIALOG,
  };
};

export const closeUpdateDialog = () => {
  return {
    type: CLOSE_UPDATE_DIALOG,
  };
};

export const updateInfo = (id, text) => {
  return {
    type: UPDATE_INFO,
    payload: text,
  };
};
