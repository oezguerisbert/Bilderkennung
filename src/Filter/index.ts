import Jimp from 'jimp';
import { RGBA } from '@jimp/core/types/etc';
import Pixel from '../Pixel';
import { Color } from '../Pixel/index';

namespace Filtering {
    /**
     *
     *
     * @export
     * @interface FilterInterace
     */
    export interface FilterInterface {
        matrix?: Array<number>;
        apply: Function;
    }
    /**
     *
     *
     * @export
     * @abstract
     * @class Filter
     */
    export abstract class Filter {
        public static of(f: Filters): FilterTemplate {
            let result: FilterTemplate = null;
            switch (f) {
                case Filters.Contouring:
                    result = new Contouring();
                    break;
            }
            return result;
        }
    }

    export class FilterTemplate {
        public apply(image: Jimp): Promise<Array<Set<Pixel>>> {
            return new Promise((resolve, reject) => {
                return reject({
                    message: 'No Command got used',
                    index: Number.NaN,
                });
            });
        }
    }

    /**
     * Dies ist die Filterliste
     *
     * @export
     * @enum {number}
     */
    export enum Filters {
        Contouring,
    }
    /**
     * Dies ist der Konturenfilter
     *
     * @export
     * @class Contouring
     * @extends {FilterTemplate}
     */
    export class Contouring extends FilterTemplate {
        constructor() {
            super();
        }
        /**
         * Applying a filter on an Image.
         *
         * @param {Jimp} image
         * @returns {Promise<Set<Pixel>>}
         * @memberof Contouring
         */
        public apply(image: Jimp): Promise<Array<Set<Pixel>>> {
            let result: Array<Set<Pixel>> = new Array<Set<Pixel>>();
            return new Promise<Array<Set<Pixel>>>(async (resolve, reject) => {
                let width = image.getWidth();
                let height = image.getHeight();
                let mask: Set<Pixel> = new Set<Pixel>();

                //Toleranz der Pixel
                let tolerance: Tolerance = {
                    overall: 0.1,
                };
                for (let x = 0; x <= width; x++) {
                    for (let y = 0; y <= height; y++) {
                        //jetziges Pixel
                        let currentPixel: RGBA = Jimp.intToRGBA(
                            image.getPixelColour(x, y)
                        );

                        //Nachbar-Pixel aufbereiten
                        let neighbours: Neighbourings = {};
                        if (y > 0 && y <= height) {
                            let c = Jimp.intToRGBA(
                                image.getPixelColour(x, y - 1)
                            );
                            neighbours.north = {
                                x: x,
                                y: y - 1,
                                color: {
                                    r: c.r,
                                    g: c.g,
                                    b: c.b,
                                    a: c.a,
                                },
                            };
                        }
                        if (y >= 0 && y < height) {
                            let c = Jimp.intToRGBA(
                                image.getPixelColour(x, y + 1)
                            );
                            neighbours.south = {
                                x: x,
                                y: y + 1,
                                color: {
                                    r: c.r,
                                    g: c.g,
                                    b: c.b,
                                    a: c.a,
                                },
                            };
                        }
                        if (x > 0 && x < width) {
                            let c = Jimp.intToRGBA(
                                image.getPixelColour(x + 1, y)
                            );
                            neighbours.east = {
                                x: x + 1,
                                y: y,
                                color: {
                                    r: c.r,
                                    g: c.g,
                                    b: c.b,
                                    a: c.a,
                                },
                            };
                        }
                        if (x >= 0 && x <= width) {
                            let c = Jimp.intToRGBA(
                                image.getPixelColour(x - 1, y)
                            );
                            neighbours.west = {
                                x: x - 1,
                                y: y,
                                color: {
                                    r: c.r,
                                    g: c.g,
                                    b: c.b,
                                    a: c.a,
                                },
                            };
                        }
                        let pix = {
                            x: x,
                            y: y,
                            color: {
                                r: currentPixel.r,
                                g: currentPixel.g,
                                b: currentPixel.b,
                                a: currentPixel.a,
                            },
                        };

                        let neighbourkeys = Object.keys(neighbours);

                        //Vergleich-Farben
                        let compareColors: CompareColors = {
                            lighter: null,
                            darker: null,
                        };
                        if (tolerance.overall) {
                            compareColors.lighter = {
                                r: Math.floor(
                                    pix.color.r * (1 + tolerance.overall)
                                ),
                                g: Math.floor(
                                    pix.color.g * (1 + tolerance.overall)
                                ),
                                b: Math.floor(
                                    pix.color.b * (1 + tolerance.overall)
                                ),
                                a: Math.floor(
                                    pix.color.a * (1 + tolerance.overall)
                                ),
                            };
                            compareColors.darker = {
                                r: Math.floor(
                                    pix.color.r * (1 - tolerance.overall)
                                ),
                                g: Math.floor(
                                    pix.color.g * (1 - tolerance.overall)
                                ),
                                b: Math.floor(
                                    pix.color.b * (1 - tolerance.overall)
                                ),
                                a: Math.floor(
                                    pix.color.a * (1 - tolerance.overall)
                                ),
                            };
                        }

                        // Überprüfen der Nachbarn
                        neighbourkeys.forEach((neighbourkey) => {
                            let neighbourPixel: Pixel =
                                neighbours[neighbourkey];
                            let r = neighbourPixel.color.r;
                            let g = neighbourPixel.color.g;
                            let b = neighbourPixel.color.b;
                            let a = neighbourPixel.color.a;

                            if (
                                r >= compareColors.darker.r &&
                                r <= compareColors.lighter.r &&
                                g >= compareColors.darker.g &&
                                g <= compareColors.lighter.g &&
                                b >= compareColors.darker.b &&
                                b <= compareColors.lighter.b &&
                                a >= compareColors.darker.a &&
                                a <= compareColors.lighter.a
                            ) {
                                if (
                                    !mask.has(neighbourPixel) &&
                                    mask.size <
                                        image.getWidth() * image.getHeight()
                                ) {
                                    // let x = JSON.stringify(neighbourPixel);
                                    // console.log(
                                    //     `${mask.size}/${
                                    //         image.getWidth() * image.getHeight()
                                    //     }/${overallPixelCount} -> adding ${x} to the mask`
                                    // );
                                    mask.add(neighbourPixel);
                                } else {
                                    if (
                                        mask.size >
                                        image.getWidth() * image.getHeight()
                                    ) {
                                    }
                                }
                            }
                        });
                    }
                }
                result.push(mask);
                return resolve(result);
            });
        }
    }
    interface CompareColors {
        darker: RGBA;
        lighter: RGBA;
    }
    interface Tolerance {
        overall?: number;
        fixed?: ToleranceFixedPixel;
    }
    interface ToleranceFixedPixel {
        r: number;
        g: number;
        b: number;
        a?: number;
    }
    interface Neighbourings {
        [index: string]: Pixel;
    }
}
export default Filtering;
