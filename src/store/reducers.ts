/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
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
} from 'app/components/List/ListTypes';

import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

const initialOpenState = {
  open: false,
};

const initialTask = {
  field: '',
};

const initialList = {
  list: [] as any,
};

const initialUpdateOpenState = {
  updateOpen: false,
};

const initialUpdateInfo = {
  id: '',
  text: '',
};

const dialogReducer = (state = initialOpenState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        open: true,
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

const taskReducer = (state = initialTask, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        field: action.payload,
      };
    case ADD_UPDATED_TASK:
      return {
        ...state,
        field: action.payload,
      };
    default:
      return state;
  }
};

const listReducer = (state = initialList, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case DELETE_LIST:
      return {
        ...state,
        list: state.list.filter((item, i) => {
          return i !== action.payload;
        }),
      };
    case UPDATE_LIST:
      return {
        ...state,
        list: state.list.map(l => {
          const { field } = l;
          if (field === action.payload[0]) {
            return { ...l, field: action.payload[1].field };
          } else {
            return l;
          }
        }),
      };
    default:
      return state;
  }
};

const updateDialogReducer = (state = initialUpdateOpenState, action) => {
  switch (action.type) {
    case OPEN_UPDATE_DIALOG:
      return {
        ...state,
        updateOpen: true,
      };
    case CLOSE_UPDATE_DIALOG:
      return {
        ...state,
        updateOpen: false,
      };
    default:
      return state;
  }
};

const updateInfoReducer = (state = initialUpdateInfo, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  return combineReducers({
    ...injectedReducers,
    dialog: dialogReducer,
    task: taskReducer,
    list: listReducer,
    update: updateInfoReducer,
    updateDialog: updateDialogReducer,
  });
}
