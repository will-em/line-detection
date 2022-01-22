import React, { useState, useEffect, useRef } from 'react';
import Slider from '@mui/material/Slider';

function VarSlider() {
    const [value, setValue] = React.useState(1);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(newValue)
    };
  
    return (
        <Slider 
        value={value} 
        onChange={handleChange} 
        min={0.1}
        max={10}
        step={0.1}
        />
    );
  }

export default VarSlider;