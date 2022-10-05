import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useThemeSlice } from 'slices';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  const { theme } = useThemeSlice();

  return (
    <OriginalThemeProvider theme={theme}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
