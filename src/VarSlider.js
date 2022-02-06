import React from 'react';
import Slider from '@mui/material/Slider';

function VarSlider({min, max, step, value, setValue, low_t}) {
  
    const handleChange = (event, newValue) => {
        // Make sure the higher threshold is larger than the lower one
        if(low_t){
            if(newValue >= low_t)
                setValue(newValue);
        }else{
            setValue(newValue);
        }
    };
  
    return (
        <Slider 
        value={value} 
        valueLabelDisplay="auto" 
        onChange={handleChange} 
        min={min}
        max={max}
        step={step}
        />
    );
  }

export default VarSlider;