import type { AppProps } from 'next/app'
import { GlobalStyles, createTheme } from "@mui/material";
import { ThemeProvider, } from "@mui/system";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#a8ff71',
        },
        secondary: {
            main: '#ee9378',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'rgba(107,107,107,0.4)',
                    // boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                    // backdropFilter: 'blur( 5.5px )',
                }
            }
        }
    }
});

export default function App({ Component, pageProps }: AppProps) {
    return <ThemeProvider theme={ theme }>
        <GlobalStyles styles={ {
            body: {
                minHeight: '100vh',
                backgroundImage: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                padding: 0,
                margin: 0,
            },
            a: {
                textDecoration: 'none',
            }
        } }/>
        <Component { ...pageProps } />
    </ThemeProvider>
}
