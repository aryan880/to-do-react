import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = state => state.listPage || initialState;

export const selectTask = createSelector(
  [selectDomain],
  listPageState => listPageState.task,
);

export const selectDialogCondition = createSelector(
  [selectDomain],
  listPageState => listPageState.dialogState,
);
