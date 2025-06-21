"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Typography, Box, ThemeProvider, createTheme, CssBaseline, Fab } from "@mui/material"
import { PlayArrow, Security } from "@mui/icons-material"
import PlayerSlider from "../components/Slider"
import CounterControl from "../components/CounterControl"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#667eea",
        },
        secondary: {
            main: "#4ecdc4",
        },
        error: {
            main: "#ff6b6b",
        },
        background: {
            default: "#0a0a0a",
            paper: "rgba(255,255,255,0.05)",
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
})

export default function UndercoverHomePage() {
    const [totalPlayers, setTotalPlayers] = useState(6)
    const [undercovers, setUndercovers] = useState(1)
    const [mrWhite, setMrWhite] = useState(1)
    const navigate = useNavigate()

    const maxSpecialRoles = Math.floor(totalPlayers / 2)
    const handleUndercoverChange = (increment: boolean) => {
        if (increment && undercovers + mrWhite < maxSpecialRoles) {
            setUndercovers((prev) => prev + 1)
        } else if (!increment && undercovers > 0) {
            // Prevent both undercover and mr.white from being 0
            if (!(undercovers === 1 && mrWhite === 0)) {
                setUndercovers((prev) => prev - 1)
            }
        }
    }

    const handleMrWhiteChange = (increment: boolean) => {
        if (increment && undercovers + mrWhite < maxSpecialRoles) {
            setMrWhite((prev) => prev + 1)
        } else if (!increment && mrWhite > 0) {
            // Prevent both undercover and mr.white from being 0
            if (!(mrWhite === 1 && undercovers === 0)) {
                setMrWhite((prev) => prev - 1)
            }
        }
    }

    const handleStartGame = () => {
        navigate("/game")
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                className="min-h-screen relative overflow-hidden"
                sx={{
                    background: `
                radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.2) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
            `,
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 98px,
                    rgba(255,255,255,0.02) 100px
                ),
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 98px,
                    rgba(255,255,255,0.02) 100px
                )
            `,
                        pointerEvents: "none",
                    },
                }}
            >
                <Container maxWidth="md" className="relative z-10 py-8">
                    <Box className="space-y-12">
                        {/* Header with Logo and Title */}
                        <Box className="text-center space-y-6">
                            {/* <SpyLogo /> */}
                            <Typography
                                variant="h1"
                                className="font-bold tracking-wider text-white"
                                sx={{
                                    fontSize: { xs: "3rem", md: "5rem" },
                                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                                }}
                            >
                                UNDERCOVER
                            </Typography>
                            <Typography
                                variant="h6"
                                className="text-gray-300 tracking-wide"
                                sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
                            >
                                🕵️ The Ultimate Deception Game 🕵️
                            </Typography>
                        </Box>

                        {/* Player Selection */}
                        <PlayerSlider value={totalPlayers} onChange={setTotalPlayers} min={3} max={12} />

                        {/* Game Formula */}
                        <Box className="text-center py-4">
                            <Typography
                                variant="h5"
                                className="text-white font-medium"
                                sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
                            >
                                Number of Civilians = {totalPlayers - (undercovers + mrWhite)}
                            </Typography>
                        </Box>

                        {/* Role Counters */}
                        <Box className="space-y-12">
                            <CounterControl
                                label="🎭 Number of Undercovers"
                                value={undercovers}
                                onIncrement={() => handleUndercoverChange(true)}
                                onDecrement={() => handleUndercoverChange(false)}
                                min={0}
                                max={maxSpecialRoles - mrWhite}
                                color="primary"
                            />

                            <CounterControl
                                label="🤵 Number of Mr. White"
                                value={mrWhite}
                                onIncrement={() => handleMrWhiteChange(true)}
                                onDecrement={() => handleMrWhiteChange(false)}
                                min={0}
                                max={maxSpecialRoles - undercovers}
                                color="error"
                            />
                        </Box>

                        {/* Start Game Button */}
                        <Box className="text-center pt-8">
                            <Fab
                                variant="extended"
                                size="large"
                                className="px-12 py-4"
                                sx={{
                                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                                    color: "white",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                                    "&:hover": {
                                        background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
                                        boxShadow: "0 12px 40px rgba(102, 126, 234, 0.6)",
                                        transform: "translateY(-2px)",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                                onClick={handleStartGame}
                            >
                                <PlayArrow className="mr-2" />
                                Start Mission
                            </Fab>
                        </Box>

                        {/* Game Stats */}
                        {/* Game Stats */}
                        <Box
                            className="text-center space-y-3 p-6 rounded-2xl"
                            sx={{
                                background: "rgba(0,0,0,0.2)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}
                        >
                            <Box className="flex justify-center items-center space-x-2 mb-4">
                                <Security className="text-yellow-400" />
                                <Typography variant="h6" className="text-yellow-400 font-bold">
                                    Mission Briefing
                                </Typography>
                            </Box>
                            <Box className="flex justify-center items-center space-x-6 flex-wrap">
                                <Typography variant="body1" className="text-gray-300">
                                    <strong className="text-green-400">{totalPlayers - (undercovers + mrWhite)}</strong> Innocent
                                    Civilians
                                </Typography>
                                <Typography variant="body1" className="text-gray-300">
                                    •
                                </Typography>
                                <Typography variant="body1" className="text-gray-300">
                                    <strong className="text-blue-400">{undercovers}</strong> Undercover Agent
                                    {undercovers !== 1 ? "s" : ""}
                                </Typography>
                                <Typography variant="body1" className="text-gray-300">
                                    •
                                </Typography>
                                <Typography variant="body1" className="text-gray-300">
                                    <strong className="text-red-400">{mrWhite}</strong> Mr. White
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
