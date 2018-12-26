// 铅笔的基类
import { Sprite } from '../base/Sprite'
import { DataStore } from '../base/DataStore'

export class Pencil extends Sprite{
    //top 高度
    constructor(image,top){
        super(image, 0, 0, image.width, image.height, 
            //x在右侧看不到的位置
            DataStore.getInstance().canvas.width, 0, image.width, image.height);
        this.top = top;

        //移动速度
        this.moveSpeed = 2;
    }

    draw(){
        this.x = this.x - this.moveSpeed;
        super.draw(this.img, 0, 0, this.srcW, this.srcH, this.x,
            this.y, this.width, this.height);
    }

}