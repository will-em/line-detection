const linspace = (start, end, N) => {
    let res = Array(N);

    let step = (end - start) / (N - 1);

    for(let i = 0; i < N; i++)
        res[i] = start + step * i;

    return res;
}

export const get_accumulator = (arr, N_rho, N_theta) => {
    let height = arr.length;
    let width = arr[0].length;

    let hyp = Math.round(Math.sqrt(height * height + width * width));
    
    let rho_arr = linspace(-hyp / 2, hyp / 2, N_rho);

    let theta_arr = linspace(-Math.PI / 2, Math.PI, N_theta);

    
}