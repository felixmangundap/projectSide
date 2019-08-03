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

export const fetchUser = async (id) => {
  const url = `http://localhost:9000/users/get/${id}`;
  const response = await axios.get(url);
  return response.data;
};

export const createUser = async (user) => {
  const url = 'http://localhost:9000/users/create';
  const response = await axios.post(url, user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const url = `http://localhost:9000/users/update/${id}`;
  const response = await axios.patch(url, { user });
  return response.data;
};

export const deleteUser = async (id) => {
  const url = `http://localhost:9000/users/delete/${id}`;
  const response = await axios.delete(url);
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

function* fetchUserSaga(action) {
  const { id } = action.payload;
  try {
    const data = yield call(fetchUser, id);
    yield put({ type: types.userFetch.success, data });
  } catch (error) {
    yield put({ type: types.userFetch.error, error });
  }
}

function* createUserSaga(action) {
  const { user } = action.payload;
  try {
    const data = yield call(createUser, user);
    yield put({ type: types.userCreate.success, data });
  } catch (error) {
    yield put({ type: types.userCreate.error, error });
  }
}

function* updateUserSaga(action) {
  const { id, user } = action.payload;
  try {
    const data = yield call(updateUser, id, user);
    yield put({ type: types.userUpdate.success, data });
  } catch (error) {
    yield put({ type: types.userUpdate.error, error });
  }
}

function* deleteUserSaga(action) {
  const { id } = action.payload;
  try {
    const data = yield call(deleteUser, id);
    yield put({ type: types.userDelete.success, data });
  } catch (error) {
    yield put({ type: types.userDelete.error, error });
  }
}

export default function* profileSagas() {
  yield takeEvery(types.usersFetch.request, fetchUsersSaga);
  yield takeEvery(types.userFetch.request, fetchUserSaga);
  yield takeEvery(types.userCreate.request, createUserSaga);
  yield takeEvery(types.userUpdate.request, updateUserSaga);
  yield takeEvery(types.userDelete.request, deleteUserSaga);
}
