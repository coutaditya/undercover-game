import type React from "react"
import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { Person, Edit, Visibility } from "@mui/icons-material"

interface GameCardProps {
  playerNumber: number
  playerName?: string
  onClick: (playerNumber: number) => void
}

const GameCard: React.FC<GameCardProps> = ({ playerNumber, playerName, onClick }) => {

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
        backgroundColor: playerName ? "#e8f5e8" : "#f5f5f5",
        border: playerName ? "2px solid #4caf50" : "2px solid #1976d2",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        },
      }}
    >

    <Box
    sx={{
        position: "absolute",
        top: 8,
        right: 8,
        color: playerName ? "#4caf50" : "#1976d2",
        opacity: 0.7,
    }}
    >
        <Edit fontSize="small" />
    </Box>

    {playerName && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
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
        <Box
          sx={{
            color: playerName ? "#4caf50" : "#1976d2",
            fontSize: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Person fontSize="inherit" />
        </Box>
        {playerName ? (
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: "#4caf50",
              fontWeight: "bold",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {playerName}
          </Typography>
        ) : (
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: "#1976d2",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Player
        </Typography>
        )}
        <Typography
          variant="h5"
          sx={{
            color: playerName ? "#4caf50" : "#1976d2",
            fontWeight: "bold",
            backgroundColor: playerName ? "#c8e6c9" : "#e3f2fd",
            padding: "4px 12px",
            borderRadius: "16px",
            minWidth: "40px",
            textAlign: "center",
          }}
        >
          {playerNumber}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GameCard
