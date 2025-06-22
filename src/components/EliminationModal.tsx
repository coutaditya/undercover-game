"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Alert,
} from "@mui/material"
import { Person, Warning, CheckCircle } from "@mui/icons-material"
import { type PlayerRole, MR_WHITE_ROLE } from "../constants/words"

interface PlayerData {
  playerNumber: number
  playerName: string
  role: PlayerRole
  word: string
  points: number
  isEliminated: boolean
}

interface EliminationModalProps {
  open: boolean
  playerData: PlayerData | null
  onClose: () => void
  onEliminate: (playerNumber: number) => void
  onMrWhiteWin: () => void
  gameEnded: boolean
  winMessage: string
  civilianWord: string
}

type ModalView = "confirm" | "eliminated" | "mrWhiteGuess" | "gameEnd"

export default function EliminationModal({
  open,
  playerData,
  onClose,
  onEliminate,
  onMrWhiteWin,
  gameEnded,
  winMessage,
  civilianWord,
}: EliminationModalProps) {
  const [modalView, setModalView] = useState<ModalView>("confirm")
  const [mrWhiteGuess, setMrWhiteGuess] = useState("")
  const [eliminationMessage, setEliminationMessage] = useState("")

  React.useEffect(() => {
    if (open && !gameEnded) {
      setModalView("confirm")
      setMrWhiteGuess("")
      setEliminationMessage("")
    } else if (gameEnded && winMessage) {
      setModalView("gameEnd")
    }
  }, [open, gameEnded, winMessage])

  const handleEliminate = () => {
    if (!playerData) return

    let message = ""
    switch (playerData.role) {
      case "civilian":
        message = "A Civilian has been eliminated"
        break
      case "undercover":
        message = "An undercover agent has been eliminated"
        break
      case "mrwhite":
        message = "Mr. White has been eliminated"
        break
    }

    setEliminationMessage(message)

    if (playerData.role === MR_WHITE_ROLE) {
      setModalView("mrWhiteGuess")
    } else {
      onEliminate(playerData.playerNumber)
      setModalView("eliminated")
    }
  }

  const handleMrWhiteGuessSubmit = () => {
    const isCorrect = mrWhiteGuess.toLowerCase().trim() === civilianWord.toLowerCase()

    if (isCorrect) {
      onMrWhiteWin()
      setModalView("gameEnd")
    } else if (playerData){
      onEliminate(playerData.playerNumber)
      setModalView("eliminated")
    }
  }

  const handleClose = () => {
    setModalView("confirm")
    setMrWhiteGuess("")
    setEliminationMessage("")
    onClose()
  }

  const renderConfirmView = () => (
    <>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #ff6b6b, #ee5a52)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Warning sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Eliminate Player
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
          textAlign: "center",
          py: 4,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Person sx={{ fontSize: "4rem", color: "#ff6b6b", mb: 2 }} />
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {playerData?.playerName || `Agent ${playerData?.playerNumber}`}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Are you sure you want to eliminate this player?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            flex: 1,
            color: "rgba(255,255,255,0.7)",
            borderColor: "rgba(255,255,255,0.3)",
            fontFamily: "'Inter', sans-serif",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.5)",
            },
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleEliminate}
          variant="contained"
          sx={{
            flex: 1,
            background: "linear-gradient(45deg, #ff6b6b, #ee5a52)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #e53e3e, #c53030)",
            },
          }}
        >
          Eliminate {playerData?.playerName || `Agent ${playerData?.playerNumber}`}
        </Button>
      </DialogActions>
    </>
  )

  const renderEliminatedView = () => (
    <>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #4caf50, #66bb6a)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CheckCircle sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Player Eliminated
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
          textAlign: "center",
          py: 4,
        }}
      >
        <Alert
          severity="info"
          sx={{
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            border: "1px solid #4caf50",
            color: "#4caf50",
            "& .MuiAlert-icon": {
              color: "#4caf50",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
            }}
          >
            {eliminationMessage}
          </Typography>
        </Alert>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            width: "100%",
            background: "linear-gradient(45deg, #4caf50, #66bb6a)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #388e3c, #4caf50)",
            },
          }}
        >
          Continue Game
        </Button>
      </DialogActions>
    </>
  )

  const renderMrWhiteGuessView = () => (
    <>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #ff9800, #f57c00)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Person sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Mr. White's Last Chance
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
          py: 4,
        }}
      >
        <Alert
          severity="info"
          sx={{
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            border: "1px solid #4caf50",
            color: "#4caf50",
            mb: 3,
            "& .MuiAlert-icon": {
              color: "#4caf50",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
            }}
          >
            {eliminationMessage}
          </Typography>
        </Alert>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Inter', sans-serif",
            mb: 3,
            textAlign: "center",
          }}
        >
          Mr. White, you have one chance to guess the secret word and win the game!
        </Typography>

        <TextField
          fullWidth
          label="Enter your guess"
          variant="outlined"
          value={mrWhiteGuess}
          onChange={(e) => setMrWhiteGuess(e.target.value)}
          placeholder="What was the secret word?"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              fontFamily: "'Inter', sans-serif",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "&:hover fieldset": {
                borderColor: "#ff9800",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff9800",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
              "&.Mui-focused": {
                color: "#ff9800",
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      >
        <Button
          onClick={() => setModalView("eliminated")}
          sx={{
            flex: 1,
            color: "rgba(255,255,255,0.7)",
            borderColor: "rgba(255,255,255,0.3)",
            fontFamily: "'Inter', sans-serif",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.5)",
            },
          }}
          variant="outlined"
        >
          Skip Guess
        </Button>
        <Button
          onClick={handleMrWhiteGuessSubmit}
          variant="contained"
          disabled={!mrWhiteGuess.trim()}
          sx={{
            flex: 1,
            background: "linear-gradient(45deg, #ff9800, #f57c00)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #f57c00, #ef6c00)",
            },
          }}
        >
          Submit Guess
        </Button>
      </DialogActions>
    </>
  )

  const renderGameEndView = () => (
    <>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #ffd700, #ffb300)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CheckCircle sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Game Over
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
          textAlign: "center",
          py: 4,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))",
            border: "2px solid #ffd700",
            borderRadius: "16px",
            p: 4,
            mb: 3,
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(255, 215, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#ffd700",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "0 4px 8px rgba(0,0,0,0.5)",
              mb: 2,
            }}
          >
            🎉 {winMessage} 🎉
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            width: "100%",
            background: "linear-gradient(45deg, #ffd700, #ffb300)",
            color: "#000",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #ffb300, #ff8f00)",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </>
  )

  const renderCurrentView = () => {
    switch (modalView) {
      case "confirm":
        return renderConfirmView()
      case "eliminated":
        return renderEliminatedView()
      case "mrWhiteGuess":
        return renderMrWhiteGuessView()
      case "gameEnd":
        return renderGameEndView()
      default:
        return renderConfirmView()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={modalView === "gameEnd" ? handleClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      }}
    >
      {renderCurrentView()}
    </Dialog>
  )
}
