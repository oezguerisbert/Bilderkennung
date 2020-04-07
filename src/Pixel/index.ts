export default class Pixel {
    private x: number;
    private y: number;
    private color: Color;
    constructor(x: number, y: number, color: Color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    public getCoords(): Array<number> {
        return [this.x, this.y];
    }
    public getColor(): Color {
        return this.color;
    }
}
export class Color {
    private r: number;
    private g: number;
    private b: number;
    private a: number;
    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    public getR() {
        return this.r;
    }

    public getG() {
        return this.g;
    }

    public getB() {
        return this.b;
    }

    public getA() {
        return this.a;
    }
}
