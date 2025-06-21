// A slider component that allows the user to select a value between min and max
"use client"

import { Slider, Typography, Box, Paper } from "@mui/material"
// Typography: A component that displays text
// Box: A component that displays a box
// Paper: A component that displays a paper
// Slider: A component that allows the user to select a value between min and max
import { styled } from "@mui/material/styles"

// A styled slider component that allows the user to select a value between min and max
const StyledSlider = styled(Slider)(() => ({
  color: "#667eea",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "3px solid #667eea",
    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.5)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 6px 30px rgba(102, 126, 234, 0.7)",
      transform: "scale(1.1)",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-rail": {
    color: "rgba(255,255,255,0.2)",
    opacity: 1,
    height: 8,
  },
}))

// An interface that defines the props for the PlayerSlider component
// value: The current value of the slider
// onChange: A function that is called when the slider value changes
// min: The minimum value of the slider
// max: The maximum value of the slider
interface PlayerSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function PlayerSlider({ value, onChange, min = 3, max = 12 }: PlayerSliderProps) {
  return (
    <Paper
      elevation={12}
      className="p-8 mx-4"
      sx={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
      }}
    >
      <Box className="space-y-8">
        <Typography
          variant="h4"
          className="text-white font-bold text-center tracking-wide"
          sx={{
            mb: 4, // increases vertical spacing after heading
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            color: "#e5e5e5", // light gray (near white)
            fontFamily: "'Paralucent-light'",
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: "0.15em", // adds spacing between letters
          }}
        >
          Select Players
        </Typography>

        <Box className="px-6">
          <StyledSlider
            value={value}
            onChange={(_, newValue) => onChange(newValue as number)}
            min={min}
            max={max}
            step={1}
            marks={[
              { value: min, label: min.toString() },
              { value: Math.floor((min + max) / 2), label: Math.floor((min + max) / 2).toString() },
              { value: max, label: max.toString() },
            ]}
            sx={{
              "& .MuiSlider-markLabel": {
                color: "rgba(255,255,255,0.7)",
                fontWeight: "bold",
                fontSize: "1rem",
              },
            }}
          />

          <Box className="text-center mt-6">
            <Typography
              variant="h2"
              className="text-white font-bold"
              sx={{
                textShadow: "3px 3px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)",
              }}
            >
              {value}
            </Typography>
            <Typography variant="body1" className="text-gray-300 mt-2" sx={{
              fontFamily: "'Paralucent-light'",
              letterSpacing: "0.15em", // adds spacing between letters
            }}>
              Total Players
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}