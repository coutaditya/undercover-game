import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { Person, Edit, Visibility } from "@mui/icons-material"
import { useState } from "react"

interface GameCardProps {
  playerNumber: number
  playerName?: string
  orderedPlayerNumber?: number
  points: number
  isEliminated: boolean
  onClick: (playerNumber: number) => void
  gameStarted: boolean
  isFirst?: boolean
}

export default function GameCard({ playerNumber, playerName, orderedPlayerNumber, points, isEliminated, onClick, gameStarted = false, isFirst = false }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (!isEliminated) {
        onClick(playerNumber)
    }
  }

  const getCardColors = (hover: boolean = false) => {
    const baseTheme = {
      background: "rgba(255,255,255,0.05)",
      border: "2px solid rgba(102, 126, 234, 0.5)",
      hoverBorder: "2px solid rgba(102, 126, 234, 0.8)",
      hoverShadow: "0 12px 32px rgba(102, 126, 234, 0.3)",
      iconColor: "#667eea",
      textColor: "#667eea",
      gradientBg: "linear-gradient(45deg, #667eea, #764ba2)",
      shadowColor: "rgba(102, 126, 234, 0.4)",
    }

    const redTheme = {
      background: "linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05))",
      border: "2px solid rgba(255, 107, 107, 0.5)",
      hoverBorder: "2px solid rgba(255, 107, 107, 0.8)",
      hoverShadow: "0 12px 32px rgba(255, 107, 107, 0.3)",
      iconColor: "#ff6b6b",
      textColor: "#ff6b6b",
      gradientBg: "linear-gradient(45deg, #ff6b6b, #ff8a80)",
      shadowColor: "rgba(255, 107, 107, 0.4)",
    }

    const greenTheme = {
      background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))",
      border: "2px solid rgba(76, 175, 80, 0.5)",
      hoverBorder: "2px solid rgba(76, 175, 80, 0.8)",
      hoverShadow: "0 12px 32px rgba(76, 175, 80, 0.3)",
      iconColor: "#4caf50",
      textColor: "#4caf50",
      gradientBg: "linear-gradient(45deg, #4caf50, #66bb6a)",
      shadowColor: "rgba(76, 175, 80, 0.4)",
    }

    const greyTheme = {
        background: "rgba(255,255,255,0.1)",
        border: "2px solid rgba(255, 255, 255, 0.3)",
        hoverBorder: "2px solid rgba(255, 255, 255, 0.5)",
        hoverShadow: "0 12px 32px rgba(255, 255, 255, 0.2)",
        iconColor: "#888",
        textColor: "#888",
        gradientBg: "linear-gradient(45deg, #888, #aaa)",
        shadowColor: "rgba(136, 136, 136, 0.4)",
    }

    if (hover && gameStarted) {
      return redTheme
    } else if (playerName && !gameStarted) {
      return greenTheme
    } else if (isEliminated) {
        return greyTheme
    } else {
      return baseTheme
    }
  }

  const colors = getCardColors(isHovered)
  return (
    <Card
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: colors.background,
        backdropFilter: "blur(10px)",
        border: colors.border,
        borderRadius: "16px",
        transition: "all 0.3s ease-in-out",
        cursor: isEliminated ? "not-allowed" : "pointer",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: colors.hoverShadow,
          border: colors.hoverBorder,
        },
      }}
    >
      {/* Edit Icon */}
      {!gameStarted && (
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
      )}

      {/* Ready Badge */}
      {playerName && !gameStarted && (
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

      {isFirst && gameStarted && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
          }}
        >
          <Chip
            icon={<span>🎯</span>}
            size="small"
            sx={{
              backgroundColor: "transparent",
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
              fontSize: "1rem",
              lineHeight: 1.2,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
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
              fontSize: "1rem",
              lineHeight: 1.2,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Agent
          </Typography>
        )}

        {/* Points Display */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "rgba(0,0,0,0.3)",
            padding: "4px 12px",
            borderRadius: "12px",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isEliminated ? "#888" : "#e5e5e5",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.8rem",

            }}
          >
            Points:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isEliminated ? "#888" : "#e5e5e5",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
              fontSize: "0.8rem",
              lineHeight: 1.2,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {points}
          </Typography>
        </Box>

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
          {gameStarted ? orderedPlayerNumber : playerNumber}
        </Typography>
      </CardContent>
    </Card>
  )
}
