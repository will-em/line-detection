// Create grayscale array from image data (RGBA -> grayscale)
export const image_to_grayscale = (ImageData) => { // Neglecting alpha (transparency)
    let grayArr = new Array(ImageData.width*ImageData.height);
    let j = 0;
    for(let i=0; i<grayArr.length; i++){
        grayArr[i] =  Math.round(0.299*ImageData.data[j] + 0.587*ImageData.data[j + 1] + 0.114*ImageData.data[j + 2]);
        j+=4;
    }

    return grayArr;
}

// Copy grayscale array onto image data
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


// Reshape array to 2D-array
export const array_to_mat = (arr, width) => {
    let mat = [];
    while(arr.length)
        mat.push(arr.splice(0, width))
    return mat;
}

// 2D-array to array
export const flatten = (arr) => {
    let height = arr.length;
    let width = arr[0].length;

    let flat = new Array(width*height);

    for(let i=0; i<width; i++){
        for(let j=0; j<height; j++){
            flat[i + j*width] = arr[j][i];
        }
    }

    return flat;
}

// Normalize 2D-array and multiply by 255
export const norm256 = (arr) => {
    let height = arr.length;
    let width = arr[0].length;
    let max = -10;
    for(let i=0; i<height; i++){
        let temp_max = Math.max(...arr[i])
        if(temp_max>max)
            max = temp_max;
    }
    if(max!==255){

        for(let i=0; i<height; i++){
            for(let j=0; j<width; j++){
                arr[i][j] = Math.round(255 * arr[i][j] / max);
            }
        }
    }
}

// Compute the magnitude of G from its components for each pixel
export const magnitude = (G_x, G_y) => {
    let height = G_x.length;
    let width = G_y[0].length;

    let G = [...Array(height)].map(e => Array(width)); 

    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            G[i][j] = Math.round(Math.sqrt(G_x[i][j] * G_x[i][j] + G_y[i][j] * G_y[i][j]));
        }
    }

    return G;
}

// Compute the angle of the gradient 
export const angle = (G_x, G_y) => {

    let height = G_x.length;
    let width = G_x[0].length;


    let theta = [...Array(height)].map(e => Array(width)); 


    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            theta[i][j] = Math.atan2(G_y[i][j], G_x[i][j]) * 180 / Math.PI;
        }
    }

    return theta;
}

export const non_max_sup = (G, angle) => {

    let height = G.length;
    let width = G[0].length;

    let new_img = Array(height).fill().map(() => Array(width).fill(0));
    

    for(let i=1; i<height-1; i++){
        for(let j=1; j<width-1; j++){
            if((angle[i][j] >= -22.5 && angle[i][j] <= 22.5) || (angle[i][j] <= -157.5 && angle[i][j] >= 157.5)){
                if(G[i][j] > G[i][j + 1] && G[i][j] > G[i][j -1])
                    new_img[i][j] = G[i][j];
            }else if((angle[i][j] >= 22.5 && angle[i][j] <= 67.5) || (angle[i][j] <= -112.5 && angle[i][j] >= -157.5)){
                if(G[i][j] > G[i + 1][j + 1] && G[i][j] > G[i - 1][j -1])
                    new_img[i][j] = G[i][j];

            }else if((angle[i][j] >= 67.5 && angle[i][j] <= 112.5) || (angle[i][j] <= -67.5 && angle[i][j] >= -112.5)){
                if(G[i][j] > G[i + 1][j] && G[i][j] > G[i - 1][j])
                    new_img[i][j] = G[i][j];
            
            }else if((angle[i][j] >= 112.5 && angle[i][j] <= 157.5) || (angle[i][j] <= -22.5 && angle[i][j] >= -67.5)){
                if(G[i][j] > G[i + 1][j - 1] && G[i][j] > G[i - 1][j + 1])
                    new_img[i][j] = G[i][j];
            }
        }
    }

    return new_img;
}


// Thresholding
export const thresholding = (arr, threshold) => {
    let height = arr.length;
    let width = arr[0].length;

    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            if(arr[i][j] < threshold)
                arr[i][j] = 0;
        }
    }
}

// Transpose, (row to column vector)
export const transpose = (arr) => {
    const arrCopy = [...arr]; // Shallow copy
    const transposed = new Array(arrCopy.length);
    for(let i=0; i<arrCopy[0].length; i++)
        transposed[i] = [arrCopy[0][i]];

    return transposed;
}

