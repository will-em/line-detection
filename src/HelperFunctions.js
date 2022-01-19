export const image_to_grayscale = (ImageData) => { // Neglecting transparency 
    let grayArr = new Array(ImageData.width*ImageData.height);
    let j = 0;
    for(let i=0; i<grayArr.length; i++){
        grayArr[i] =  Math.round(0.299*ImageData.data[j] + 0.587*ImageData.data[j + 1] + 0.114*ImageData.data[j + 2]);
        j+=4;
    }

    return grayArr;
}

export const grayscale_arr_to_image = (arr, ImageData) => {
    let j = 0;
    for(let i=0; i<arr.length; i++){
        ImageData.data[j] = arr[i];
        ImageData.data[j + 1] = arr[i];
        ImageData.data[j + 2] = arr[i];
        ImageData.data[j + 3] = 255; // Full transparency 
        j+=4;
    }
}