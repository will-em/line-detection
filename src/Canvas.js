import React, { useState, useEffect, useRef } from 'react';
import {convolve2d} from './Convolution';
import {image_to_grayscale, grayscale_arr_to_image, array_to_mat, flatten, norm256, magnitude, thresholding} from './HelperFunctions'

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
        imageObj.src = require('./Images/stockholm.jpeg'); 
        imageObj.onload = () => setImage(imageObj);
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;

        if(image && canvas){
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, canvas.width/2, canvas.height/2);

            let imageData = ctx.getImageData(0, 0, canvas.width/2, canvas.height/2);
            let grayscaleArr = image_to_grayscale(imageData); 


            let mat_x = array_to_mat([...grayscaleArr], imageData.width);
            let mat_y = array_to_mat([...grayscaleArr], imageData.width);
            const kernel_x = [[1, 0, -1], [2, 0, -2], [1, 0, -1]];
            const kernel_y = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]];
            let G_x = convolve2d(kernel_x, mat_x);
            let G_y = convolve2d(kernel_y, mat_y);

            let G = magnitude(G_x, G_y) 
            
            norm256(G); 
            thresholding(G, 0); 
            let filteredImageArr = flatten(G);
            grayscale_arr_to_image(filteredImageArr, imageData)
            
            ctx.putImageData(imageData, canvas.width/2, 0)

       } 
    }, [image])

    return (
        <canvas ref={canvasRef} />
    );
}

export default Canvas;