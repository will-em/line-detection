import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import {convolve2d} from './Convolution';
import {image_to_grayscale, grayscale_arr_to_image, array_to_mat, flatten, 
    norm256, magnitude, angle, non_max_sup, thresholding, transpose} from './HelperFunctions';

import {gaussianMask} from './GaussianBlur';
import {hysteris_thresholding} from './CannyEdgeDetection';
// Custom hook for window size
function useWindowSize() { 
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}


function Canvas({variance, uploadedImage, generate, setGenerate, low_t, high_t}) {

    const [image, setImage] = useState(null);
    const [edgeImage, setEdgeImage] = useState(null);
    const canvasRef = useRef(null);
    const dim = useWindowSize();

    useEffect(() => {
        if(!uploadedImage){
            var imageObj = new Image();
            imageObj.src = require('./Images/stockholm.jpeg'); 
            imageObj.onload = () => setImage(imageObj);
        }
    }, []);

    // Update image to uploaded image
    useEffect(() => { 
        if(uploadedImage)
            setImage(uploadedImage);
    }, [uploadedImage]);

    // Resize and redraw canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 36.5 - 25;
        setGenerate(false);
        if(image && canvas){
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, canvas.width/2, canvas.height/2);

            let imageData = ctx.getImageData(0, 0, canvas.width/2, canvas.height/2);
            let grayscaleArr = image_to_grayscale(imageData); 


            // Blurring
            let mat = array_to_mat([...grayscaleArr], imageData.width);
            let gx= gaussianMask(variance);
            let gy = transpose(gx);
            console.time("Blur")
            mat = convolve2d(gx, mat);
            mat = convolve2d(gy, mat);

            console.timeEnd("Blur")
            // Edge detection

           //  SOBEL
            const kernel_x = [[1, 0, -1], [2, 0, -2], [1, 0, -1]];
            const kernel_y = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]];
            /*
            const kernel_x = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
            const kernel_y = [[1, 1, 1], [0, 0, 0], [-1, -1, -1]];
            */
            let G_x = convolve2d(kernel_x, mat);
            let G_y = convolve2d(kernel_y, mat);

            let G = magnitude(G_x, G_y); 
            let theta = angle(G_x, G_y); 
            console.time("SUP")
            let new_G = non_max_sup(G, theta);
            console.timeEnd("SUP")
            
            norm256(new_G);
            setEdgeImage(new_G);
            /*
            let test = hysteris_thresholding(new_G, low_t, high_t);

            // Normalizing 
            norm256(test); 

            // Thresholding
            thresholding(test, 0); 
            let filteredImageArr = flatten(test);
            grayscale_arr_to_image(filteredImageArr, imageData)
            
            ctx.putImageData(imageData, canvas.width/2, 0)
            */

       } 
    }, [image, variance, generate, dim])


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if(image && canvas && edgeImage){
            let imageData = ctx.getImageData(0, 0, canvas.width/2, canvas.height/2);
            let test = hysteris_thresholding(edgeImage, low_t, high_t);

            // Normalizing 
            norm256(test); 

            // Thresholding
            thresholding(test, 0); 
            let filteredImageArr = flatten(test);
            grayscale_arr_to_image(filteredImageArr, imageData)
            
            ctx.putImageData(imageData, canvas.width/2, 0)
        }

    }, [edgeImage, low_t, high_t])

    return (
        <canvas id="responsive-canvas" ref={canvasRef} />
    );
}

export default Canvas;