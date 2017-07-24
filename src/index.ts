function loadImage() {
  var resolve: (value: any) => void, reject;

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

async function init() {
  var img = await loadImage();
  var canvas = <HTMLCanvasElement>document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);
  console.log(img.src);
}

init();