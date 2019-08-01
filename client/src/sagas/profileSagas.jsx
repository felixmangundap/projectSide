import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import types from '../actions/actions';

export const fetchUsers = async () => {
  const url = 'http://localhost:9000/users/get';
  const response = await axios.get(url);
  return response.data;
};

function* fetchUsersSaga() {
  try {
    const data = yield call(fetchUsers);
    yield put({ type: types.usersFetch.success, data });
  } catch (error) {
    yield put({ type: types.usersFetch.error, error });
  }
}
export default function* profileSagas() {
  yield takeEvery(types.usersFetch.request, fetchUsersSaga);
}
