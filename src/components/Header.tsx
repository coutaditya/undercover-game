"use client"

import { Box, Typography } from "@mui/material"
import { Security } from "@mui/icons-material"

interface HeaderProps {
    title: string
    subtitle: string
}

export default function Header({ title = "UNDERCOVER", subtitle = "The Ultimate Deception Game" }: HeaderProps) {
    return (
        <Box className="text-center space-y-6">
            <Box
                sx={{
                    fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(102, 126, 234, 0.2)",
                    fontFamily: "'Paralucent-light'",
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
                        sx={{
                            color: "#e5e5e5",
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
                    fontFamily: "'Paralucent-light'",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                }}
            >
                <Security 
                    sx={{ 
                        fontSize: "1.2rem", 
                        color: "#ffd700",
                        animation: "slideInLeft 0.8s ease-out 0.5s both",
                        "@keyframes slideInLeft": {
                            "0%": {
                                opacity: 0,
                                transform: "translateX(-30px)",
                            },
                            "100%": {
                                opacity: 1,
                                transform: "translateX(0)",
                            },
                        },
                    }} 
                />
                <Box sx={{ display: "flex", gap: "0.05em" }}>
                    {subtitle.split(" ").map((word, index) => (
                        <Box key={index} sx={{ display: "flex" }}>
                            <Box
                                component="span"
                                sx={{
                                    animation: `slideInRight 0.6s ease-out ${0.8 + index * 0.1}s both`,
                                    "@keyframes slideInRight": {
                                        "0%": {
                                            opacity: 0,
                                            transform: "translateX(-20px)",
                                        },
                                        "100%": {
                                            opacity: 1,
                                            transform: "translateX(0)",
                                        },
                                    },
                                }}
                            >
                                {word}
                            </Box>
                            {index < subtitle.split(" ").length - 1 && (
                                <Box
                                    component="span"
                                    sx={{
                                        width: "0.3em",
                                        animation: `slideInRight 0.6s ease-out ${0.8 + index * 0.1 + 0.05}s both`,
                                        "@keyframes slideInRight": {
                                            "0%": {
                                                opacity: 0,
                                                transform: "translateX(-20px)",
                                            },
                                            "100%": {
                                                opacity: 1,
                                                transform: "translateX(0)",
                                            },
                                        },
                                    }}
                                >
                                    &nbsp;
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
                <Security 
                    sx={{ 
                        fontSize: "1.2rem", 
                        color: "#ffd700",
                        animation: "slideInRight 0.8s ease-out 1.2s both",
                        "@keyframes slideInRight": {
                            "0%": {
                                opacity: 0,
                                transform: "translateX(30px)",
                            },
                            "100%": {
                                opacity: 1,
                                transform: "translateX(0)",
                            },
                        },
                    }} 
                />
            </Typography>
        </Box>
    )
}
