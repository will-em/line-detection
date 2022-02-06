import { norm256, magnitude, angle, non_max_sup, transpose} from './HelperFunctions';
import {gaussianMask} from './GaussianBlur';
import {convolve2d} from './Convolution';

export const edges = (mat, variance) => {
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

    return new_G;
}

export const hysteris_thresholding = (arr, low, high) => {

    let height = arr.length;
    let width = arr[0].length;

    /*
    let min = getMin(arr);
    let max = getMax(arr);

    let diff = max - min;
    let t_low = min + low * diff;
    let t_high = min + high * diff;
    */
    let t_low = low;
    let t_high = high;

    //let temp_arr = Array(height).fill().map(() => Array(width).fill(0)); // Fill with intermediate pixels
    let temp_arr = [...Array(height)].map(e => Array(width)); 

    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            temp_arr[i][j] = arr[i][j];
        }
    }
    let num_of_ones = 1
    let old_num_of_ones = 2;
    while(num_of_ones !== old_num_of_ones){
        old_num_of_ones = num_of_ones;
        num_of_ones = 0;
        // Assign pixel values
        for(let i=0; i<height; i++){
            for(let j=0; j<width; j++){
                if(temp_arr[i][j] > t_high){ // Strong pixels
                    temp_arr[i][j] = 255;
                    num_of_ones++;
                }
                else if(temp_arr[i][j] < t_low){ // Weak pixels
                    temp_arr[i][j] = 0;
                }
                else{ // Check if intermediate pixels are chained to strong pixels

                    let im1 = i - 1 < 0 ? 0 : i - 1;
                    let ip1 = i + 1 > height - 1 ?  height - 1 : i + 1;

                    let jm1 = j - 1 < 0 ? 0 : j - 1;
                    let jp1 = j + 1 > width - 1 ?  width - 1 : j + 1;
                    let eight_neighborhood = [temp_arr[im1][jm1], temp_arr[im1][j], temp_arr[im1][jp1], temp_arr[i][jm1],
                        temp_arr[i][jp1], temp_arr[ip1][jm1], temp_arr[ip1][j], temp_arr[ip1][jp1]];
                    
                    for(let k = 0; k<eight_neighborhood.length; k++){
                        if(eight_neighborhood[k] > t_high){ // If the pixel has a strong neighbor
                            temp_arr[i][j] = 255;
                            num_of_ones++;
                            break;
                        }
                    }
                }

            }
        }
    }
    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            if(temp_arr[i][j] < 255){
                temp_arr[i][j] = 0;
            }
        }
    }




    return temp_arr;

}