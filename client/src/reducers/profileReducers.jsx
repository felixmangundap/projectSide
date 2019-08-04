import types from '../actions/actions';

export const initialState = {
  error: '',
  message: '',
  user: {},
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.userFetch.success: {
      const { user } = action.data;
      return {
        user,
      };
    }
    case types.userFetch.error: {
      const { error } = action.data;
      return {
        error,
      };
    }
    case types.usersFetch.success: {
      const { users } = action.data;
      return {
        users,
      };
    }
    case types.usersFetch.error: {
      const { error } = action.data;
      return {
        error,
      };
    }
    case types.userCreate.success: {
      const { message } = action.data;
      return {
        message,
      };
    }
    case types.userCreate.error: {
      const { error } = action.data;
      return {
        error,
      };
    }
    case types.userUpdate.success: {
      const { message } = action.data;
      return {
        message,
      };
    }
    case types.userUpdate.error: {
      const { error } = action.data;
      return {
        error,
      };
    }
    case types.userDelete.success: {
      const { message } = action.data;
      return {
        message,
      };
    }
    case types.userDelete.error: {
      const { error } = action.data;
      return {
        error,
      };
    }
    default:
      return state;
  }
};

export const withState = state => ({
  getProfile: () => state.user,
  getUsers: () => state.users,
});
