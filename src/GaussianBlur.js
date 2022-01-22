const gaussian = (x, y, t) => {
    return 1/(2 * Math.PI * t) * Math.exp(-(x*x + y*y)/(2 * t));
}

// Return two gaussian
export const gaussianKernel = (t, size) => {
    const kernel = new Array(size); 
    for(let i=0; i<size; i++){
            kernel[i] = gaussian(-Math.floor(size/2) + i , 0, t);
    }
    return [kernel];
}