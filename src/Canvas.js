import React, { useEffect, useRef } from 'react'

function Canvas() {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeiht * 2;
        
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

    }, [])

    return (
        <canvas ref={canvasRef} />
    );
}

export default Canvas;