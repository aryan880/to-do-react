/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/types/injector-typings';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

// const initialOpenState = {
//   open: false,
// };

// const initialTask = {
//   field: '',
// };

// const initialList = {
//   list: [] as any,
// };

// const initialUpdateOpenState = {
//   updateOpen: false,
// };

// const initialUpdateInfo = {
//   id: '',
//   text: '',
// };

// const dialogReducer = (state = initialOpenState, action) => {
//   switch (action.type) {
//     case OPEN_DIALOG:
//       return {
//         ...state,
//         open: true,
//       };
//     case CLOSE_DIALOG:
//       return {
//         ...state,
//         open: false,
//       };
//     default:
//       return state;
//   }
// };

// const taskReducer = (state = initialTask, action) => {
//   switch (action.type) {
//     case ADD_TASK:
//       return {
//         ...state,
//         field: action.payload,
//       };
//     case ADD_UPDATED_TASK:
//       return {
//         ...state,
//         field: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// const listReducer = (state = initialList, action) => {
//   console.log(state);

//   let list;
//   switch (action.type) {
//     case ADD_LIST:
//       list = state.list;
//       let sortOrder = 1;

//       if (list.length > 0) {
//         const task = _.maxBy(list, todo => {
//           return todo.sortOrder;
//         });

//         sortOrder = task.sortOrder + 1;
//       }

//       return {
//         ...state,
//         list: [
//           ...state.list,
//           {
//             id: uuidv4(),
//             value: action.payload.field,
//             isDone: false,
//             sortOrder,
//           },
//         ],
//       };
//     case DELETE_LIST:
//       return {
//         ...state,
//         list: state.list.filter(item => {
//           return item.id !== action.payload.id;
//         }),
//       };
//     case UPDATE_LIST:
//       return {
//         ...state,
//         list: state.list.map(l => {
//           if (l.id === action.payload.id) {
//             return { ...l, value: action.payload.text };
//           } else {
//             return l;
//           }
//         }),
//       };
//     case DND_UPDATE_LIST:
//       list = _.cloneDeep(state.list);

//       const source = _.find(list, (item, index) => {
//         return index === action.payload.source;
//       });

//       const destination = _.find(list, (item, index) => {
//         return index === action.payload.destination;
//       });

//       list = list.map((l, index) => {
//         if (index === action.payload.source) {
//           return { ...l, sortOrder: destination.sortOrder };
//         }

//         if (index === action.payload.destination) {
//           return { ...l, sortOrder: source.sortOrder };
//         }
//         return l;
//       });

//       list = _.sortBy(list, i => i.sortOrder);

//       return {
//         ...state,
//         list,
//       };
//     case SET_CHECKED:
//       return {
//         ...state,
//         list: state.list.map(l => {
//           if (l.id === action.payload.id) {
//             return { ...l, isDone: action.payload.value };
//           } else {
//             return l;
//           }
//         }),
//       };
//     default:
//       return state;
//   }
// };

// const updateDialogReducer = (state = initialUpdateOpenState, action) => {
//   switch (action.type) {
//     case OPEN_UPDATE_DIALOG:
//       return {
//         ...state,
//         updateOpen: true,
//       };
//     case CLOSE_UPDATE_DIALOG:
//       return {
//         ...state,
//         updateOpen: false,
//       };
//     default:
//       return state;
//   }
// };

// const updateInfoReducer = (state = initialUpdateInfo, action) => {
//   switch (action.type) {
//     case UPDATE_INFO:
//       return {
//         ...state,
//         id: action.payload.id,
//         text: action.payload.text,
//       };
//     default:
//       return state;
//   }
// };

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
