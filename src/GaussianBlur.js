const gaussian = (x, y, t) => {
    return 1/(2 * Math.PI * t) * Math.exp(-(x*x + y*y)/(2 * t));
}

// Return two gaussian
export const gaussianMask = t => {

    // Calculate 
    let std_dev = Math.sqrt(t);
    let size = Math.ceil(6 * std_dev);
    if(size % 2 === 0)
        size++;

    const kernel = new Array(size); 
    for(let i=0; i<size; i++){
            kernel[i] = gaussian(-Math.floor(size/2) + i , 0, t);
    }
    return [kernel];
}