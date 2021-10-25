import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { PayloadAction } from '@reduxjs/toolkit';
import { homePageTypes } from './types';
import _ from 'lodash';

export const initialState: homePageTypes = {
  list: [],
  updateDialogState: false,
  task: { field: '' },
  info: { id: '', value: '' },
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    getData() {},
    setData(state, action: PayloadAction<any>) {
      console.log('Payload is', action.payload);
      return {
        ...state,
        list: [...action.payload],
      };
    },
    getDataById: {
      reducer: (state, action: PayloadAction<any>) => {
        state.list = state.list.filter(item => {
          return item.id === action.payload.id;
        });
      },
      prepare: id => {
        return { payload: { id } };
      },
    },

    // addList(state, action: PayloadAction<any>) {
    //   let sortOrder = 1;

    //   if (state.list.length > 0) {
    //     const task = _.maxBy(state.list, todo => {
    //       return todo.sortOrder;
    //     });

    //     sortOrder = task.sortOrder + 1;
    //   }
    //   state.list.push({
    //     id: uuidv4(),
    //     value: action.payload,
    //     isDone: false,
    //     sortOrder,
    //   });
    // },
    postData: {
      reducer: (state, action: PayloadAction<any>) => {
        console.log(action.payload);
      },
      prepare: (value, sortOrder) => {
        return { payload: { value, sortOrder } };
      },
    },

    deleteDataById(state, action: PayloadAction<any>) {
      console.log('Delete');
      console.log(action.payload);
      state.list = state.list.filter(item => {
        return item.id !== action.payload;
      });
    },

    updateDataById: {
      reducer: (state, action: PayloadAction<any>) => {
        state.list = state.list.map(l => {
          if (l.id === action.payload.id) {
            return { ...l, value: action.payload.value };
          } else {
            return l;
          }
        });
      },
      prepare: (id, value) => {
        return { payload: { id, value } };
      },
    },

    dndUpdateList: {
      reducer: (state, action: PayloadAction<any>) => {
        // const source = _.find(state.list, (item, index) => {
        //   return index === action.payload.sourceIndex;
        // });

        // const destination = _.find(state.list, (item, index) => {
        //   return index === action.payload.destinationIndex;
        // });

        state.list = state.list.map((l, index) => {
          if (index === action.payload.sourceIndex) {
            return { ...l, sortOrder: action.payload.destination.sortOrder };
          }

          if (index === action.payload.destinationIndex) {
            return { ...l, sortOrder: action.payload.source.sortOrder };
          }
          return l;
        });
        state.list = _.sortBy(state.list, i => i.sortOrder);
      },
      prepare: (destination, destinationIndex, source, sourceIndex) => {
        return {
          payload: { destination, destinationIndex, source, sourceIndex },
        };
      },
    },

    openUpdate(state) {
      state.updateDialogState = true;
    },

    closeUpdate(state) {
      state.updateDialogState = false;
    },

    updateCheckBoxById: {
      reducer: (state, action: PayloadAction<any>) => {
        state.list = state.list.map(l => {
          if (l.id === action.payload.id) {
            return { ...l, isDone: action.payload.value };
          } else {
            return l;
          }
        });
      },
      prepare: (id, value) => {
        return { payload: { id, value } };
      },
    },

    updateTask(state, action: PayloadAction<any>) {
      state.task.field = action.payload;
    },
    updateInfo: {
      reducer: (state, action: PayloadAction<any>) => {
        state.info.id = action.payload.id;
        state.info.value = action.payload.value;
      },
      prepare: (id, value) => {
        return { payload: { id, value } };
      },
    },
  },
});

export const { actions: listActions, reducer } = slice;

export const useHomeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
