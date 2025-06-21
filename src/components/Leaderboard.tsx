"use client"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    List,
    ListItem,
    Chip,
} from "@mui/material"
import { EmojiEvents, ExitToApp, Refresh, PlayArrow } from "@mui/icons-material"

interface Player {
    playerNumber: number
    playerName: string
    points: number
}

interface LeaderboardProps {
    open: boolean
    players: Player[]
    onClose: () => void
    onExit: () => void
    onRestartRound: () => void
    onNextRound?: () => void
    roundEnded?: boolean
}

export default function Leaderboard({
    open,
    players,
    onClose,
    onExit,
    onRestartRound,
    onNextRound,
    roundEnded = false,
}: LeaderboardProps) {
    // Sort players by points (descending), then by playerNumber (ascending) for ties
    const sortedPlayers = [...players].sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points
        }
        return a.playerNumber - b.playerNumber
    })

    const getRankIcon = (position: number) => {
        switch (position) {
            case 1:
                return "🥇"
            case 2:
                return "🥈"
            case 3:
                return "🥉"
            default:
                return position.toString()
        }
    }

    const getRankBadgeStyle = (position: number) => {
        if (position <= 3) {
            return {
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                backgroundColor: position === 1 ? "#ffd700" : position === 2 ? "#c0c0c0" : "#cd7f32",
                color: "#000",
                fontWeight: "bold",
            }
        } else {
            return {
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                backgroundColor: "#667eea",
                color: "#fff",
                fontWeight: "bold",
            }
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                },
            }}
        >
            <DialogTitle
                sx={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "white",
                    textAlign: "center",
                    py: 2.5,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                    <EmojiEvents sx={{ fontSize: "1.5rem", color: "#ffd700" }} />
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: "bold",
                            fontSize: "1.4rem",
                        }}
                    >
                        LEADERBOARD
                    </Typography>
                    <EmojiEvents sx={{ fontSize: "1.5rem", color: "#ffd700" }} />
                </Box>
            </DialogTitle>

            <DialogContent
                sx={{
                    p: 0,
                    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                }}
            >
                <List sx={{ p: 2 }}>
                    {sortedPlayers.map((player, index) => {
                        const position = index + 1

                        return (
                            <ListItem
                                key={player.playerNumber}
                                sx={{
                                    mb: 1.5,
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    transition: "all 0.3s ease",
                                    py: 1.5,
                                    px: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    "&:hover": {
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 4px 15px rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                {/* Rank Badge */}
                                <Box sx={getRankBadgeStyle(position)}>{getRankIcon(position)}</Box>

                                {/* Player Name */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#fff",
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: "600",
                                            fontSize: "1rem",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {player.playerName || `Agent ${player.playerNumber}`}
                                    </Typography>
                                </Box>

                                {/* Points */}
                                <Chip
                                    label={`${player.points} pts`}
                                    sx={{
                                        backgroundColor: "rgba(255,255,255,0.15)",
                                        color: "#fff",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: "600",
                                        fontSize: "0.85rem",
                                        height: "28px",
                                        borderRadius: "14px",
                                    }}
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </DialogContent>

            <DialogActions
                sx={{
                    p: 3,
                    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                    gap: 2,
                    justifyContent: "center",
                }}
            >
                {/* Exit Button */}
                <Button
                    onClick={onExit}
                    startIcon={<ExitToApp />}
                    variant="outlined"
                    sx={{
                        color: "rgba(255,255,255,0.8)",
                        borderColor: "rgba(255,255,255,0.3)",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "0.95rem",
                        "&:hover": {
                            borderColor: "#ff6b6b",
                            backgroundColor: "rgba(255, 107, 107, 0.1)",
                            color: "#ff6b6b",
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    Exit Game
                </Button>

                {/* Conditional Second Button */}
                {roundEnded && onNextRound ? (
                    <Button
                        onClick={onNextRound}
                        startIcon={<PlayArrow />}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                            color: "white",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            px: 3,
                            py: 1.5,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "0.95rem",
                            boxShadow: "0 4px 16px rgba(76, 175, 80, 0.4)",
                            "&:hover": {
                                background: "linear-gradient(45deg, #388e3c, #4caf50)",
                                boxShadow: "0 6px 20px rgba(76, 175, 80, 0.5)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Next Round
                    </Button>
                ) : (
                    <Button
                        onClick={onRestartRound}
                        startIcon={<Refresh />}
                        variant="outlined"
                        sx={{
                            color: "rgba(255,255,255,0.8)",
                            borderColor: "rgba(255,255,255,0.3)",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            px: 3,
                            py: 1.5,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "0.95rem",
                            "&:hover": {
                                borderColor: "#ff9800",
                                backgroundColor: "rgba(255, 152, 0, 0.1)",
                                color: "#ff9800",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Restart Round
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}
