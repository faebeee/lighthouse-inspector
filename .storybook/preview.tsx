import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/system';
import { theme } from '../src/theme';
import { GlobalStyles } from '@mui/material';
import { THEME } from '../config.web';
import { ToastContainer } from 'react-toastify';

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (Story) => (<ThemeProvider theme={theme}>
        <GlobalStyles styles={{
          body: {
            minHeight: '100vh',
            padding: 0,
            margin: 0,
            backgroundColor: THEME.background
          },
          a: {
            textDecoration: 'none'
          }
        }
        } />
        <ToastContainer />
        <Story />
      </ThemeProvider>
    ) ]
};

export default preview;
