import './App.css';
import Canvas from "./Canvas"
import VarSlider from "./VarSlider"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  return (
    <div>
      <Canvas/>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VarSlider/>
        <Button variant="contained">Generate</Button>
      </Stack>
    </div>
  );
}

export default App;
