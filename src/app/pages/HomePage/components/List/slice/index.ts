import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { listStateTypes } from './types';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: listStateTypes = {
  dialogState: false,
  task: { field: '' },
};

interface Item {
  value: string;
}

const slice = createSlice({
  name: 'listPage',
  initialState,
  reducers: {
    openDialog(state) {
      state.dialogState = true;
    },

    closeDialog(state) {
      state.dialogState = false;
    },
    addTask: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.task.field = action.payload.value;
      },
      prepare: value => {
        return { payload: { value } };
      },
    },
  },
});

export const { actions: listActions, reducer } = slice;

export const useListSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
