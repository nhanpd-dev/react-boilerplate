import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.users || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  users => users.loading,
);

export const selectError = createSelector([selectDomain], users => users.error);

export const selectUsers = createSelector([selectDomain], users => users.users);
