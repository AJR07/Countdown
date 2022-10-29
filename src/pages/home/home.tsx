import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <Stack
            id='home'
            style={{ padding: '1vw', width: '100%' }}
            direction='column'
        >
            <Stack direction='row' justifyContent='center' spacing={1}>
                <motion.img
                    src='/logo.png'
                    style={{ height: '7.5vh' }}
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, repeatDelay: 1 }}
                ></motion.img>
                <Typography
                    variant='h2'
                    fontWeight={510}
                    sx={{ color: 'primary.light' }}
                >
                    Countdown
                </Typography>
            </Stack>
            <Typography
                    variant='h5'
                    fontWeight={510}
                    sx={{ color: 'warning.dark', textAlign: 'center' }}
                >
                    Time is ticking...
            </Typography>
        </Stack>
    );
}
