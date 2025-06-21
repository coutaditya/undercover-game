"use client"

import { Box, Typography } from "@mui/material"

interface HeaderProps {
    title: string
    subtitle: string
}

export default function Header({ title = "UNDERCOVER", subtitle = "The Ultimate Deception Game" }: HeaderProps) {
    return (
        <Box className="text-center space-y-6">
            <Box
                sx={{
                    fontSize: { xs: "3rem", md: "5rem" },
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(102, 126, 234, 0.2)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "bold",
                    letterSpacing: "0.15em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.1em",
                }}
            >
                {title.split("").map((letter, index) => (
                    <Box
                        key={index}
                        component="span"
                        className="text-white"
                        sx={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                            "@keyframes fadeInUp": {
                                "0%": {
                                    opacity: 0,
                                    transform: "translateY(30px)",
                                },
                                "100%": {
                                    opacity: 1,
                                    transform: "translateY(0)",
                                },
                            },
                        }}
                    >
                        {letter}
                    </Box>
                ))}
            </Box>
            <Typography
                variant="h6"
                className="text-gray-300 tracking-wide"
                sx={{
                    textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    )
}
