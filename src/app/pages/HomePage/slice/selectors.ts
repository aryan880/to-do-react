import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = state => state.homePage || initialState;

export const selectTask = createSelector(
  [selectDomain],
  homePageState => homePageState.task,
);

export const selectList = createSelector(
  [selectDomain],
  homePageState => homePageState.list,
);

export const selectUpdateDialogCondition = createSelector(
  [selectDomain],
  homePageState => homePageState.updateDialogState,
);

export const selectInfo = createSelector(
  [selectDomain],
  homePageState => homePageState.info,
);
