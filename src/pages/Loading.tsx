import { Box, CircularProgress, Typography } from "@mui/material"

export default function Loading() {
    return (
        <Box className="flex flex-col items-center justify-center h-screen">
            <Typography variant="h1" className="text-white">Loading...</Typography>
            <CircularProgress />
        </Box>
    )
}