import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, Divider } from "@mui/material"
import { Person, Visibility, ArrowBack } from "@mui/icons-material"

interface PlayerNameModalProps {
  open: boolean
  playerNumber: number
  currentName?: string
  onClose: () => void
  onSave: (playerNumber: number, playerName: string) => void
}

type ModalView = "nameInput" | "wordDisplay"

const PlayerNameModal: React.FC<PlayerNameModalProps> = ({ open, playerNumber, currentName = "", onClose, onSave }) => {
  const [playerName, setPlayerName] = useState(currentName)
  const [modalView, setModalView] = useState<ModalView>("nameInput")
  const [hasName, setHasName] = useState(false)

  // For now, using placeholder words - this could be enhanced with actual game logic
  const getPlayerWord = (playerNum: number): string => {
    const words = ["Apple", "Orange", "Banana", "Grape", "Strawberry", "Pineapple", "Mango", "Kiwi"]
    return words[playerNum % words.length] || "Word"
  }

  useEffect(() => {
    setPlayerName(currentName)
    setHasName(!!currentName)
    // Only reset to nameInput when the modal is first opened, not when currentName updates
    if (open && !currentName) {
      setModalView("nameInput")
    } else if (open && currentName) {
      // If modal is opening and player already has a name, start with nameInput
      setModalView("nameInput")
    }
  }, [open])

  // Add a separate useEffect to handle currentName changes without resetting the view
  useEffect(() => {
    if (currentName) {
      setPlayerName(currentName)
      setHasName(true)
    }
  }, [currentName])

  const handleSave = () => {
    const trimmedName = playerName.trim()
    if (trimmedName) {
      onSave(playerNumber, trimmedName)
      setHasName(true)
      // Automatically show the word after saving
      setModalView("wordDisplay")
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && modalView === "nameInput") {
      handleSave()
    }
  }

  const handleSeeWord = () => {
    setModalView("wordDisplay")
  }

  const handleBackToName = () => {
    setModalView("nameInput")
  }

  const handleClose = () => {
    setModalView("nameInput")
    onClose()
  }

  const renderNameInputView = () => (
    <>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Person sx={{ color: "#1976d2" }} />
          <Typography variant="h6">Player {playerNumber}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter the name for Player {playerNumber}
        </Typography>
        <TextField
          autoFocus
          fullWidth
          label="Player Name"
          variant="outlined"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Player ${playerNumber}`}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1, flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <Button onClick={handleClose} color="secondary" sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={!playerName.trim()} sx={{ flex: 1 }}>
            Save
          </Button>
        </Box>
        {hasName && (
          <>
            <Divider sx={{ width: "100%", my: 1 }} />
            <Button
              onClick={handleSeeWord}
              variant="outlined"
              startIcon={<Visibility />}
              sx={{ width: "100%" }}
              color="success"
            >
              See Word
            </Button>
          </>
        )}
      </DialogActions>
    </>
  )

  const renderWordDisplayView = () => (
    <>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Person sx={{ color: "#4caf50" }} />
          <Typography variant="h6">{playerName || `Player ${playerNumber}`}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your word is:
          </Typography>
          <Box
            sx={{
              backgroundColor: "#e8f5e8",
              border: "2px solid #4caf50",
              borderRadius: 2,
              p: 4,
              mb: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#4caf50",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {getPlayerWord(playerNumber)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Remember this word for the game!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleBackToName} startIcon={<ArrowBack />} color="primary" sx={{ flex: 1 }}>
          Back to Name
        </Button>
        <Button onClick={handleClose} variant="contained" color="success" sx={{ flex: 1 }}>
          Done
        </Button>
      </DialogActions>
    </>
  )

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {modalView === "nameInput" ? renderNameInputView() : renderWordDisplayView()}
    </Dialog>
  )
}

export default PlayerNameModal
