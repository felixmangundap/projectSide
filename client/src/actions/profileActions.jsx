import { createAction } from 'redux-actions';

const actionTypes = {};

actionTypes.userCreate = {
  request: createAction('userCreateRequest'),
  success: createAction('userCreateSuccess'),
  error: createAction('userCreateError'),
};

actionTypes.usersFetch = {
  request: createAction('usersFetchRequest'),
  success: createAction('usersFetchSuccess'),
  error: createAction('usersFetchError'),
};

actionTypes.userFetch = {
  request: createAction('userFetchRequest'),
  success: createAction('userFetchSuccess'),
  error: createAction('userFetchError'),
};

actionTypes.userUpdate = {
  request: createAction('userUpdateRequest'),
  success: createAction('userUpdateSuccess'),
  error: createAction('userUpdateError'),
};

actionTypes.userDelete = {
  request: createAction('userDeleteRequest'),
  success: createAction('userDeleteSuccess'),
  error: createAction('userDeleteError'),
};

export default actionTypes;
