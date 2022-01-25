import React, { useEffect, useState} from 'react';
import './App.css';
import Canvas from "./Canvas"
import VarSlider from "./VarSlider"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  const [variance, setVariance] = useState(1);
  const [image, setImage] = useState(null);

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
      <Canvas variance={variance} uploadedImage={image}/>
      <Stack id="stack" spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VarSlider setVariance={setVariance}/>
        <Button variant="contained">Generate</Button>
        <Button variant="contained" component="label">Upload<input type="file" hidden onChange={imageReader}/></Button>
      </Stack>
    </div>
  );
}

export default App;
