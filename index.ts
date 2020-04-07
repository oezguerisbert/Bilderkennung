import * as Jimp from 'jimp';
import Chunk, { ChunkI } from './src/Chunk';
import Pixel, { Color } from './src/Pixel';
let chunks: Array<Chunk> = new Array<Chunk>();
Jimp.read('input/img.png', (err: Error, image) => {
    if (err) throw err;
    let image2 = image;
    let bitmapData = image2.bitmap.data;
    let width = image2.getWidth();
    let height = image2.getHeight();
    let chunkoptions: ChunkI = {
        width: 0,
        height: 0,
    };
    let howManyChunksPerRow = 4; //that many chunks per row / column
    if (width % 2 == 0) {
        // even width
        chunkoptions.width = width / howManyChunksPerRow;
    } else {
        chunkoptions.width = Math.floor(width / howManyChunksPerRow);
    }
    if (height % 2 == 0) {
        // even width
        chunkoptions.height = height / howManyChunksPerRow;
    } else {
        chunkoptions.height = Math.floor(height / howManyChunksPerRow);
    }
    let squareCh = howManyChunksPerRow * howManyChunksPerRow;

    for (let chunkIndex = 0; chunkIndex < squareCh / 2; chunkIndex++) {
        let otherChunkIndex = squareCh - chunkIndex - 1;
        let chunk1 = new Chunk();
        let chunk2 = new Chunk();
        for (let y = 0; y < chunkoptions.height; y++) {
            for (let x = 0; x < chunkoptions.width; x++) {
                let sIndex = chunkIndex * chunkoptions.width * y + x;
                let sIndex2 = otherChunkIndex * chunkoptions.width * y + x;

                let rIndex = sIndex;
                let gIndex = sIndex + 1;
                let bIndex = sIndex + 2;
                let aIndex = sIndex + 3;

                let r = bitmapData[rIndex];
                let g = bitmapData[gIndex];
                let b = bitmapData[bIndex];
                let a = bitmapData[aIndex];

                let pixel = new Pixel(
                    chunkIndex * x * y + x,
                    chunkIndex * y * x + y,
                    new Color(r, g, b, a)
                );
                chunk1.addPixel(pixel);

                let rIndex2 = sIndex;
                let gIndex2 = sIndex + 1;
                let bIndex2 = sIndex + 2;
                let aIndex2 = sIndex + 3;

                let r2 = bitmapData[rIndex2];
                let g2 = bitmapData[gIndex2];
                let b2 = bitmapData[bIndex2];
                let a2 = bitmapData[aIndex2];

                let pixel2 = new Pixel(
                    otherChunkIndex * x * y + x,
                    otherChunkIndex * y * x + y,
                    new Color(r2, g2, b2, a2)
                );
                chunk2.addPixel(pixel2);
            }
        }
        chunks.push(chunk1, chunk2);
    }
    chunks.forEach((c, chunkIndex) => {
        let avgColor = c.averageColor();
        for (let y = 0; y < chunkoptions.height; y++) {
            for (let x = 0; x < chunkoptions.width; x++) {
                let sIndex = chunkIndex * chunkoptions.width * y + x;

                let rIndex = sIndex;
                let gIndex = sIndex + 1;
                let bIndex = sIndex + 2;
                let aIndex = sIndex + 3;

                bitmapData[rIndex] = avgColor.getR();
                bitmapData[gIndex] = avgColor.getG();
                bitmapData[bIndex] = avgColor.getB();
                bitmapData[aIndex] = avgColor.getA();
            }
        }
    });
    console.log(
        `HMC: ${chunks.length}, CW: ${chunkoptions.width}, CH: ${chunkoptions.height}`
    );
    image.write("output/img.png");
});
let chunkoptions: ChunkI = {
    width: 0,
    height: 0,
};
