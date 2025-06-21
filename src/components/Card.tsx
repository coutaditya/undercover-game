"use client"

import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { Person, Edit, Visibility } from "@mui/icons-material"

interface GameCardProps {
  playerNumber: number
  playerName?: string
  onClick: (playerNumber: number) => void
  gameStarted: boolean
}

export default function GameCard({ playerNumber, playerName, onClick, gameStarted = false }: GameCardProps) {
  const handleClick = () => {
    onClick(playerNumber)
  }

  const getCardColors = () => {
    if (gameStarted) {
      // Red theme when game started
      return {
        background: "linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05))",
        border: "2px solid rgba(255, 107, 107, 0.5)",
        hoverBorder: "2px solid rgba(255, 107, 107, 0.8)",
        hoverShadow: "0 12px 32px rgba(255, 107, 107, 0.3)",
        iconColor: "#ff6b6b",
        textColor: "#ff6b6b",
        gradientBg: "linear-gradient(45deg, #ff6b6b, #ff8a80)",
        shadowColor: "rgba(255, 107, 107, 0.4)",
      }
    } else if (playerName) {
      // Green theme when named
      return {
        background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))",
        border: "2px solid rgba(76, 175, 80, 0.5)",
        hoverBorder: "2px solid rgba(76, 175, 80, 0.8)",
        hoverShadow: "0 12px 32px rgba(76, 175, 80, 0.3)",
        iconColor: "#4caf50",
        textColor: "#4caf50",
        gradientBg: "linear-gradient(45deg, #4caf50, #66bb6a)",
        shadowColor: "rgba(76, 175, 80, 0.4)",
      }
    } else {
      // Default blue theme
      return {
        background: "rgba(255,255,255,0.05)",
        border: "2px solid rgba(102, 126, 234, 0.5)",
        hoverBorder: "2px solid rgba(102, 126, 234, 0.8)",
        hoverShadow: "0 12px 32px rgba(102, 126, 234, 0.3)",
        iconColor: "#667eea",
        textColor: "#667eea",
        gradientBg: "linear-gradient(45deg, #667eea, #764ba2)",
        shadowColor: "rgba(102, 126, 234, 0.4)",
      }
    }
  }

  const colors = getCardColors()
  return (
    <Card
      onClick={handleClick}
      sx={{
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: colors.background,
        backdropFilter: "blur(10px)",
        border: colors.border,
        borderRadius: "16px",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: colors.hoverShadow,
          border: colors.hoverBorder,
        },
      }}
    >
      {/* Edit Icon */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          color: colors.iconColor,
          opacity: 0.8,
        }}
      >
        <Edit fontSize="small" />
      </Box>

      {/* Ready Badge */}
      {playerName && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
          }}
        >
          <Chip
            icon={<Visibility />}
            label="Ready"
            size="small"
            sx={{
              backgroundColor: gameStarted ? "#ff6b6b" : "#4caf50",
              color: "white",
              fontSize: "0.7rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              boxShadow: colors.shadowColor,
            }}
          />
        </Box>
      )}

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 3,
        }}
      >
        {/* Player Icon */}
        <Box
          sx={{
            color: colors.iconColor,
            fontSize: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          }}
        >
          <Person fontSize="inherit" />
        </Box>

        {/* Player Name */}
        {playerName ? (
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: colors.textColor,
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              wordBreak: "break-word",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {playerName}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: colors.textColor,
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Agent
          </Typography>
        )}

        {/* Player Number */}
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "bold",
            background: colors.gradientBg,
            padding: "8px 16px",
            borderRadius: "20px",
            minWidth: "48px",
            textAlign: "center",
            boxShadow: `0 4px 16px ${colors.shadowColor}`,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {playerNumber}
        </Typography>
      </CardContent>
    </Card>
  )
}
