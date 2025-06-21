import { Box, Typography } from "@mui/material"

// A component that displays the summary of the roles
// civilians: The number of civilians
// undercovers: The number of undercovers
// mrWhite: The number of mrWhite


export default function RoleSummary({ civilians, undercovers, mrWhite }: { civilians: number, undercovers: number, mrWhite: number }) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap={2} // replaces space-x-6
        >
            <Typography variant="body1" sx={{ color: 'gray.300' }}>
                <Box component="strong" sx={{ color: 'success.main' }}>{civilians}</Box> Innocent Civilians
            </Typography>

            <Typography variant="body1" sx={{ color: 'gray.300' }}>
                •
            </Typography>

            <Typography variant="body1" sx={{ color: 'gray.300' }}>
                <Box component="strong" sx={{ color: 'info.light' }}>{undercovers}</Box> Undercover Agent
                {undercovers !== 1 ? 's' : ''}
            </Typography>

            <Typography variant="body1" sx={{ color: 'gray.300' }}>
                •
            </Typography>

            <Typography variant="body1" sx={{ color: 'gray.300' }}>
                <Box component="strong" sx={{ color: 'error.light' }}>{mrWhite}</Box> Mr. White
            </Typography>
        </Box>
    )
}