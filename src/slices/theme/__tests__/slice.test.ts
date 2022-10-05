import * as slice from 'slices/theme';
import { ThemeState, ThemeKeyType } from 'slices/theme/types';
import { RootState } from 'types';
import { themes } from 'styles';
import { DefaultTheme } from 'styled-components';
import { selectTheme, selectThemeKey } from '../selectors';

describe('theme slice', () => {
  let state: ThemeState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should changeTheme', () => {
    expect(
      slice.reducer(state, slice.themeActions.changeTheme('dark')),
    ).toEqual<ThemeState>({ selected: 'dark' });
  });

  describe('selectors', () => {
    it('selectTheme', () => {
      let state: RootState = {};
      expect(selectTheme(state)).toEqual<DefaultTheme>(themes.light);
      state = {
        theme: { selected: 'system' },
      };
      expect(selectTheme(state)).toEqual<DefaultTheme>(themes.light);

      state = {
        theme: { selected: 'dark' },
      };
      expect(selectTheme(state)).toEqual<DefaultTheme>(themes.dark);
    });

    it('selectThemeKey', () => {
      let state: RootState = {};
      expect(selectThemeKey(state)).toEqual<ThemeKeyType>(
        slice.initialState.selected,
      );

      state = {
        theme: { selected: 'system' },
      };
      expect(selectThemeKey(state)).toEqual<ThemeKeyType>(
        state.theme!.selected,
      );
    });
  });
});
