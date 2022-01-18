import React, { useState, useEffect, useRef } from 'react';
import {convolve2d} from './Convolution';

function Canvas() {

    const [image, setImage] = useState(null);
    const [convolvedImage, setConvolvedImage] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        //canvas.style.width = `${window.innerWidth}px`;
        //canvas.style.height = `${window.innerHeight}px`;


        var imageObj = new Image();
        imageObj.src = 'https://i.stack.imgur.com/NlLrx.jpg'; 
        imageObj.onload = () => setImage(imageObj);
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        console.log(image);
        console.log(canvas);
       if(image && canvas){
           const ctx = canvas.getContext('2d');
           ctx.drawImage(image, 0, 0, canvas.width/2, canvas.height/2);

           const testArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
           const testKernal = [[1, 2], [3, 4]];

           console.log(convolve2d(testKernal, testArr))
           

       } 
    }, [image])

    return (
        <canvas ref={canvasRef} />
    );
}

export default Canvas;