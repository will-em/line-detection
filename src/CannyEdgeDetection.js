import {getMin, getMax} from './HelperFunctions'

export const hysteris_thresholding = (arr, low, high) => {

    let height = arr.length;
    let width = arr[0].length;

    let min = getMin(arr);
    let max = getMax(arr);

    /*
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
    while(num_of_ones != old_num_of_ones){
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
                        if(eight_neighborhood[k] > t_high){
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