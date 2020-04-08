import * as Jimp from 'jimp';
import Chunk, { ChunkI } from './src/Chunk';
import Pixel, { Color } from './src/Pixel';
Jimp.read('input/img.jpg', (err: Error, image) => {
    if (err) throw err;
    let image2 = image;
    let width = image2.getWidth();
    let height = image2.getHeight();
    let chunkoptions: ChunkI = {
        width: 0,
        height: 0,
    };
    let howManyChunksPerRow = 2; //that many chunks per row / column

    chunkoptions.width = Math.floor(width / howManyChunksPerRow);
    chunkoptions.height = Math.floor(height / howManyChunksPerRow);
    let squareCh = howManyChunksPerRow * howManyChunksPerRow;
    let chunks: Array<Jimp> = new Array<Jimp>();
    for (let i = 0; i < howManyChunksPerRow; i++) {
        for (let j = 0; j < howManyChunksPerRow; j++) {
            let x = i * chunkoptions.width;
            let y = j * chunkoptions.height;
            // console.log(`${x},${y}`);
            let url = `output/cut/img-x${x}-y${y}.png`;
            chunks.push(
                image
                    .cloneQuiet()
                    .cropQuiet(x, y, chunkoptions.width, chunkoptions.height)
            );
        }
    }
    for (let i = 0; i < chunks.length; i++) {
        let img = chunks[i];
        img.write(`output/cut/${chunks.indexOf(img)}.png`);
    }

    image2.write('output/img.png');
});
