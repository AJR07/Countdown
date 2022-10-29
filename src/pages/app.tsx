import {
    createTheme,
    Grid,
    responsiveFontSizes,
    ThemeProvider,
    Typography,
} from '@mui/material';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { themeOptions } from '../components/theme';
import Home from './home/home';

export default function App() {
    return (
        <AppSettings>
            <Typography
                variant='caption'
                fontWeight={1000}
                fontSize={15}
                sx={{
                    position: 'absolute',
                    color: 'primary.main',
                    marginLeft: '90vw',
                    marginTop: '95vh',
                }}
            >
                Made by: <a href='https://github.com/AJR07/countdown'>AJR07</a>
            </Typography>
        </AppSettings>
    );
}

interface AppSettingsProps {
    children: JSX.Element[] | JSX.Element;
}

function AppSettings(props: AppSettingsProps) {
    return (
        <>
            <BrowserRouter>
                <ParallaxProvider>
                    <ThemeProvider
                        theme={responsiveFontSizes(
                            createTheme(themeOptions['blue'])
                        )}
                    >
                        <Grid
                            container
                            direction='row'
                            sx={{ height: '100vh' }}
                        >
                            {props.children}
                        </Grid>
                    </ThemeProvider>
                </ParallaxProvider>
            </BrowserRouter>
        </>
    );
}
