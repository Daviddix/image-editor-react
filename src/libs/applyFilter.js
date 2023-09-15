export default function applyFilter(canvasRef, src, rangeValue, filter){
    const canvas = canvasRef.current

    if(filter == "Brightness"){
        const image = new Image()
        image.src = src  
        image.onload = function() {
          canvasRef.current.width = image.width;
          canvasRef.current.height = image.height;
          const ctx = canvasRef.current.getContext('2d');
          ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0,0, canvas.width, canvas.height)
        const data = imageData.data
    
        for (let i = 0; i < data.length; i+=4) {
          data[i] += (255 - data[i]) * (rangeValue / 100)
          data[i + 1] += (255 - data[i + 1]) * (rangeValue / 100)
          data[i + 2] += (255 - data[i + 2]) * (rangeValue / 100)
           
          
        }
        ctx.putImageData(imageData, 0,0)
    }
    }
    else if(filter == "Saturation"){
      const ctx = canvasRef.current.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var dA = imageData.data; // raw pixel data in array

      var sv = rangeValue ; // saturation value. 0 = grayscale, 1 = original

      var luR = 0.3086; // constant to determine luminance of red. Similarly, for green and blue
      var luG = 0.6094;
      var luB = 0.082;

      var az = (1 - sv) * luR + sv;
      var bz = (1 - sv) * luG;
      var cz = (1 - sv) * luB;
      var dz = (1 - sv) * luR;
      var ez = (1 - sv) * luG + sv;
      var fz = (1 - sv) * luB;
      var gz = (1 - sv) * luR;
      var hz = (1 - sv) * luG;
      var iz = (1 - sv) * luB + sv;

      for (var i = 0; i < dA.length; i += 4) {
        var red = dA[i]; // Extract original red color [0 to 255]. Similarly for green and blue below
        var green = dA[i + 1];
        var blue = dA[i + 2];

        var saturatedRed = az * red + bz * green + cz * blue;
        var saturatedGreen = dz * red + ez * green + fz * blue;
        var saturateddBlue = gz * red + hz * green + iz * blue;

        dA[i] = saturatedRed;
        dA[i + 1] = saturatedGreen;
        dA[i + 2] = saturateddBlue;
      }

      ctx.putImageData(imageData, 0, 0);
    }
}