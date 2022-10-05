import { call, takeLatest, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';
import { UserModel } from 'models';

export function* getUsers() {
  const requestURL = `http://localhost:3001/users`;

  try {
    const users: UserModel[] = yield call(request, requestURL);
    yield put(actions.usersLoaded(users));
  } catch (err: any) {
    console.log('=====> errors: ', err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* usersSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadUsers.type, getUsers);
}
