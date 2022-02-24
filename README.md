# Line detection running in browser 

A web app that allows users to find edges and lines in their uploaded images. 

All Image-processing is implemented <ins>from scratch</ins> using JavaScript arrays, including the multi-stage [Canny edge detector](https://en.wikipedia.org/wiki/Canny_edge_detector) and the [Hough Transform](https://en.wikipedia.org/wiki/Hough_transform). ReactJS is used for state management. 

### Click [here](https://will-em.github.io/line-detection/) to see progress so far.
![Progress image](images/website.png)

## Todo
1. Dynamically size gaussian kernel with variance by truncating elements lower than a fixed amount :white_check_mark:
2. Get image data from file upload, solve cross-origin issues :white_check_mark:
3. Interpolate accumulator image
4. Speed up blurring by filtering in the frequency domain, i.e implement FFT
5. Implement the [Generalized Hough Transform](https://en.wikipedia.org/wiki/Generalised_Hough_transform) to allow for detection of arbitrarily shaped features
