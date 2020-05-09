import Chunk, { ChunkI } from '../Chunk';
import Pixel, { Color } from '../Pixel';
import FilterNS from '../Filter';
import Jimp from 'jimp';
import { EventEmitter } from 'events';
// const opencv = require('./../../opencv.js');
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
            let howManyChunksPerRow = 2; //that many chunks per row / column

            chunkoptions.width = Math.floor(width / howManyChunksPerRow);
            chunkoptions.height = Math.floor(height / howManyChunksPerRow);
            let squareCh = howManyChunksPerRow * howManyChunksPerRow;

            //initialisierung Chunks (Array)
            this.chunks = new Array<Jimp>();
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
        this.applyFilter(filter, this.chunks);
    }
    private applyFilter(f: FilterNS.FilterTemplate, chunks: Array<Jimp>) {
        //Vorbereitung für Berechnen einrichten.
        let promises: Array<Promise<Set<Pixel>>> = new Array<
            Promise<Set<Pixel>>
        >();
        let overallPixelCount = 0;
        chunks.forEach((c) => {
            overallPixelCount += c.getWidth() * c.getHeight();
        });
        console.log(`Should be not exceeding: ${overallPixelCount}`);
        chunks.forEach((chunk) => {
            console.log(`preparing chunk '${chunks.indexOf(chunk)}'`);
            let prom = new Promise<Set<Pixel>>(
                async (resolve: Function, reject: Function) => {
                    f.apply(chunk)
                        .then((r) => resolve(r))
                        .catch((e) => console.error);
                }
            );
            promises.push(prom);
        });

        Promise.all(promises)
            .then((sets) => {
                // console.log(sets.length);
            })
            .catch((reason) => {
                console.log(reason.message, reason.index);
            })
            .finally(() => {
                console.log('done all.');
            });
    }
}
