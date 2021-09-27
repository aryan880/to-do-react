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
  DND_UPDATE_LIST,
  OPEN_DIALOG,
  OPEN_UPDATE_DIALOG,
  SET_CHECKED,
  UPDATE_CHECKED,
  UPDATE_INFO,
  UPDATE_LIST,
} from 'app/components/List/ListTypes';

import { InjectedReducersType } from 'utils/types/injector-typings';
import { v4 as uuidv4 } from 'uuid';

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

const initialCheckState = {
  checked: [] as any,
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
      console.log(action.payload);
      return {
        ...state,
        list: state.list.map((l, index) => {
          if (index === action.payload[0]) {
            return { ...l, field: action.payload[1] };
          } else {
            return l;
          }
        }),
      };
    case DND_UPDATE_LIST:
      return {
        ...state,
        list: action.payload,
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
        id: action.payload[0],
        text: action.payload[1],
      };
    default:
      return state;
  }
};

const checkReducer = (state = initialCheckState, action) => {
  switch (action.type) {
    case SET_CHECKED:
      const currentIndex = state.checked.indexOf(action.payload);
      const newChecked = [...state.checked];
      if (currentIndex === -1) {
        newChecked.push(action.payload);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      return {
        ...state,
        checked: newChecked,
      };
    case UPDATE_CHECKED:
      return {
        ...state,
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
    checkBox: checkReducer,
  });
}
