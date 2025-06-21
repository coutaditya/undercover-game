"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Container, Typography, Chip, ThemeProvider, createTheme, CssBaseline, Button } from "@mui/material"
import GameCard from "../components/Card"
import PlayerNameModal from "../components/Modal"
import Header from "../components/Header"
import { ArrowBack } from "@mui/icons-material"

interface GamePageProps {
  totalPlayers: number
  numberOfUndercover: number
  numberOfMrWhite: number
}

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
    fontFamily: '"Paralucent"',
  },
})

export function Gamepage({ totalPlayers, numberOfUndercover, numberOfMrWhite }: GamePageProps) {
  const numberOfCivilians = totalPlayers - (numberOfUndercover + numberOfMrWhite)
  const navigate = useNavigate()
  const [playerNames, setPlayerNames] = useState<Map<number, string>>(new Map())
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleCardClick = (playerNumber: number) => {
    setSelectedPlayer(playerNumber)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedPlayer(null)
  }

  const handleSavePlayerName = (playerNumber: number, playerName: string) => {
    setPlayerNames((prev) => {
      const newMap = new Map(prev)
      newMap.set(playerNumber, playerName)
      return newMap
    })
  }

  const handleGoBack = () => {
    navigate("/")
  }


  const generateCards = () => {
    const cards = []

    for (let i = 0; i < totalPlayers; i++) {
      const playerNumber = i + 1
      cards.push(
        <Box key={`player-${playerNumber}`} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, p: 1 }}>
          <GameCard playerNumber={playerNumber} playerName={playerNames.get(playerNumber)} onClick={handleCardClick} />
        </Box>,
      )
    }

    return cards
  }

  const getNamedPlayersCount = () => {
    return playerNames.size
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
        <Container maxWidth="lg" className="relative z-10 py-8">
          <Box className="space-y-8">
            {/* Header */}
            <Header title="MISSION SETUP" subtitle="Configure Your Agents" />

            {/* Game Stats */}
            <Box
              className="text-center p-6 rounded-2xl"
              sx={{
                background: "rgba(0,0,0,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                marginTop: "2rem",
              }}
            >
              <Typography
                variant="h6"
                className="text-white"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  color: 'white',
                  mb: 3, // margin bottom (24px)
                }}
              >
                Players: {totalPlayers} | Named: {getNamedPlayersCount()}
              </Typography>

              <Box className="flex justify-center gap-4 flex-wrap">
                <Chip
                  label={`${numberOfCivilians} Civilians`}
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                  }}
                />
                <Chip
                  label={`${numberOfUndercover} Undercover`}
                  sx={{
                    backgroundColor: "#667eea",
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                  }}
                />
                <Chip
                  label={`${numberOfMrWhite} Mr. White`}
                  sx={{
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
                  }}
                />
              </Box>
            </Box>

            {/* Player Cards Grid */}
            {totalPlayers > 0 ? (
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: "center" }}>
                  {generateCards()}
                </Box>
              </Box>
            ) : (
              <Box className="text-center mt-8">
                <Typography variant="h6" className="text-gray-400" sx={{ fontFamily: "'Inter', sans-serif" }}>
                  No players configured. Please set up the game first.
                </Typography>
              </Box>
            )}
            {/* Restart Game Button */}
            <Box className="flex justify-center pt-8">
              <Button
                onClick={handleGoBack}
                startIcon={<ArrowBack />}
                variant="outlined"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  borderColor: "rgba(255,255,255,0.3)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  px: 4,
                  py: 2,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    borderColor: "#667eea",
                    backgroundColor: "rgba(102, 126, 234, 0.1)",
                    color: "#667eea",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Restart Game
              </Button>
            </Box>

            {/* Player Name Modal */}
            <PlayerNameModal
              open={modalOpen}
              playerNumber={selectedPlayer || 0}
              currentName={selectedPlayer ? playerNames.get(selectedPlayer) || "" : ""}
              setModalOpen={setModalOpen}
              onClose={handleModalClose}
              onSave={handleSavePlayerName}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}