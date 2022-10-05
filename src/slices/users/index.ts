import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';

import { usersSaga } from './saga';
import { UsersState, RepoErrorType } from './types';
import { selectLoading, selectError, selectUsers } from './selectors';
import { UserModel } from 'models';

export const initialState: UsersState = {
  loading: false,
  error: null,
  users: [],
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadUsers: state => {
      state.loading = true;
      state.error = null;
      state.users = [];
    },
    usersLoaded: (state, action: PayloadAction<UserModel[]>) => {
      state.loading = false;
      state.loading = true;
      state.error = null;
      state.users = action.payload;
    },
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: usersSaga });
  const { actions } = slice;
  const dispatch = useDispatch();

  const loadUsers = () => dispatch(actions.loadUsers());

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const users = useSelector(selectUsers);

  return {
    loadUsers,
    isLoading,
    error,
    users,
  };
};
