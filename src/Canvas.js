import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import {image_to_grayscale, grayscale_arr_to_image, array_to_mat, flatten, 
    norm256} from './HelperFunctions';

import {edges, hysteris_thresholding} from './CannyEdgeDetection';
import { get_accumulator, find_local_max, calculate_lines} from './HoughTransform';
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
    const [magnitude, setMagnitude] = useState(null);
    const [hystImage, setHystImage] = useState(null);
    const [lines, setLines] = useState(null);
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
            let mat = array_to_mat([...grayscaleArr], imageData.width);

            const [edge_mat, magnitude] = edges(mat, variance);
            setEdgeImage(edge_mat);
            setMagnitude(magnitude);

       } 
    }, [image, variance, generate, dim])


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if(image && canvas && edgeImage){
            let imageData = ctx.getImageData(0, 0, canvas.width/2, canvas.height/2);
            // Thresholding
            let thresholded = hysteris_thresholding(edgeImage, low_t, high_t);
            
            // Normalizing 
            norm256(thresholded); 

            setHystImage(thresholded);

            //thresholding(test, 0); 
            let filteredImageArr = flatten(thresholded);
            grayscale_arr_to_image(filteredImageArr, imageData)
            
            ctx.putImageData(imageData, canvas.width/2, 0)
        }

    }, [edgeImage, low_t, high_t])

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if(image && canvas && hystImage && magnitude){
            let imageData = ctx.getImageData(0, canvas.height/2, canvas.width/2, canvas.height/2);

            console.time("Accumulator")
            const accumulator = get_accumulator(hystImage, magnitude, hystImage.length, hystImage[0].length);
            console.timeEnd("Accumulator")

            let accumulatorArr = flatten(accumulator);
            grayscale_arr_to_image(accumulatorArr, imageData);

            ctx.putImageData(imageData, 0, canvas.height/2);

            let line_arr = calculate_lines(accumulator);

            setLines(line_arr);
        }
    }, [hystImage])

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if(image && canvas && hystImage && magnitude && lines){
            ctx.drawImage(image, canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);
        }
    }, [lines])

    return (
        <canvas id="responsive-canvas" ref={canvasRef} />
    );
}

export default Canvas;