import { number, sort } from 'mathjs';
import {norm256} from './HelperFunctions'
const linspace = (start, end, N) => {
    let res = Array(N);

    let step = (end - start) / (N - 1);

    for(let i = 0; i < N; i++)
        res[i] = start + step * i;

    return res;
}

export const find_local_max = arr => {
    let height = arr.length;
    let width = arr[0].length;

    let index_arr = [];
    let value_arr = [];
    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            if(arr[i][j] !== 0){ // Zero is not an interesting peak
                //  tl tj tr
                //  il XX ir
                //  bl bj br

                let l = j!==0 ? j-1 : j;
                let r = j!==width-1 ? j+1 : j;

                let t = i!==0 ? i-1 : i;
                let b = i!==height-1 ? i+1 : i;

                let val = arr[i][j]
                let is_local_max = val>=arr[t][l] && val>=arr[t][j] && val>=arr[t][r] && 
                    val>=arr[i][l] && val>=arr[i][r] &&
                    val>=arr[b][l] && val>=arr[b][j] && val>=arr[b][r];

                if(is_local_max){
                    index_arr.push([i, j]);
                    value_arr.push(val);
                }
            }

        }
    }

    return [index_arr, value_arr];
}
export const get_accumulator = (arr, magnitude, N_rho, N_theta) => {
    let height = arr.length;
    let width = arr[0].length;

    let hyp = Math.round(Math.sqrt(height * height + width * width));
    
    let theta_arr = linspace(-Math.PI / 2, Math.PI, N_theta);

    // Pre-calculate trig values
    let cos_arr = new Array(N_theta);
    let sin_arr = new Array(N_theta);
    for(let t_i=0; t_i < N_theta; t_i++){
        cos_arr[t_i] = Math.cos(theta_arr[t_i])
        sin_arr[t_i] = Math.sin(theta_arr[t_i])
    }

    
    let acc = Array(N_rho).fill().map(() => Array(N_theta).fill(0));
    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            if(arr[i][j]===255){ // If the coordinate is an edge
                // Tranform coordinates
                let x_t = j - width / 2;
                let y_t = -i + height / 2;

                // Loop over thetas
                for(let t_i=0; t_i < N_theta; t_i++){
                    // Compute rho
                    let rho = x_t * cos_arr[t_i] + y_t * sin_arr[t_i];

                    // Find index for rho in accumulator space  
                    let r_i = Math.floor(N_rho * (rho + hyp / 2) / hyp)
                    //console.log({r_i, x_t, y_t, hyp, rho})§
                    acc[r_i][t_i] += Math.abs(magnitude[i][j]) // h(x) = x
                }

            }
        }
    }

    return acc;
}

const dsu = (arr1, arr2) => arr1
  .map((item, index) => [arr2[index], item]) // add the args to sort by
  .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
  .map(([, item]) => item); // extract the sorted items

export const calculate_lines = (accumulator, magnitude, N_lines, N_rho, N_theta) => {
    let height = magnitude.length;
    let width = magnitude[0].length;

    let hyp = Math.round(Math.sqrt(height * height + width * width));

    let rho_arr = linspace(-hyp / 2, hyp / 2, N_rho); 
    let theta_arr = linspace(-Math.PI / 2, Math.PI, N_theta);

    console.time("Local max");
    const [index_arr, value_arr] = find_local_max(accumulator);
    console.timeEnd("Local max");
    
            
    console.time("Sort")
    let sorted_index_arr = dsu(index_arr, value_arr)
    console.timeEnd("Sort")


    if(N_lines< sorted_index_arr.length)
        sorted_index_arr = sorted_index_arr.slice(0, N_lines);

    console.log(accumulator[sorted_index_arr[0][0]][sorted_index_arr[0][1]])
    let lines = [];
    let t = 500;
    for(let i=0; i<N_lines; i++){
        let rho = rho_arr[sorted_index_arr[i][0]];
        let theta = theta_arr[sorted_index_arr[i][1]];

        let a = Math.cos(theta);
        let b = Math.sin(theta);

        let x0 = a * rho;
        let y0 = b * rho;

        let x1 = Math.round(x0 - t * b) + width / 2;
        let y1 = -Math.round(y0 + t * a) + height / 2;
        let x2 = Math.round(x0 + t * b) + width / 2;
        let y2 = -Math.round(y0 - t * a) + height / 2;

        lines.push([x1, y1, x2, y2]);
    }

    return lines
}
