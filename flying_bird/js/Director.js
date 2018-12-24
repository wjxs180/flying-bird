//导演类，控制游戏的逻辑
export class Director{
    //单例模式
    static getInstance(){
        if (!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor(){
        
    }
}