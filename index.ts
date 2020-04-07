import * as Jimp from 'jimp';

Jimp.read('input/img.jpg', (err: Error, image) => {
    if (err) throw err;
    image
        .resize(256, 256) // resize
        .quality(100) // set JPEG quality
        .write('output/image.jpg'); // save
    let bitmapData = image.bitmap.data;
    let width = image.getWidth();
    let height = image.getHeight();

    // for(let i=0;i<)
});
