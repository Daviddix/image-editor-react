export default function applyFilter(canvasRef, src, rangeValue, filter) {
  const canvas = canvasRef.current;

  function clamp(value) {
    return Math.min(255, Math.max(0, value));
  }

  function mappedValue(val){
    return ((val + 100) / 200) * 2
  }

  if (filter == "Brightness") {
    const image = new Image();
    image.src = src;
    image.onload = function () {
      canvasRef.current.width = image.width;
      canvasRef.current.height = image.height;
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] += (255 - data[i]) * (rangeValue / 100);
        data[i + 1] += (255 - data[i + 1]) * (rangeValue / 100);
        data[i + 2] += (255 - data[i + 2]) * (rangeValue / 100);
      }
      ctx.putImageData(imageData, 0, 0);
    };

  } else if (filter == "Saturation") {

    var ctx = canvas.getContext("2d");

    // Load the image onto the canvas
    var img = new Image();
    img.src = src


    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var dA = imageData.data;


      var sv = mappedValue(rangeValue); // saturation value. 0 = grayscale, 1 = original

    var luR = 0.3086; 
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
  } else if (filter == "Contrast") {
    // Get the canvas element and its context
    var ctx = canvas.getContext("2d");

    // Load the image onto the canvas
    var img = new Image();
    img.src = src; // Replace with the path to your image
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Function to adjust contrast

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var factor = (259 * (rangeValue + 255)) / (255 * (259 - rangeValue));

      for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        // Adjust contrast for each channel (red, green, blue)
        data[i] = clamp(factor * (r - 128) + 128);
        data[i + 1] = clamp(factor * (g - 128) + 128);
        data[i + 2] = clamp(factor * (b - 128) + 128);
      }

      // Put the modified image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    };
  } else if (filter == "Vibrance") {
    var ctx = canvas.getContext("2d");

    // Load the image onto the canvas
    var img = new Image();
    img.src = src; // Replace with the path to your image
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Function to adjust vibrance

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        var maxRGB = Math.max(r, g, b);
        var avgRGB = (r + g + b) / 3;
        var maxSaturation = maxRGB - avgRGB;

        // Calculate the amount to boost the saturation based on vibranceValue
        var boost = (maxSaturation / 255) * rangeValue;

        // Apply the boost to the less saturated colors
        r += boost * (r - avgRGB);
        g += boost * (g - avgRGB);
        b += boost * (b - avgRGB);

        // Ensure the RGB values are within the valid range [0, 255]
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        // Update the pixel data
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }

      // Put the modified image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    };
  } else if (filter == "Hue") {
    // Load the image onto the canvas

    // Load the image onto the canvas
    var img = new Image();
    img.src = src; // Replace with the path to your image
    img.onload = function () {
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var hueRadians = (rangeValue / 360) * 2 * Math.PI;

      for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        // Convert RGB to HSL
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var l = (max + min) / 2;
        var d = max - min;

        var h, s;

        if (d === 0) {
          h = s = 0; // Achromatic
        } else {
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
              break;
            case g:
              h = ((b - r) / d + 2) / 6;
              break;
            case b:
              h = ((r - g) / d + 4) / 6;
              break;
          }
        }

        // Adjust hue
        h += hueRadians;

        if (h < 0) h += 1;
        if (h > 1) h -= 1;

        // Convert HSL back to RGB
        var c = (1 - Math.abs(2 * l - 1)) * s;
        var x = c * (1 - Math.abs(((h * 6) % 2) - 1));
        var m = l - c / 2;

        var newR, newG, newB;

        if (h < 1 / 6) {
          newR = c;
          newG = x;
          newB = 0;
        } else if (h < 2 / 6) {
          newR = x;
          newG = c;
          newB = 0;
        } else if (h < 3 / 6) {
          newR = 0;
          newG = c;
          newB = x;
        } else if (h < 4 / 6) {
          newR = 0;
          newG = x;
          newB = c;
        } else if (h < 5 / 6) {
          newR = x;
          newG = 0;
          newB = c;
        } else {
          newR = c;
          newG = 0;
          newB = x;
        }

        data[i] = (newR + m) * 255;
        data[i + 1] = (newG + m) * 255;
        data[i + 2] = (newB + m) * 255;
      }

      // Put the modified image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    };
  } else if (filter == "Noise") {
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = src; // Replace with the path to your image
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Function to add noise to the canvas

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
        // Generate random noise values for each channel (RGB)
        var noise = Math.floor(Math.random() * (rangeValue + 1)); // Random noise between 0 and intensity

        // Add noise to each color channel
        data[i] = Math.min(data[i] + noise, 255); // Red
        data[i + 1] = Math.min(data[i + 1] + noise, 255); // Green
        data[i + 2] = Math.min(data[i + 2] + noise, 255); // Blue
      }

      // Put the modified image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    };
  } else if (filter == "Blur") {
    var ctx = canvas.getContext("2d");
    var image = new Image();
    image.src = src; // Replace with the path to your image
    image.onload = function () {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply the blur effect
    ctx.filter = `blur(${rangeValue}px)`;

    // Redraw the image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else if (filter == "Pixellate") {
    var ctx = canvas.getContext("2d");

    // Load the image onto the canvas
    var img = new Image();
    img.src = src; // Replace with the path to your image
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Function to apply the pixellation effect

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;

      // Calculate the size of the pixels
      var pixelSize = Math.max(1, Math.floor(rangeValue));

      for (var y = 0; y < canvas.height; y += pixelSize) {
        for (var x = 0; x < canvas.width; x += pixelSize) {
          // Get the color of the pixel at the top-left corner of the block
          var pixelIndex = (y * canvas.width + x) * 4;
          var r = data[pixelIndex];
          var g = data[pixelIndex + 1];
          var b = data[pixelIndex + 2];

          // Fill the entire block with the color of the top-left pixel
          for (var blockY = y; blockY < y + pixelSize; blockY++) {
            for (var blockX = x; blockX < x + pixelSize; blockX++) {
              var blockIndex = (blockY * canvas.width + blockX) * 4;
              data[blockIndex] = r;
              data[blockIndex + 1] = g;
              data[blockIndex + 2] = b;
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    // Put the modified image data back onto the canvas
  }
}
