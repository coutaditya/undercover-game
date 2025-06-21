// A component that allows the user to increment or decrement a counter

"use client"

import { IconButton, Typography, Box, Paper } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

// An interface that defines the props for the CounterControl component
// label: The label of the counter
// value: The current value of the counter
// onIncrement: A function that is called when the increment button is clicked
// onDecrement: A function that is called when the decrement button is clicked
// min: The minimum value of the counter
// max: The maximum value of the counter
// color: The color of the counter
interface CounterControlProps {
    label: string
    value: number
    onIncrement: () => void
    onDecrement: () => void
    min?: number
    max?: number
    color?: "primary" | "secondary" | "error"
}


export default function CounterControl({
    label,
    value,
    onIncrement,
    onDecrement,
    min = 0,
    max = 10,
    color = "primary",
}: CounterControlProps) {
    const getColorScheme = () => {
        switch (color) {
            case "error":
                return {
                    bg: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
                    shadow: "0 8px 32px rgba(255, 107, 107, 0.3)",
                }
            case "secondary":
                return {
                    bg: "linear-gradient(135deg, #4ecdc4, #44a08d)",
                    shadow: "0 8px 32px rgba(78, 205, 196, 0.3)",
                }
            default:
                return {
                    bg: "linear-gradient(135deg, #667eea, #764ba2)",
                    shadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                }
        }
    }

    const colorScheme = getColorScheme()

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography
                variant="h6"
                className="text-white font-bold tracking-wide text-center"
                sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
                {label}
            </Typography>

            <Box className="flex items-center space-x-4">
                <Paper
                    elevation={8}
                    sx={{
                        background: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        width: 52,
                        height: 52,
                    }}
                >
                    <IconButton
                        onClick={onDecrement}
                        disabled={value <= min}
                        className="text-white hover:bg-white/20"
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            "&:disabled": {
                                color: "rgba(255,255,255,0.3)",
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        <ChevronLeft fontSize="large" />
                    </IconButton>
                </Paper>

                <Box
                    className="w-16 h-16 rounded-full flex items-center justify-center relative"
                    sx={{
                        background: colorScheme.bg,
                        boxShadow: colorScheme.shadow,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: "-2px",
                            borderRadius: "50%",
                            background: "linear-gradient(45deg, rgba(255,255,255,0.3), transparent)",
                            zIndex: -1,
                        },
                    }}
                >
                    <Typography variant="h4" className="text-white font-bold" sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                        {value}
                    </Typography>
                </Box>

                <Paper
                    elevation={8}
                    sx={{
                        background: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        width: 52,
                        height: 52,
                    }}
                >
                    <IconButton
                        onClick={onIncrement}
                        disabled={value >= max}
                        className="text-white hover:bg-white/20"
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            "&:disabled": {
                                color: "rgba(255,255,255,0.3)",
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </Paper>
            </Box>
        </Box>
    )
}
