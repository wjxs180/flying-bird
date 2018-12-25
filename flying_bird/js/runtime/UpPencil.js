//上半部分铅笔

import { Pencil } from "./Pencil";
import { Sprite } from "../base/Sprite";

export class UpPencil extends Pencil{
    constructor(top = 0){
        const image = Sprite.getImage('pencilUp');
        super(image,top);
    }

    draw(){
        this.y = this.top - this.height;
        
        super.draw();
    }
}