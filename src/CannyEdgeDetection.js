import {getMin, getMax} from './HelperFunctions'

export const hysteris_thresholding = (arr, low, high) => {

    let height = arr.length;
    let width = arr[0].length;

    let min = getMin(arr);
    let max = getMax(arr);

    let diff = max - min;
    let t_low = min + low * diff;
    let t_high = min + high * diff;

    let temp_arr = Array(height).fill().map(() => Array(width).fill(1)); // Fill with intermediate pixels

    let num_of_strong = 0
    // Assign pixel values
    for(let i=1; i<height-1; i++){
        for(let j=1; j<width-1; j++){
            if(arr[i][j] > t_high){ // Strong pixels
                temp_arr[i][j] = 2;
                num_of_strong++;
            }
            else if(arr[i][j] < t_low){ // Weak pixels
                temp_arr[i][j] = 0;
            }

        }
    }
    console.log(num_of_strong);
    console.log(t_high);
    console.log(diff);
    while(true){
        // Add weak pixels connected to chain of strong pixels
        let temp_num_of_strong = 0;
        for(let i=1; i<height-1; i++){
            for(let j=1; j<width-1; j++){
                let t_max = Math.max([temp_arr[i-1, j-1], temp_arr[i-1, j], temp_arr[i-1, j+1], temp_arr[i, j-1],
                    temp_arr[i, j+1], temp_arr[i+1, j-1], temp_arr[i+1, j], temp_arr[i+1, j+1]]);

                if(t_max == 2){
                    temp_arr[i, j] = 2;
                    temp_num_of_strong++;
                }

            }
        }
        
        if(num_of_strong == temp_num_of_strong)
            break;
        num_of_strong = temp_num_of_strong;
    }
        // Remove weak pixels

    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            if(temp_arr[i][j] == 1)
                temp_arr[i][j] = 0;
        }
    }


    return temp_arr;

}