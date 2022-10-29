import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <Stack sx={{ width: '100%' }}>
            <Typography
                variant='h2'
                fontWeight={1000}
                sx={{
                    color: 'error.light',
                    paddingTop: '5vh',
                    textAlign: 'center',
                }}
            >
                ERROR 404
            </Typography>
            <Typography
                variant='h5'
                fontWeight={500}
                sx={{
                    color: 'warning.light',
                    paddingBottom: '5vh',
                    textAlign: 'center',
                }}
            >
                This link does not exist. Please navigate to{' '}
                <Link to='/home'>Home</Link> or another available link :D
            </Typography>
        </Stack>
    );
}
