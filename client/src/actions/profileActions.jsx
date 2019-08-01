const actionTypes = {};

actionTypes.userCreate = {
  request: 'userCreateRequest',
  success: 'userCreateSuccess',
  error: 'userCreateError',
};

actionTypes.usersFetch = {
  request: 'usersFetchRequest',
  success: 'usersFetchSuccess',
  error: 'usersFetchError',
};

actionTypes.userFetch = {
  request: 'userFetchRequest',
  success: 'userFetchSuccess',
  error: 'userFetchError',
};

actionTypes.userUpdate = {
  request: 'userUpdateRequest',
  success: 'userUpdateSuccess',
  error: 'userUpdateError',
};

actionTypes.userDelete = {
  request: 'userDeleteRequest',
  success: 'userDeleteSuccess',
  error: 'userDeleteError',
};

export default actionTypes;
