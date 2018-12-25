//导演类，控制游戏的逻辑
import { DataStore } from './base/DataStore';
import { DownPencil } from './runtime/DownPencil';
import { UpPencil } from './runtime/UpPencil';


export class Director {
    //单例模式
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    //创建铅笔
    createPencil() {
        const minTop = window.innerHeight / 8; //最低高度
        const maxTop = window.innerHeight / 2; //最高高度
        const top = minTop + Math.random() * (maxTop - minTop);//实际可能的高度

        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));

    }

    //运行
    run() {
        if (!this.isGameOver) { //游戏未结束
            //背景
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                //铅笔右侧已超过画布左边界  2组铅笔
                //移除1组铅笔
                pencils.shift();//移除
                pencils.shift();//移除
            }

            if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
                //铅笔坐标过半 就创建新的一组 以确保画布上显示2组铅笔
                this.createPencil();
            }

            //铅笔
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });

            //地板
            this.dataStore.get('land').draw();

            //小鸟
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);

        } else {
            //结束
            cancelAnimationFrame(this.dataStore.get('timer'));
            //是否资源
            this.dataStore.destroy();
        }
    }
}