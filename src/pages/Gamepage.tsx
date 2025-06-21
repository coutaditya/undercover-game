import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Container, Typography, Chip, ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { ArrowBack, Refresh, PlayArrow } from "@mui/icons-material"

import CustomButton from "../components/Button"
import GameCard from "../components/Card"
import PlayerNameModal from "../components/Modal"
import Header from "../components/Header"
import Leaderboard from "../components/Leaderboard"
import { WORD_PAIRS, MR_WHITE_MESSAGE, type PlayerRole } from "../constants/words"
import EliminationModal from "../components/EliminationModal"

const CIVILIAN_ROLE = "civilian"
const UNDERCOVER_ROLE = "undercover"
const MR_WHITE_ROLE = "mrwhite"
const UNKNOWN_ROLE = "unknown"

interface GamePageProps {
  totalPlayers: number
  numberOfUndercover: number
  numberOfMrWhite: number
}

interface PlayerData {
  playerNumber: number
  playerName: string
  role: PlayerRole
  word: string
  points: number
  isFirst?: boolean
  isEliminated: boolean
  hasViewedOnce: boolean
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
  const [updatedPlayerNamesCount, setUpdatedPlayerNamesCount] = useState(0)
  const [playerRoles, setPlayerRoles] = useState<Map<number, PlayerData>>(new Map())
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [orderedPlayerNumbers, setOrderedPlayerNumbers] = useState<number[]>([])
  const [leaderboardOpen, setLeaderboardOpen] = useState(false)
  const [roundEnded, setRoundEnded] = useState(false)
  const [eliminationModalOpen, setEliminationModalOpen] = useState(false)
  const [selectedPlayerForElimination, setSelectedPlayerForElimination] = useState<number | null>(null)
  const [gameEnded, setGameEnded] = useState(false)
  const [winMessage, setWinMessage] = useState("")
  const [pointsDistributed, setPointsDistributed] = useState(false)


  // Initialize game on mount (includes points reset)
  useEffect(() => {
    assignRolesAndWords()
    window.scrollTo(0, 0)
  }, []) 

  const assignRolesAndWords = () => {
    // Select a random word pair
    const randomIndex = Math.floor(Math.random() * WORD_PAIRS.length)
    const wordPair = WORD_PAIRS[randomIndex] || null

    // Create array of roles
    const roles: PlayerRole[] = []

    // Add civilians
    for (let i = 0; i < numberOfCivilians; i++) {
      roles.push(CIVILIAN_ROLE)
    }

    // Add undercover agents
    for (let i = 0; i < numberOfUndercover; i++) {
      roles.push(UNDERCOVER_ROLE)
    }

    // Add Mr. White
    for (let i = 0; i < numberOfMrWhite; i++) {
      roles.push(MR_WHITE_ROLE)
    }

    // Shuffle roles randomly
    const shuffledRoles = [...roles].sort(() => Math.random() - 0.5)

    // Create player data map
    const newPlayerRoles = new Map<number, PlayerData>()

    for (let i = 0; i < totalPlayers; i++) {
      const playerNumber = i + 1
      const role = shuffledRoles[i]

      let word: string
      switch (role) {
        case CIVILIAN_ROLE:
          word = wordPair?.civilianWord || UNKNOWN_ROLE
          break
        case UNDERCOVER_ROLE:
          word = wordPair?.undercoverWord || UNKNOWN_ROLE
          break
        case MR_WHITE_ROLE:
          word = MR_WHITE_MESSAGE
          break
        default:
          word = UNKNOWN_ROLE
      }

      newPlayerRoles.set(playerNumber, {
        playerNumber,
        role: role || CIVILIAN_ROLE,
        word,
        playerName: playerRoles.get(playerNumber)?.playerName || "",
        points: playerRoles.get(playerNumber)?.points ?? 0,
        isEliminated: false,
        hasViewedOnce: false,
      })
    }

    setPlayerRoles(newPlayerRoles)
  }

  const handleCardClick = (playerNumber: number) => {
    const playerData = playerRoles.get(playerNumber)
    // Don't allow clicking on eliminated players
    if (playerData?.isEliminated) {
      return
    }

    setSelectedPlayer(playerNumber)
    setModalOpen(true)
    if (playerData) {
      playerData.hasViewedOnce = true
    }

    if (gameStarted) {
        // Show elimination modal when game is started
        setSelectedPlayerForElimination(playerNumber)
        setEliminationModalOpen(true)
    } else {
        // Show name/word modal when game is not started
        setSelectedPlayer(playerNumber)
        setModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedPlayer(null)
  }

  const handleSavePlayerName = (playerNumber: number, playerName: string) => {
    setPlayerRoles((prev) => {
      const newMap = new Map(prev)
      const playerData = newMap.get(playerNumber)
      if (playerData) {
        if (!playerData.playerName) {
          setUpdatedPlayerNamesCount((prevCount) => prevCount + 1)
        }

        playerData.playerName = playerName
        newMap.set(playerNumber, playerData)
      }
      return newMap
    })
  }

  const handleExit = () => {
    setLeaderboardOpen(true)
  }

  const handleLeaderboardClose = () => {
    setLeaderboardOpen(false)
  }

  const handleGoBack = () => {
    navigate("/")
  }

  const handleRestartRound = () => {
    setLeaderboardOpen(true)
  }

  const handleLeaderboardExit = () => {
    setLeaderboardOpen(false)
    handleGoBack()
  }

  const handleLeaderboardRestartRound = () => {
    setLeaderboardOpen(false)
    // Reset game state for new round
    setGameStarted(false)
    setRoundEnded(false)
    assignRolesAndWords()
  }

  const handleNextRound = () => {
    console.log("Next Round clicked")
    setLeaderboardOpen(false)
    setRoundEnded(false)
    setGameStarted(false)
    assignRolesAndWords()
  }

  const handleStartRound = () => {
    // Filter non-Mr. White players
    const eligible = Array.from(playerRoles.entries())
      .filter(([_, data]) => data.role !== MR_WHITE_ROLE)
      .map(([num]) => num)

    if (eligible.length === 0) {
      alert("No eligible player to start the game (non-Mr. White).")
      return
    }

    const startingPlayer = eligible[Math.floor(Math.random() * eligible.length)] || 0

    const allPlayerNumbers = Array.from({ length: totalPlayers }, (_, i) => i + 1)
    const startingIndex = allPlayerNumbers.indexOf(startingPlayer)

    const reordered = [
      ...allPlayerNumbers.slice(startingIndex),
      ...allPlayerNumbers.slice(0, startingIndex)
    ]

    setOrderedPlayerNumbers(reordered)
    setGameStarted(true)
  }

  const handleEliminatePlayer = (playerNumber: number) => {
    setPlayerRoles((prev) => {
      const newMap = new Map(prev)
      const playerData = newMap.get(playerNumber)
      if (playerData) {
        playerData.isEliminated = true
        newMap.set(playerNumber, playerData)
      }
      return newMap
    })

    // Check win conditions after elimination
    setTimeout(() => {
      checkWinConditions()
    }, 100)
  }

const checkWinConditions = () => {
    // Don't check win conditions if game has already ended or points already distributed
    if (gameEnded || pointsDistributed) {
        return
    }

    const alivePlayers = Array.from(playerRoles.values()).filter((player) => !player.isEliminated)
    const aliveCivilians = alivePlayers.filter((player) => player.role === CIVILIAN_ROLE)
    const aliveImpostors = alivePlayers.filter(
      (player) => player.role === UNDERCOVER_ROLE || player.role === MR_WHITE_ROLE,
    )

    if (aliveImpostors.length === 0) {
      // Civilians win
      setWinMessage("Civilians Win! All impostors have been eliminated!")
      distributeCivilianWinPoints()
      setPointsDistributed(true)
      setGameEnded(true)
    } else if (aliveCivilians.length <= 1 && aliveImpostors.length > 0) {
      // Impostors win
      setWinMessage("Impostors Win! They have eliminated enough civilians!")
      distributeImpostorWinPoints()
      setPointsDistributed(true)
      setGameEnded(true)
    }
  }

  const distributeCivilianWinPoints = () => {
    setPlayerRoles((prev) => {
      const newMap = new Map(prev)
      newMap.forEach((player, key) => {
        if (player.role === CIVILIAN_ROLE) {
          player.points += 2
          newMap.set(key, player)
        }
      })
      return newMap
    })
  }

  const distributeImpostorWinPoints = () => {
    setPlayerRoles((prev) => {
      const newMap = new Map(prev)
      newMap.forEach((player, key) => {
        if (player.role === UNDERCOVER_ROLE) {
          player.points += 10
        } else if (player.role === MR_WHITE_ROLE) {
          player.points += 6
        }
        newMap.set(key, player)
      })
      return newMap
    })
  }

  const handleMrWhiteWin = () => {
    if (pointsDistributed) {
        return
    }

    setWinMessage("Mr. White Wins! He correctly guessed the word!")
    setPlayerRoles((prev) => {
      const newMap = new Map(prev)
      newMap.forEach((player, key) => {
        if (player.role === MR_WHITE_ROLE) {
          player.points += 6
          newMap.set(key, player)
        }
      })
      return newMap
    })
    setPointsDistributed(true)
    setGameEnded(true)
  }

  const handleEliminationModalClose = () => {
    setEliminationModalOpen(false)
    setSelectedPlayerForElimination(null)

    // Reset game ended state when modal closes
    if (gameEnded) {
        setGameEnded(false)
        setWinMessage("")
        setPointsDistributed(true)
      }
  }

  const getSelectedPlayerForEliminationData = (): PlayerData | null => {
    if (!selectedPlayerForElimination) return null
    return playerRoles.get(selectedPlayerForElimination) || null
  }

  const generateCards = () => {
    const cards = []
    const playerList = gameStarted && orderedPlayerNumbers.length > 0
      ? orderedPlayerNumbers
      : Array.from({ length: totalPlayers }, (_, i) => i + 1)

    for (let i = 0; i < playerList.length; i++) {
      const originalPosition = playerList[i] || i + 1
      const newPosition = gameStarted ? i + 1 : originalPosition
      const playerNumber = playerRoles.get(originalPosition)?.playerNumber || originalPosition

      cards.push(
        <Box key={`player-${playerNumber}`} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, p: 1 }}>
          <GameCard
            playerNumber={playerNumber}
            orderedPlayerNumber={newPosition}
            playerName={playerRoles.get(playerNumber)?.playerName || ""}
            onClick={handleCardClick}
            gameStarted={gameStarted}
            isFirst={gameStarted && i === 0}
            points={playerRoles.get(playerNumber)?.points || 0}
            isEliminated={playerRoles.get(playerNumber)?.isEliminated || false}
            hasViewedOnce={playerRoles.get(playerNumber)?.hasViewedOnce || false}
          />
        </Box>
      )
    }
    return cards
  }

  const getPlayersForLeaderboard = () => {
    const players = []
    for (let i = 1; i <= totalPlayers; i++) {
      players.push({
        playerNumber: i,
        playerName: playerRoles.get(i)?.playerName || "",
        points: playerRoles.get(i)?.points || 0,
      })
    }
    return players
  }

  const allPlayersReady = Array.from(playerRoles.values()).every(
    (player) => player.playerName.trim() !== "" && player.hasViewedOnce
  )

  const getSelectedPlayerData = (): PlayerData | null => {
    if (!selectedPlayer) return null
    return playerRoles.get(selectedPlayer) || null
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
            {gameStarted ? (
              <Header title="ELIMINATION ROUND" subtitle="Eliminate The Impostors" />
            ) : (
              <Header title="MISSION SETUP" subtitle="Configure Your Agents" />
            )}

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
                Players: {totalPlayers} | Named: {updatedPlayerNamesCount}
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
            <Box className="flex justify-between items-center pt-8 gap-4">
              {/* Exit Button (Left) */}
              <CustomButton
                text="Exit Game"
                onClick={handleExit}
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
              />
              {/* Restart Round Button (Center) */}
              <CustomButton
                text="Restart Round"
                onClick={handleRestartRound}
                startIcon={<Refresh />}
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
                    borderColor: "#ff9800",
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                    color: "#ff9800",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              />

              {/* Start Round Button (Right) */}
              <CustomButton
                text="Start Round"
                onClick={handleStartRound}
                startIcon={<PlayArrow />}
                variant="contained"
                disabled={!allPlayersReady || gameStarted}
                sx={{
                  background: allPlayersReady && !gameStarted ? "linear-gradient(45deg, #4caf50, #66bb6a)" : "rgba(255,255,255,0.1)",
                  color: allPlayersReady && !gameStarted ? "white" : "rgba(255,255,255,0.3)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  px: 4,
                  py: 2,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: allPlayersReady && !gameStarted ? "0 4px 16px rgba(76, 175, 80, 0.4)" : "none",
                  "&:hover": {
                    background: allPlayersReady && !gameStarted ? "linear-gradient(45deg, #388e3c, #4caf50)" : "rgba(255,255,255,0.1)",
                    transform: allPlayersReady && !gameStarted ? "translateY(-2px)" : "none",
                    boxShadow: allPlayersReady && !gameStarted ? "0 6px 20px rgba(76, 175, 80, 0.5)" : "none",
                  },
                  "&:disabled": {
                    cursor: "not-allowed",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            </Box>

            {/* Player Name Modal */}
            <PlayerNameModal
              open={modalOpen}
              playerNumber={selectedPlayer || 0}
              currentName={selectedPlayer ? playerRoles.get(selectedPlayer)?.playerName || "" : ""}
              setModalOpen={setModalOpen}
              playerData={getSelectedPlayerData()}
              onClose={handleModalClose}
              onSave={handleSavePlayerName}
            />
            {/* Leaderboard Modal */}
            <Leaderboard
              open={leaderboardOpen}
              players={getPlayersForLeaderboard()}
              onClose={handleLeaderboardClose}
              onExit={handleLeaderboardExit}
              onRestartRound={handleLeaderboardRestartRound}
              onNextRound={handleNextRound}
              roundEnded={roundEnded}
            />

            <EliminationModal
                open={eliminationModalOpen}
                playerData={getSelectedPlayerForEliminationData()}
                onClose={handleEliminationModalClose}
                onEliminate={handleEliminatePlayer}
                onMrWhiteWin={handleMrWhiteWin}
                gameEnded={gameEnded}
                winMessage={winMessage}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}