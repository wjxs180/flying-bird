//下半部分铅笔

import { Pencil } from "./Pencil";
import { Sprite } from "../base/Sprite";

export class DownPencil extends Pencil{
    constructor(top){
        const image = Sprite.getImage('pencilDown');
        super(image, top);
    }

    draw(){
        this.gap = window.innerHeight / 5;
        this.y = this.top + this.gap;
        super.draw();
    }
}