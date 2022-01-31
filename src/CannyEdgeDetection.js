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

    let temp_arr = Array(height).fill().map(() => Array(width).fill(255)); // Fill with intermediate pixels

    for(let i=1; i<height - 1; i++){
        for(let j=1; j<width - 1; j++){
            temp_arr[i][j] = arr[i][j];
        }
    }
    //let temp_arr = arr;
    
    let num_of_ones = 1
    let old_num_of_ones = 2;
    while(num_of_ones != old_num_of_ones){
        old_num_of_ones = num_of_ones;
        num_of_ones = 0;
        // Assign pixel values
        for(let i=1; i<height - 1; i++){
            for(let j=1; j<width - 1; j++){
                if(temp_arr[i][j] > t_high){ // Strong pixels
                    temp_arr[i][j] = 255;
                    num_of_ones++;
                }
                else if(temp_arr[i][j] < t_low){ // Weak pixels
                    temp_arr[i][j] = 0;
                }
                else{ // Check if intermediate pixels are chained to strong pixels
                    let eight_neighborhood = [temp_arr[i-1][j-1], temp_arr[i-1][j], temp_arr[i-1][j+1], temp_arr[i][j-1],
                        temp_arr[i][j+1], temp_arr[i+1][j-1], temp_arr[i+1][j], temp_arr[i+1][j+1]];
                    
                    let has_neighbor = false;
                    for(let k = 0; k<eight_neighborhood.length; k++){
                        if(eight_neighborhood[k] > t_high)
                            has_neighbor = true;
                    }
                    
                    if(has_neighbor){
                        temp_arr[i][j] = 255;
                        num_of_ones++;
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