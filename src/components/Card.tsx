"use client"

import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { Person, Edit, Visibility } from "@mui/icons-material"

interface GameCardProps {
  playerNumber: number
  playerName?: string
  onClick: (playerNumber: number) => void
}

export default function GameCard({ playerNumber, playerName, onClick }: GameCardProps) {
  const handleClick = () => {
    onClick(playerNumber)
  }

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: playerName
          ? "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))"
          : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: playerName ? "2px solid rgba(76, 175, 80, 0.5)" : "2px solid rgba(102, 126, 234, 0.5)",
        borderRadius: "16px",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: playerName ? "0 12px 32px rgba(76, 175, 80, 0.3)" : "0 12px 32px rgba(102, 126, 234, 0.3)",
          border: playerName ? "2px solid rgba(76, 175, 80, 0.8)" : "2px solid rgba(102, 126, 234, 0.8)",
        },
      }}
    >
      {/* Edit Icon */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          color: playerName ? "#4caf50" : "#667eea",
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
              backgroundColor: "#4caf50",
              color: "white",
              fontSize: "0.7rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
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
            color: playerName ? "#4caf50" : "#e5e5e5",
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
              color: "#4caf50",
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
              color: "#e5e5e5",
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
            background: playerName
              ? "linear-gradient(45deg, #4caf50, #66bb6a)"
              : "linear-gradient(45deg, #667eea, #764ba2)",
            padding: "8px 16px",
            borderRadius: "20px",
            minWidth: "48px",
            textAlign: "center",
            boxShadow: playerName ? "0 4px 16px rgba(76, 175, 80, 0.4)" : "0 4px 16px rgba(102, 126, 234, 0.4)",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {playerNumber}
        </Typography>
      </CardContent>
    </Card>
  )
}
