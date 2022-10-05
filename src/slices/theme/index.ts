import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { getThemeFromStorage } from 'styles';
import { ThemeKeyType, ThemeState } from './types';
import { selectTheme, selectThemeKey } from './selectors';
export const initialState: ThemeState = {
  selected: getThemeFromStorage() || 'system',
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeKeyType>) {
      state.selected = action.payload;
    },
  },
});

export const { actions: themeActions, reducer } = slice;

export const useThemeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);
  const themeKey = useSelector(selectThemeKey);

  const changeTheme = payload => dispatch(actions.changeTheme(payload));
  const { actions } = slice;
  return { changeTheme, theme, themeKey };
};
