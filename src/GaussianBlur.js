const gaussian = (x, y, t) => {
    return 1/(2 * Math.PI * t) * Math.exp(-(x*x + y*y)/(2 * t));
}

export const gaussianKernel = (t, size) => {
    const kernel = [...Array(size)].map(e => Array(size)); 
    for(let i=0; i<size; i++){
        for(let j=0; j<size; j++){
            kernel[i][j] = gaussian(-size + i +1 , -size + j + 1, t);
        }
    }
    return kernel;
}