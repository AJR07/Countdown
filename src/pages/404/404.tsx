import { Stack, Typography } from '@mui/material';

export default function PageNotFound() {
    return (
        <Stack>
            <Typography
                variant='h2'
                fontWeight={1000}
                className='horizontal-center'
                sx={{
                    color: 'secondary.light',
                    paddingTop: '5vh',
                    paddingBottom: '5vh',
                }}
            >
                This link does not exist.
            </Typography>
        </Stack>
    );
}
