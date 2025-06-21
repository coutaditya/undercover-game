import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Typography, Box, ThemeProvider, createTheme, CssBaseline, Fab } from "@mui/material"
import { PlayArrow, Security } from "@mui/icons-material"
import PlayerSlider from "../components/Slider"
import CounterControl from "../components/CounterControl"
import RoleSummary from "../components/Summary"
import Header from "../components/Header"

const MAX_PLAYERS = 20
const MIN_PLAYERS = 3

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
        fontFamily: '"Paralucent-light", "Roboto", "Helvetica", "Arial", sans-serif',
    },
})

interface HomepageProps {
    totalPlayers?: number
    undercovers?: number
    mrWhite?: number
    setTotalPlayers: (value: number) => void
    setUndercovers: (value: number) => void
    setMrWhite: (value: number) => void
}   

export function Homepage({totalPlayers = 6, undercovers = 1, mrWhite = 1, setTotalPlayers, setUndercovers, setMrWhite}: HomepageProps) {
    const [civilians, setCivilians] = useState(totalPlayers - (undercovers + mrWhite))
    const navigate = useNavigate()

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setCivilians(totalPlayers - (undercovers + mrWhite))
    }, [totalPlayers, undercovers, mrWhite])


    // Calculate minimum total players (special roles + at least 1 civilian)
    const minTotalPlayers = Math.max(3, undercovers + mrWhite + 1)
    const maxSpecialRoles = Math.floor(totalPlayers / 2)

    // Ensure total players is never less than minimum required
    useEffect(() => {
        if (totalPlayers < minTotalPlayers) {
            setTotalPlayers(minTotalPlayers)
        }
    }, [minTotalPlayers, totalPlayers])

    const handleTotalPlayersChange = (newValue: number) => {
        setTotalPlayers(newValue)

        // If new total is too small for current special roles, adjust them
        const newMaxSpecialRoles = Math.floor(newValue / 2)
        const currentSpecialRoles = undercovers + mrWhite

        if (currentSpecialRoles > newMaxSpecialRoles) {
            // Proportionally reduce special roles
            const ratio = newMaxSpecialRoles / currentSpecialRoles
            const newUndercovers = Math.max(1, Math.floor(undercovers * ratio))
            const newMrWhite = Math.max(0, newMaxSpecialRoles - newUndercovers)

            setUndercovers(newUndercovers)
            setMrWhite(newMrWhite)
        }
    }
    const handleUndercoverChange = (increment: boolean) => {
        if (increment && undercovers + mrWhite < maxSpecialRoles) {
            setUndercovers(undercovers + 1)
        } else if (!increment && undercovers > 0) {
            // Prevent both undercover and mr.white from being 0
            if (!(undercovers === 1 && mrWhite === 0)) {
                setUndercovers(undercovers - 1)
            }
        }
    }

    const handleMrWhiteChange = (increment: boolean) => {
        if (increment && undercovers + mrWhite < maxSpecialRoles) {
            setMrWhite(mrWhite+ 1)
        } else if (!increment && mrWhite > 0) {
            // Prevent both undercover and mr.white from being 0
            if (!(mrWhite === 1 && undercovers === 0)) {
                setMrWhite(mrWhite - 1)
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
                        <Header title="UNDERCOVER" subtitle="The Ultimate Deception Game" />

                        {/* Player Selection */}
                        <PlayerSlider value={totalPlayers} onChange={handleTotalPlayersChange} min={MIN_PLAYERS} max={MAX_PLAYERS} />

                        {/* Game Formula */}
                        <Box className="text-center py-4">
                            <Typography
                                variant="h5"
                                className="text-white font-medium"
                                sx={{ 
                                    textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                                }}
                            >
                                Number of Civilians = {civilians}
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
                                    letterSpacing: "0.15em", // adds spacing between letters
                                }}
                                onClick={handleStartGame}
                            >
                                <PlayArrow className="mr-2" />
                                Start Mission
                            </Fab>
                        </Box>

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
                                <Typography variant="h6" className="text-yellow-400 font-bold" sx={{
                                    letterSpacing: "0.15em", // adds spacing between letters
                                }}>
                                    Mission Briefing
                                </Typography>
                            </Box>
                            <RoleSummary civilians={civilians} undercovers={undercovers} mrWhite={mrWhite} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
