import { listActions } from 'app/pages/HomePage/slice';
import { takeLatest } from 'redux-saga/effects';
import {
  handleDeleteDataById,
  handleGetData,
  handleGetDataById,
  handlePostData,
  handleUpdateCheckBoxById,
  handleUpdateDataById,
  handleUpdateDnd,
} from 'store/handlers/data';

export function* watcherSaga() {
  yield takeLatest(listActions.getData.type, handleGetData);
  yield takeLatest(listActions.getDataById.type, handleGetDataById);
  yield takeLatest(listActions.postData.type, handlePostData);
  yield takeLatest(listActions.deleteDataById.type, handleDeleteDataById);
  yield takeLatest(listActions.updateDataById.type, handleUpdateDataById);
  yield takeLatest(
    listActions.updateCheckBoxById.type,
    handleUpdateCheckBoxById,
  );
  yield takeLatest(listActions.dndUpdateList.type, handleUpdateDnd);
}
