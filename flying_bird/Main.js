//初始化整个游戏的精灵，作为游戏开始的入口

import { ResourceLoader } from './js/base/ResourceLoader'

export class Main{
    
    constructor(){
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        //资源加载完成
        // let image = wx.createImage();
        // image.src = 'res/background.png';
        // image.onload = () => {
        //     this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
        // }

        //初始图片等资源加载
        const loader = ResourceLoader.create();
        loader.onLoaded( (map)=>this.onResourceFirstLoaded(map) );
    }

    //资源只加载一次
    onResourceFirstLoaded(map){
        //加载完成
        console.log(map);
    }
}