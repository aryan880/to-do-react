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

export const addTask = v => {
  return {
    type: ADD_TASK,
    payload: v,
  };
};

export const addUpdatedTask = v => {
  return {
    type: ADD_UPDATED_TASK,
    payload: v,
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

export const updateList = (id, text) => {
  return {
    type: UPDATE_LIST,
    payload: [id, text],
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
    payload: [id, text],
  };
};
