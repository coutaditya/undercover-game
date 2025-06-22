import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, Divider } from "@mui/material"
import { Person, Visibility, ArrowBack } from "@mui/icons-material"
import { MR_WHITE_ROLE, type PlayerRole } from "../constants/words"

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

interface PlayerNameModalProps {
  open: boolean
  playerNumber: number
  currentName?: string
  setModalOpen: (open: boolean) => void
  playerData: PlayerData | null
  onClose: () => void
  onSave: (playerNumber: number, playerName: string) => void
  onViewedCard: (playerNumber: number) => void
}

type ModalView = "nameInput" | "wordDisplay"

export default function PlayerNameModal({ open, playerNumber, currentName = "", setModalOpen, playerData, onClose, onSave, onViewedCard }: PlayerNameModalProps) {
  const [playerName, setPlayerName] = useState(currentName)
  const [modalView, setModalView] = useState<ModalView>("nameInput")
  const [hasName, setHasName] = useState(false)

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
      if (!hasName) {
        // Automatically show the word after saving for the first time
        handleSeeWord()
      }
      else {
        setHasName(true)
        setModalOpen(false)
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && modalView === "nameInput") {
      handleSave()
    }
  }

  const handleSeeWord = () => {
    onViewedCard(playerNumber)
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
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Person sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Agent {playerNumber}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Enter the codename for Agent {playerNumber}
        </Typography>
        <TextField
          autoFocus
          fullWidth
          label="Agent Codename"
          variant="outlined"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Agent ${playerNumber}`}
          sx={{
            mt: 1,
            "& .MuiOutlinedInput-root": {
              color: "white",
              fontFamily: "'Inter', sans-serif",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
              "&.Mui-focused": {
                color: "#667eea",
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          pt: 1,
          flexDirection: "column",
          gap: 1,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
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
            onClick={handleSave}
            variant="contained"
            disabled={!playerName.trim()}
            sx={{
              flex: 1,
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
              },
            }}
          >
            Save
          </Button>
        </Box>
        {hasName && (
          <>
            <Divider sx={{ width: "100%", my: 1, borderColor: "rgba(255,255,255,0.1)" }} />
            <Button
              onClick={handleSeeWord}
              variant="outlined"
              startIcon={<Visibility />}
              sx={{
                width: "100%",
                color: "#4caf50",
                borderColor: "#4caf50",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#66bb6a",
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                },
              }}
            >
              See Word
            </Button>
          </>
        )}
      </DialogActions>
    </>
  )

  const renderWordDisplayView = () => {
    if (!playerData) {
        return (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="error">Error: Player data not found</Typography>
          </Box>
        )
      }

    return (
        <>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #4caf50, #66bb6a)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Person sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            {playerName || `Agent ${playerNumber}`}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "white",
        }}
      >
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {playerData.role === MR_WHITE_ROLE ? "Your role:" : "Your secret word is:"}
          </Typography>
          <Box
            sx={{
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1))",
              border: "2px solid #4caf50",
              borderRadius: "16px",
              p: 4,
              mb: 3,
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#4caf50",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "bold",
                textAlign: "center",
                textShadow: "0 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              {playerData.word}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
              {playerData.role === MR_WHITE_ROLE
                ? "You don't know the word. Try to blend in!"
                : "Remember this word for the mission!"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          pt: 1,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      >
        <Button
          onClick={handleBackToName}
          startIcon={<ArrowBack />}
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
          Back to Name
        </Button>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            flex: 1,
            background: "linear-gradient(45deg, #4caf50, #66bb6a)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #388e3c, #4caf50)",
            },
          }}
        >
          Done
        </Button>
      </DialogActions>
    </>
    )  
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
      {modalView === "nameInput" ? renderNameInputView() : renderWordDisplayView()}
    </Dialog>
  )
}
