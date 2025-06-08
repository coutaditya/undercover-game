import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function GameSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={3} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}
