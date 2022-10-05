import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '..';

import { usersSaga, getUsers } from '../saga';
import { RepoErrorType } from '../types';

describe('getUsers Saga', () => {
  let username: any;
  let users: any;
  let getUsersIterator: ReturnType<typeof getUsers>;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getUsersIterator = getUsers();
    const delayDescriptor = getUsersIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getUsersIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if username is empty', () => {
    username = '';
    const putDescriptor = getUsersIterator.next(username).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USERNAME_EMPTY)),
    );

    const iteration = getUsersIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    username = 'test';
    users = [
      {
        id: 1,
        email: 'dainhanphan.dev@yopmail.com',
        password: '12345678q',
        name: 'Dai Nhan Phan',
        birthday: '12/01/1990',
      },
    ];

    const requestDescriptor = getUsersIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUsersIterator.next(users).value;
    expect(putDescriptor).toEqual(put(slice.actions.usersLoaded(users)));
  });

  it('should dispatch the user not found error', () => {
    username = 'test';

    const requestDescriptor = getUsersIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUsersIterator.throw({
      response: { status: 404 },
    }).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USER_NOT_FOUND)),
    );
  });
  it('should dispatch the user has no repo error', () => {
    username = 'test';
    users = [];

    const requestDescriptor = getUsersIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUsersIterator.next(users).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USER_HAS_NO_REPO)),
    );
  });
  it('should dispatch the github rate limit error', () => {
    username = 'test';

    const requestDescriptor = getUsersIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUsersIterator.throw(
      new Error('Failed to fetch'),
    ).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT)),
    );
  });

  it('should dispatch the response error', () => {
    username = 'test';

    const requestDescriptor = getUsersIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getUsersIterator.throw(new Error('some error')).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('githubRepoFormSaga Saga', () => {
  const githubRepoFormIterator = usersSaga();
  it('should start task to watch for loadRepos action', () => {
    const takeLatestDescriptor = githubRepoFormIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.loadUsers.type, getUsers),
    );
  });
});
