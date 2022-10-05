import * as selectors from '../selectors';
import { RootState } from 'types';
import { RepoErrorType } from '../types';
import { initialState } from '..';
import { Repo } from 'types/Repo';

describe('GithubRepoForm selectors', () => {
  let state: RootState = {
    users: {},
    githubRepoForm: {},
    theme: {},
  };

  beforeEach(() => {
    state = {
      users: {},
      githubRepoForm: {},
      theme: {},
    };
  });

  it('should select the initial state', () => {
    expect(selectors.selectUsers(state)).toEqual(initialState.users);
  });

  it('should select users', () => {
    const users = [];
    state = {
      users: { ...initialState, users },
    };
    expect(selectors.selectUsers(state)).toEqual(users);
  });

  it('should select users', () => {
    const users = [];
    state = {
      users: { ...initialState, users },
    };
    expect(selectors.selectUsers(state)).toEqual(users);
  });

  it('should select error', () => {
    const error = RepoErrorType.USER_NOT_FOUND;
    state = {
      users: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      users: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
