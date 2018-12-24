//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染

import { Resources} from './Resources'

export class ResourceLoader{
    map = null;
    constructor(){
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            //图片对象
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        }
    }

    //判断资源初始化完成 调用callback回调方法
    onLoaded(callback){
        let loadedCount = 0;
        for (let value of this.map.values()){
            //图片加载完成触发
            value.onload = ()=>{
                loadedCount++;
                if (loadedCount >= this.map.size){
                    callback(this.map);
                }
            }
        }
    }

    //静态调用创建
    static create() {
        return new ResourceLoader();
    }
}