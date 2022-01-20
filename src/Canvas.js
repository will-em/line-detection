import React, { useState, useEffect, useRef } from 'react';
import {convolve2d} from './Convolution';
import {image_to_grayscale, grayscale_arr_to_image, array_to_mat, flatten, norm256} from './HelperFunctions'

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
        imageObj.src = require('./Images/parrot.jpeg'); 
        imageObj.onload = () => setImage(imageObj);
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;

        if(image && canvas){
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, canvas.width/2, canvas.height/2);

            let imageData = ctx.getImageData(0, 0, canvas.width/2, canvas.height/2);
            let grayscaleArr = image_to_grayscale(imageData); 


            let mat = array_to_mat([...grayscaleArr], imageData.width);
            //let test = array_to_mat([1, 2, 3, 4, 5, 6], 2, 2);
            const kernel = [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, 0.5]];
            //const kernel = [[1]];
            //let filteredImage = mat;
            let filteredImage = convolve2d(kernel, mat);
            norm256(filteredImage); 
            let filteredImageArr = flatten(filteredImage);
            grayscale_arr_to_image(filteredImageArr, imageData)
            
            //grayscale_arr_to_image(grayscaleArr, imageData)
            ctx.putImageData(imageData, canvas.width/2, canvas.height/2)

       } 
    }, [image])

    return (
        <canvas ref={canvasRef} />
    );
}

export default Canvas;