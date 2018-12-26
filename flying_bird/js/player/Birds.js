//小鸟类
//循环渲染三只小鸟

import { Sprite } from "../base/Sprite";
import { DataStore } from '../base/DataStore'

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);

        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        const birdX = DataStore.getInstance().canvas.width / 4;
        this.birdsX = [birdX, birdX, birdX];
        const birdY = DataStore.getInstance().canvas.height / 2;
        this.birdsY = [birdY, birdY, birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        
        this.y = [birdY, birdY, birdY];
        this.index = 0;//小鸟下标
        this.count = 0;//小鸟个数
        this.time = 0;//时间
    }

    draw() {
        const speed = 0.2;//切换小鸟的速度
        this.count += speed;

        if (this.index >= 2) {
            this.count = 0;
        }
        this.index = Math.floor(this.count);//减速器的作用

        //模拟重力加速度
        const g = 0.98 / 2.4;
        //向上移动一丢丢的偏移量
        const offsetUp = 30;
        
        // h = 1/2 g * t *t
        const offsetY = (g * this.time * (this.time - offsetUp) ) / 2; 
        for(let i=0 ; i<=2 ; i++){
            //各个状态小鸟的高度  某个时刻
            this.birdsY[i] = this.y[i] + offsetY;
            // console.log('现在', this.birdsY[i]);
        }
        this.time ++;

        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]);
    }
}