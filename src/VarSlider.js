import React, { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';

function VarSlider({variance, setVariance}) {
  
    const handleChange = (event, newValue) => {
      setVariance(newValue);
    };
  
    return (
        <Slider 
        value={variance} 
        valueLabelDisplay="auto" 
        onChange={handleChange} 
        min={0.1}
        max={10}
        step={0.1}
        />
    );
  }

export default VarSlider;