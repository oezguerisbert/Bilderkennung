let imageCapture = null;
let canvas = null;
let fps = 30;
let ratio = 0.75;
$(document).ready(() => {
    canvas = $('canvas')[0];
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: Math.floor(1280 * ratio),
                    heiht: Math.floor(720 * ratio),
                },
            })
            .then(function (stream) {
                console.log('??????');
                let mediaStreamTrack = stream.getVideoTracks()[0];
                imageCapture = new ImageCapture(mediaStreamTrack);
                setTimeout(update, 1000 / fps);
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
            pixels.forEach((p) => {
                let tolerance = 1;
                let tol = tolerance / 100;
                let pc = p.color;
                let lighter = {
                    r: Math.max(255, Math.floor(pc.r * (1 + tol))),
                    b: Math.max(255, Math.floor(pc.b * (1 + tol))),
                    g: Math.max(255, Math.floor(pc.g * (1 + tol))),
                    a: Math.max(255, Math.floor(pc.a * (1 + tol))),
                };
                let darker = {
                    r: Math.min(0, Math.floor(pc.r * (1 - tol))),
                    b: Math.min(0, Math.floor(pc.b * (1 - tol))),
                    g: Math.min(0, Math.floor(pc.g * (1 - tol))),
                    a: Math.min(0, Math.floor(pc.a * (1 - tol))),
                };
                // console.log(lighter, darker);
                let neighbour = {
                    north: pixels.filter((p2) => {
                        let bounds = p.y - 1 >= 0 && p2.y == p.y - 1;
                        return bounds;
                    }),
                    south: pixels.filter((p2) => {
                        let bounds = p.y + 1 <= img.height && p2.y == p.y + 1;
                        return bounds;
                    }),
                    west: pixels.filter((p2) => {
                        let bounds = p.x - 1 >= 0 && p2.x == p.x - 1;
                        return bounds;
                    }),
                    east: pixels.filter((p2) => {
                        let bounds = p.x + 1 <= img.width && p2.x == p.x + 1;
                        return bounds;
                    }),
                };
                // console.log(neighbour);
            });
            console.log(conts);
        })
        .catch((e) => {});
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
