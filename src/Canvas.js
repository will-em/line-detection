import React, { useState, useEffect, useRef } from 'react'

function Canvas() {

    const [image, setImage] = useState(null)
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;


        var imageObj = new Image();
        //imageObj.src = './Images/tennis_court.jpeg';
        imageObj.src = 'https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/06/38/88/06388833-01b9-bd2c-57a5-e3d5e9d4962f/logo_gsa_ios_color-0-1x_U007emarketing-0-0-0-6-0-0-0-85-220-0.png/1200x630wa.png'; 
        imageObj.onload = () => setImage(imageObj);

    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        console.log(image);
        console.log(canvas);
       if(image && canvas){
           const ctx = canvas.getContext('2d');
           ctx.fillStyle = 'purple';
           ctx.fillRect(0, 0, 1000, 1000);
           ctx.drawImage(image, 0, 0);

       } 
    }, [image])

    return (
        <canvas ref={canvasRef} />
    );
}

export default Canvas;