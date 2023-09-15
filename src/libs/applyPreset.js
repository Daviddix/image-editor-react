export default function applyPreset(ctx, canvasRef, preset){
  var imageData = ctx.getImageData(0,0, canvasRef.current.width, canvasRef.current.height)

    var data = imageData.data

  if (preset == "Sepia") {
      for(var i = 0; i<data.length; i+=4){
      var r = data[i]
      var g = data[i + 1]
      var b = data[i + 2]

      data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189)
      data[i + 1] = (r * 0.349) + (g * 0.689) + (b * 0.168)
      data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131)
    }
  }
  else if(preset == "Orange"){
    for(var i = 0; i<data.length; i+=4){
      var r = data[i]
      var g = data[i + 1]
      var b = data[i + 2]

      data[i] = r * 1.2
      data[i + 1] = g * 0.7
      data[i + 2] = b * 0.2
    }
  }
  else if(preset == "Grayscale"){
    for (var i = 0; i < data.length; i+=4) {
      
      let average = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = average
      data[i + 1] = average
      data[i + 2] = average      
    }
    
  }
  else if(preset == "Love"){
    for(var i = 0; i<data.length; i+=4){
      
      data[i] += 50
      data[i + 1] -= 50
      data[i + 2] += 50
    }
  }
  else if(preset == "Kodachrome"){
    for(var i = 0; i<data.length; i+=4){
      
      data[i] = Math.min(355, data[i] * 2.9)
      data[i + 1] = Math.min(255, data[i + 1] * .6)
      data[i + 2] = Math.min(255, data[i + 3] * 0.6)
    }
  }
  else if(preset == "Snow"){
    for(var i = 0; i<data.length; i+=7){
      
      data[i] = Math.min(355, data[i] *3.9)
      data[i + 1] = Math.min(255, data[i + 1] * 6.6)
      data[i + 2] = Math.min(255, data[i + 3] * 4.6)
    }
  }
  else if(preset == "B/W"){
    for(var i = 0; i<data.length; i+=4){
      const threshold = 100
      const brightness = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])

      data[i] = data[i + 1] = data[i + 2] = brightness < threshold? 0 : 255
    }
  }
  else if(preset == "Polaroid"){
    for(var i = 0; i<data.length; i+=4){
      data[i] -= 30
      data[i + 1] -= 50
      data[i + 2] += 50
    }
  }
  else if(preset == "Gotham"){
    for(var i = 0; i<data.length; i+=4){
      data[i] -= 30
      data[i + 1] -= 30
      data[i + 2] -= 80
    }
  }
  ctx.putImageData(imageData, 0, 0)
}