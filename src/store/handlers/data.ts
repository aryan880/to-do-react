import { listActions } from 'app/pages/HomePage/slice';
import { call, put, all } from 'redux-saga/effects';
import {
  requestDeleteDataById,
  requestGetData,
  requestGetDataById,
  requestPostData,
  requestUpdateCheckBoxById,
  requestUpdateDataById,
  requestUpdateDestinationDnd,
  requestUpdateSourceDnd,
} from 'store/requests/data';

export function* handleGetData(action) {
  try {
    const response = yield call(requestGetData);
    const { data } = response;
    console.log('All Data is ', data);
    yield put(listActions.setData(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetDataById(action) {
  try {
    const response = yield call(() => requestGetDataById(action));
    const { data } = response;
    console.log(data);
    yield put(listActions.setData([data]));
  } catch (error) {
    console.log(error);
  }
}

export function* handlePostData(action) {
  try {
    const response = yield call(() => requestPostData(action));
    console.log(response);
    yield put(listActions.getData());
  } catch (error) {
    console.log(error);
  }
}

export function* handleDeleteDataById(action) {
  try {
    yield call(() => requestDeleteDataById(action));
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateDataById(action) {
  try {
    const response = yield call(() => requestUpdateDataById(action));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateCheckBoxById(action) {
  try {
    const response = yield call(() => requestUpdateCheckBoxById(action));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateDnd(action) {
  console.log(action);
  try {
    console.log('Lets update sort order');
    const response = yield all([
      call(() => requestUpdateSourceDnd(action)),
      call(() => requestUpdateDestinationDnd(action)),
    ]);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
