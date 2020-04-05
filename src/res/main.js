let imageCapture = null;
let canvas = null;
let video = null;
let streams = null;
let fps = 30;
let ratio = 0.75;
let opts = {
    video: {
        width: Math.floor(1280 * ratio),
        height: Math.floor(720 * ratio),
    },
};
$(document).ready(() => {
    video = $('video')[0];
    canvas = $('canvas')[0];
    setTimeout(() => {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia(opts)
                .then(function (stream) {
                    streams = stream;
                    video.srcObject = streams;
                    video.play();
                    setTimeout(update, 1000 / fps);
                })
                .catch(function (e) {
                    console.trace(e);
                });
        }
    }, 100);
});
function update() {
    let canvas2 = new OffscreenCanvas(opts.video.width, opts.video.height);
    let ctx = canvas2.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < imgData.data.length; index += 4) {
        let color = {
            r: imgData.data[index],
            b: imgData.data[index + 1],
            g: imgData.data[index + 2],
            a: imgData.data[index + 3],
        };
        // let x = index % opts.video.width;
        // let y = Math.floor(index / opts.video.height) + 1;

        // let tolerance = 10;
        // let tol = tolerance / 100;
        // let lighter = {
        //     r: Math.max(255, Math.floor(color.r * (1 + tol))),
        //     b: Math.max(255, Math.floor(color.b * (1 + tol))),
        //     g: Math.max(255, Math.floor(color.g * (1 + tol))),
        //     a: Math.max(255, Math.floor(color.a * (1 + tol))),
        // };
        // let darker = {
        //     r: Math.min(0, Math.floor(color.r * (1 - tol))),
        //     b: Math.min(0, Math.floor(color.b * (1 - tol))),
        //     g: Math.min(0, Math.floor(color.g * (1 - tol))),
        //     a: Math.min(0, Math.floor(color.a * (1 - tol))),
        // };
    }
    canvas.getContext('2d').putImageData(imgData, 0, 0);
    setTimeout(update, 1000 / fps);
}

function inRange(p, min, max) {
    return (
        p.r >= min.r &&
        p.r <= max.r &&
        p.g >= min.g &&
        p.g <= max.g &&
        p.b >= min.g &&
        p.g <= max.g &&
        p.a >= min.a &&
        p.a <= max.a
    );
}
