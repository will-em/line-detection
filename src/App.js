import React, { useState} from 'react';
import './App.css';
import Canvas from "./Canvas"
import VarSlider from "./VarSlider"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  const [variance, setVariance] = useState(1);
  return (
    <div>
      <Canvas variance={variance}/>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VarSlider setVariance={setVariance}/>
        <Button variant="contained" setVariance={setVariance}>Generate</Button>
      </Stack>
    </div>
  );
}

export default App;
