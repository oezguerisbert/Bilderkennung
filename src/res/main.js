$(document).ready(() => {
    var ctx = $('canvas')[0].getContext('2d');
    var draw = function (video, dt) {
        console.log(video);

        ctx.drawImage(video, 0, 0);
    };
    var myCamvas = new camvas(ctx, draw);
});
