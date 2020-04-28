import * as Jimp from 'jimp';
import Chunk, { ChunkI } from './src/Chunk';
import Pixel, { Color } from './src/Pixel';

// Bild lesen
Jimp.read('input/img.jpg', (err: Error, image) => {
    if (err) throw err;
    //Bildobjekt-Kopie
    let image2 = image;

    //Bilddaten (groeßen)
    let width = image2.getWidth();
    let height = image2.getHeight();

    //Chunkoptionen [einzelne Teilbilder - Eigenschaften]
    let chunkoptions: ChunkI = {
        width: 0,
        height: 0,
    };
    let howManyChunksPerRow = 4; //that many chunks per row / column

    chunkoptions.width = Math.floor(width / howManyChunksPerRow);
    chunkoptions.height = Math.floor(height / howManyChunksPerRow);
    let squareCh = howManyChunksPerRow * howManyChunksPerRow;

    //initialisierung Chunks (Array)
    let chunks: Array<Jimp> = new Array<Jimp>();
    for (let i = 0; i < howManyChunksPerRow; i++) {
        for (let j = 0; j < howManyChunksPerRow; j++) {
            let x = i * chunkoptions.width;
            let y = j * chunkoptions.height;
            // console.log(`${x},${y}`);
            let url = `output/cut/img-x${x}-y${y}.png`;
            //Beladen der Chunks
            chunks.push(
                image
                    .cloneQuiet()
                    .cropQuiet(x, y, chunkoptions.width, chunkoptions.height)
            );
        }
    }
    //Ausschreiben der Chunks ins Dateisystem
    for (let i = 0; i < chunks.length; i++) {
        let img = chunks[i];
        img.write(`output/cut/${chunks.indexOf(img)}.png`);
    }

    image2.write('output/img.png');
});
