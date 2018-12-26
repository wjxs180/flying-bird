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
        const minTop = DataStore.getInstance().canvas.height / 8; //最低高度
        const maxTop = DataStore.getInstance().canvas.height / 2; //最高高度
        const top = minTop + Math.random() * (maxTop - minTop);//实际可能的高度

        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));

    }

    //小鸟点击移动事件
    birdsEvent() {
        //点击往上偏移
        for (let i = 0; i <= 2; i++) {
            // console.log(this.dataStore.get('birds').birdsY[i]);
            //即返回前一时刻的偏移值
            if (this.dataStore.get('birds').birdsY[i] <= this.dataStore.get('birds').birdsHeight[i]) {
                //不飞出顶部 (鸟身高度)
                this.dataStore.get('birds').birdsY[i] = this.dataStore.get('birds').birdsHeight[i];
            }
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;//重置下落时间
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true;
        }
        return !s;
    }

    //判断游戏开始结束（小鸟是否碰到地板或者铅笔）
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        //碰到地板
        if (birds.birdsY[0] + birds.birdsHeight[0] > land.y) {
            //小鸟纵坐标+鸟本身高度 > 地板纵坐标
            this.isGameOver = true;
            return;
        }

        //小鸟的边框模型
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };
        // console.log(birds.birdsY[0], birds.birdsY[0]);

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                this.isGameOver = true;
                return;
            }
        }

        //加分判断（小鸟越过铅笔）
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
            score.isScore = false;//关闭计分
            score.scoreNumber++;
            
        }

    }

    //运行
    run() {
        //判断游戏开始结束
        this.check();

        if (!this.isGameOver) { //游戏未结束
            //背景
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                //铅笔右侧已超过画布左边界  2组铅笔
                //移除1组铅笔
                pencils.shift();//移除
                pencils.shift();//移除
                this.dataStore.get('score').isScore = true;//开启计分
            }

            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
                //铅笔坐标过半 就创建新的一组 以确保画布上显示2组铅笔
                this.createPencil();
            }

            //铅笔
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });

            //地板
            this.dataStore.get('land').draw();

            //分数
            this.dataStore.get('score').draw();

            //小鸟
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);

        } else {
            //结束
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();//开始按钮
            cancelAnimationFrame(this.dataStore.get('timer'));
            //是否资源
            this.dataStore.destroy();
        }
    }
}