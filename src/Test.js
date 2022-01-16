export const print = () => {
    console.log("Funkar");
    //var imgd = [27,32,26,28,33,27,30,35,29,31.....]
    let ctx = document.getElementById("canvas").getContext('2d');
    // first, create a new ImageData to contain our pixels
    var imgData = ctx.createImageData(160, 120); // width x height
    var data = imgData.data;

    // copy img byte-per-byte into our ImageData
    for (var i = 0, len = 160 * 120 * 4; i < len; i++) {
        data[i] = 255 * i/len; 
    }

    // now we can draw our imagedata onto the canvas
    ctx.putImageData(imgData, 0, 0);
}