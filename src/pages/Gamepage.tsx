import { useState } from "react"
import { Box, Container, Grid, Typography, Chip } from "@mui/material"
import GameCard from "../components/Card"
import PlayerNameModal from "../components/Modal"

interface GamePageProps {
    numberOfCivilians: number;
    numberOfUndercover: number;
    numberOfMrWhite: number;
  }
  
export function Gamepage({ numberOfCivilians, numberOfUndercover, numberOfMrWhite }: GamePageProps) {
    const totalPlayers = numberOfCivilians + numberOfUndercover + numberOfMrWhite || 5

    const [playerNames, setPlayerNames] = useState<Map<number, string>>(new Map())

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)

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

    const generateCards = () => {
        const cards = []

        for (let i = 0; i < totalPlayers; i++) {
            const playerNumber = i + 1
            cards.push(
            <Grid item xs={12} sm={6} md={3} key={`player-${playerNumber}`}>
                <GameCard playerNumber={playerNumber} playerName={playerNames.get(playerNumber)} onClick={handleCardClick} />
            </Grid>,
            )
        }

        return cards
    }

    const getNamedPlayersCount = () => {
        return playerNames.size
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Undercover Game
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Players: {totalPlayers} | Named Players: {getNamedPlayersCount()}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
              <Chip label={`${numberOfCivilians} Civilians`} sx={{ backgroundColor: "#4caf50", color: "white" }} />
              <Chip label={`${numberOfUndercover} Undercover`} sx={{ backgroundColor: "#ff9800", color: "white" }} />
              <Chip label={`${numberOfMrWhite} Mr. White`} sx={{ backgroundColor: "#f44336", color: "white" }} />
            </Box>
          </Box>
    
          {totalPlayers > 0 ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                {generateCards()}
              </Grid>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No players configured. Please set up the game first.
              </Typography>
            </Box>
          )}

            {/* Player Name Modal */}
            <PlayerNameModal
                open={modalOpen}
                playerNumber={selectedPlayer || 0}
                currentName={selectedPlayer ? playerNames.get(selectedPlayer) || "" : ""}
                onClose={handleModalClose}
                onSave={handleSavePlayerName}
            />
        </Container>
    )
}
  