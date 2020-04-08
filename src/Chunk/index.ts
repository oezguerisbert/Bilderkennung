import Pixel, { Color } from '../Pixel';

export default class Chunk {
    private startX: number = 0;
    private startY: number = 0;
    private pixels: Array<Pixel> = new Array<Pixel>();
    constructor() {}
    public addPixel(pixel: Pixel) {
        this.pixels.push(pixel);
    }
    public getPixels(): Array<Pixel> {
        return this.pixels;
    }
    public averageColor(): Color {
        let avgR = 0;
        let avgG = 0;
        let avgB = 0;
        let avgA = 0;
        this.pixels.forEach((pixel) => {
            avgR += pixel.getColor().getR();
            avgG += pixel.getColor().getG();
            avgB += pixel.getColor().getB();
            avgA += pixel.getColor().getA();
        });
        avgR /= this.pixels.length;
        avgB /= this.pixels.length;
        avgG /= this.pixels.length;
        avgA /= this.pixels.length;

        avgR = Math.floor(avgR);
        avgG = Math.floor(avgG);
        avgB = Math.floor(avgB);
        avgA = Math.floor(avgA);

        let c = new Color(avgR, avgG, avgB, avgA);
        return c;
    }
}
export interface ChunkI {
    width: number;
    height: number;
}
