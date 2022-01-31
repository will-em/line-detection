import React, { useEffect, useState} from 'react';
import './App.css';
import Canvas from "./Canvas"
import VarSlider from "./VarSlider"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  const [variance, setVariance] = useState(1);
  const [low_t, setLow_t] = useState(0.05);
  const [high_t, setHigh_t] = useState(0.5);
  const [image, setImage] = useState(null);
  const [generate, setGenerate] = useState(false);

  useEffect(() => {
    if(low_t > high_t)
      setHigh_t(low_t);
  },[low_t])

  const reader = new FileReader();
  const imageReader = e => {
    reader.onload = () => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = reader.result;

      setImage(img);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  return (
    <div>
      <Canvas variance={variance} uploadedImage={image} generate={generate} setGenerate={setGenerate}/>
      <Stack id="stack" spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VarSlider value={variance} setValue={setVariance} min={0.05} max={5} step={0.05}/>
        <VarSlider value={low_t} setValue={setLow_t} min={0.05} max={0.9} step={0.05}/>
        <VarSlider value={high_t} setValue={setHigh_t} min={0.05} max={0.9} step={0.05} low_t={low_t}/>
        <Button variant="contained" onClick={() => setGenerate(true)}>Generate</Button>
        <Button variant="contained" component="label">Upload<input type="file" hidden onChange={imageReader}/></Button>
      </Stack>
    </div>
  );
}

export default App;
