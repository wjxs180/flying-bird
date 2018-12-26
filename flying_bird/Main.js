//初始化整个游戏的精灵，作为游戏开始的入口

import { ResourceLoader } from './js/base/ResourceLoader';
import { BackGround } from './js/runtime/BackGround';
import { Land } from './js/runtime/Land';
import { DownPencil } from './js/runtime/DownPencil';
import { UpPencil } from './js/runtime/UpPencil';
import { Birds } from './js/player/Birds';
import { StartButton } from './js/player/StartButton';
import { Score } from './js/player/Score';
import { DataStore } from './js/base/DataStore';
import { Director } from './js/Director';

export class Main {

    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');

        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();

        //初始图片等资源加载
        const loader = ResourceLoader.create();
        loader.onLoaded((map) => this.onResourceFirstLoaded(map));
    }

    //资源只加载一次
    onResourceFirstLoaded(map) {
        //加载完成 常用变量
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.createBackgroundMusic();
        this.init();
    }

    //创建背景音乐
    createBackgroundMusic() {
        const audio = wx.createInnerAudioContext();
        audio.autoplay = true
        audio.loop = true
        audio.src = 'audios/bgm.mp3';
        
    }

    //初始化
    init() {
        //首先重置游戏是没有结束的
        this.director.isGameOver = false;

        this.registerEvent();

        //设置背景
        this.dataStore.put('background',BackGround)
            .put('startButton', StartButton)
            .put('land', Land)
            .put('score', Score)
            .put('birds', Birds)
            .put('pencils', []);
        
        //创建铅笔要在游戏逻辑运行之前
        this.director.createPencil();
        
        this.director.run();
    }

    //注册事件
    registerEvent(){

        // 监听开始触摸事件
        wx.onTouchStart( ()=>{
            if (this.director.isGameOver){
                console.log('游戏开始');
                this.init();

            }else{
                //小鸟移动事件
                this.director.birdsEvent();
            }
        });
    }
}