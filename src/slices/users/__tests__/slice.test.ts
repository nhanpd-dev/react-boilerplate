import * as slice from '..';
import { ContainerState, RepoErrorType } from '../types';

describe('Users slice', () => {
  let state: ContainerState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should handle repoError', () => {
    const repoError = RepoErrorType.USER_NOT_FOUND;
    expect(
      slice.reducer(state, slice.actions.repoError(repoError)),
    ).toEqual<ContainerState>({
      ...slice.initialState,
      error: repoError,
    });
  });
});
