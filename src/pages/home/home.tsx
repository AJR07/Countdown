import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Renders the home page - where there are cards that you can use to navigate to other pages.
 *
 * @export
 * @returns {*}
 */
export default function Home() {
    return (
        <Stack id='home' style={{ padding: '1vw' }} direction='column'>
            <Typography
                variant='h6'
                fontWeight={510}
                sx={{ color: 'primary.light' }}
            >
                Countdown
            </Typography>
        </Stack>
    );
}
