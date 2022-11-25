import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@mui/system";
import { GlobalStyles, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7aeeff',
        },
        secondary: {
            main: '#ffe290',
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return <ThemeProvider theme={ theme }>
        <GlobalStyles styles={ { body: { background: '#fff' } } }/>
        <Component { ...pageProps } />
    </ThemeProvider>
}
