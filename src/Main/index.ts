import Chunk, { ChunkI } from '../Chunk';
import Pixel, { Color } from '../Pixel';
import FilterNS from '../Filter';
import Jimp from 'jimp';
import { EventEmitter } from 'events';
export default class Main extends EventEmitter {
    private image2: Jimp = null;
    private chunks: Array<Jimp> = null;
    constructor() {
        super();

        // Bild lesen
        Jimp.read('input/img.jpg', (err: Error, image) => {
            if (err) throw err;
            this.image2 = image;

            //Bilddaten (groeßen)
            let width = this.image2.getWidth();
            let height = this.image2.getHeight();

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
            this.chunks = new Array<Jimp>(squareCh);
            for (let i = 0; i < howManyChunksPerRow; i++) {
                for (let j = 0; j < howManyChunksPerRow; j++) {
                    let x = i * chunkoptions.width;
                    let y = j * chunkoptions.height;

                    //Beladen der Chunks
                    this.chunks.push(
                        this.image2
                            .cloneQuiet()
                            .cropQuiet(
                                x,
                                y,
                                chunkoptions.width,
                                chunkoptions.height
                            )
                    );
                }
            }
            this.emit('ready');
        });
    }
    public start(): void {
        let filter: FilterNS.FilterTemplate = FilterNS.Filter.of(
            FilterNS.Filters.Contouring
        );
        this.parallelCalculate(filter, this.image2);
    }
    private parallelCalculate(f: FilterNS.FilterTemplate, image: Jimp) {
        // console.log(filter);

        f.apply(image);
    }
}
