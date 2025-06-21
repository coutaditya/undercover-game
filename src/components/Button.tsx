"use client"

import { Box, Button } from "@mui/material"
import type { SxProps } from "@mui/material"

interface ButtonProps {
    text: string
    onClick: () => void
    disabled?: boolean
    startIcon?: React.ReactNode
    variant?: "contained" | "outlined"
    sx?: SxProps
}

export default function CustomButton({
    text,
    onClick,
    startIcon,
    variant = "outlined",
    disabled,
    sx,
}: ButtonProps) {
    const defaultSx: SxProps = {
        color: "rgba(255,255,255,0.8)",
        borderColor: "rgba(255,255,255,0.3)",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        px: 4,
        py: 2,
        borderRadius: "12px",
        textTransform: "none",
        fontSize: "1.1rem",
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.05)",
        "&:hover": {
            borderColor: "#667eea",
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            color: "#667eea",
            transform: "translateY(-2px)",
        },
        transition: "all 0.3s ease",
    }

    return (
        <Box className="flex justify-center pt-8">
            <Button
                onClick={onClick}
                startIcon={startIcon}
                variant={variant}
                disabled={disabled}
                sx={{ ...defaultSx, ...sx } as SxProps}
            >
                {text}
            </Button>
        </Box>
    )
}