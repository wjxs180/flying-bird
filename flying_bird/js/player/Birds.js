//小鸟类
//循环渲染三只小鸟

import { Sprite } from "../base/Sprite";

export class Birds extends Sprite{
    constructor(){
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
        const birdX = window.innerWidth / 4;
        this.birdsX = [birdX, birdX, birdX];
        const birdY = window.innerHeight / 2;
        this.birdsY = [birdY, birdY, birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];

        this.index = 0;
        this.count = 0;
        this.time = 0;
    }
}