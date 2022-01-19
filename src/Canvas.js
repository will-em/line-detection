import React, { useState, useEffect, useRef } from 'react';
import {convolve2d} from './Convolution';
import {image_to_grayscale, grayscale_arr_to_image} from './HelperFunctions'

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
        imageObj.src = require('./Images/tennis_court.jpeg'); 
        imageObj.onload = () => setImage(imageObj);
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        console.log(image);
        console.log(canvas);
        if(image && canvas){
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, canvas.width/2, canvas.height/2);

            /* TEST convolve2d FUNCTION
            const testArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            const testKernal = [[1, 2], [3, 4]];

            console.log(convolve2d(testKernal, testArr))
            */
            /*
            let grayscaleData = ctx.createImageData(canvas.width/2, canvas.height/2);
            let imageData = ctx.getImageData(0, 0, canvas.width/2, canvas.height/2);
            let data = imageData.data;
            grayscaleData.data = grayscale_to_RGBA(RGBA_to_grayscale(data));
            ctx.putImageData(grayscaleData, canvas.width/2, canvas.height/2)
            */

            let imageData = ctx.getImageData(0, 0, canvas.width/2, canvas.height/2);
            let grayscaleArr = image_to_grayscale(imageData); 
            console.log(imageData.data)
            grayscale_arr_to_image(grayscaleArr, imageData)
            console.log(imageData.data)
            ctx.putImageData(imageData, canvas.width/2, canvas.height/2)
       } 
    }, [image])

    return (
        <canvas ref={canvasRef} />
    );
}

export default Canvas;