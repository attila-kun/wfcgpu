function loadImage() {
  var resolve: (value: HTMLImageElement) => void, reject;

  var promise: Promise<HTMLImageElement> = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  var image = new Image();
  image.onload = onImageLoaded;
  image.src = 'samples/Village.png';

  function onImageLoaded() {
    resolve(image);
  }

  return promise;
}

function getPattern(context: CanvasRenderingContext2D, x: number, y: number, n: number) {
  return context.getImageData(x, y, n, n).data;
}

async function init() {
  var img = await loadImage();
  var canvas = <HTMLCanvasElement>document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  
  var N = 5,
      SAMPLE_WIDTH = img.width,
      SAMPLE_HEIGHT = img.height,
      patterns: Uint8ClampedArray[] = [];

  for (var i=0; i<SAMPLE_WIDTH-N-1; i++) {
    for (var j=0; j<SAMPLE_HEIGHT-N-1; j++) {
      patterns.push(getPattern(context, i, j, N));
    }
  }

  var debugCanvas = <HTMLCanvasElement>document.getElementById('debugCanvas');
  debugCanvas.width = (SAMPLE_WIDTH-N-1)*N;
  debugCanvas.height = (SAMPLE_HEIGHT-N-1)*N;

  var debugCanvasContext = debugCanvas.getContext('2d');
  var imageData = debugCanvasContext.createImageData(debugCanvas.width, debugCanvas.height);

  var counter = 0,
      pattern: Uint8ClampedArray; 

  for (var i=0; i<SAMPLE_WIDTH-N-1; i++) {
    for (var j=0; j<SAMPLE_HEIGHT-N-1; j++) {
      pattern = patterns[counter];
      
      var tempImageData = debugCanvasContext.createImageData(N, N);
      for (var k=0; k<pattern.length; k++) {
        tempImageData.data[k] = pattern[k];
      }
      debugCanvasContext.putImageData(tempImageData, i*N, j*N);
    
      counter++;
    }
  }
}

init();