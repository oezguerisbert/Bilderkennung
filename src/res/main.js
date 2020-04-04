let imageCapture = null;
let canvas = null;
$(document).ready(() => {
    canvas = $('canvas')[0];
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
                let mediaStreamTrack = stream.getVideoTracks()[0];
                imageCapture = new ImageCapture(mediaStreamTrack);
                setTimeout(update, 1000 / 60);
            })
            .catch(function (e) {});
    }
});
function update() {
    imageCapture
        .grabFrame()
        .then((img) => {
            canvas.width = getComputedStyle(canvas).width.split('px')[0];
            canvas.height = getComputedStyle(canvas).height.split('px')[0];

            let x = canvas.width / 2 - img.width / 2;
            let y = canvas.height / 2 - img.height / 2;
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width, img.height);
            let imgData = ctx.getImageData(x, y, img.width, img.height);
            let pixels = [];
            for (let index = 0; index < imgData.data.length; index += 4) {
                pixels.push({
                    x: index % img.width,
                    y: Math.floor(index / img.height) + 1,
                    color: {
                        r: imgData.data[index],
                        b: imgData.data[index + 1],
                        g: imgData.data[index + 2],
                        a: imgData.data[index + 3],
                    },
                });
            }
        })
        .catch((e) => {});
    setTimeout(update, 1000 / 60);
}
