
export default class BFActionMore{

    //=========== 配置 ===========

    private static DConfig:Config = null

    static GDefaultConfig():Config{
        this.DConfig = this.DConfig || new Config()
        return this.DConfig
    }

    static CloneConfig():Config{
        let config = new Config()
        let defaultConfig = this.GDefaultConfig()
        let keys = Object.keys(defaultConfig)
        for(let i=0;i<keys.length;i++){
            config[keys[i]] = defaultConfig[keys[i]]
        }
        return config
    }

    //=========== 使用 ============

    /**
    * @param {number}           count   数量
    * @param {cc.Node|cc.Vec2}  start   开始的节点或位置 (世界坐标
    * @param {cc.Node|cc.Vec2}  end     结束的节点或位置 (世界坐标
    * @param {Param}            param   其它非必填参数
        config:Config
        progressFunc:Function
        finishFunc:Function
    */
    static Run(count:number,start:cc.Node|cc.Vec2,end:cc.Node|cc.Vec2,param:any) {
        param.config = param.config || BFActionMore.CloneConfig()
        let startPos, endPos
        if (start instanceof cc.Node) {
            startPos = start.convertToWorldSpaceAR(cc.Vec2.ONE)
        } else if (start instanceof cc.Vec2) {
            startPos = start
        }
        if (end instanceof cc.Node) {
            endPos = end.convertToWorldSpaceAR(cc.Vec2.ONE)
        } else if (end instanceof cc.Vec2) {
            endPos = end
        }
        if (!startPos || !endPos || !count) {
            console.warn("参数有误",arguments)
            return
        }
        if(end instanceof cc.Node){
            if(!param.config.SpriteFrame){
                //没有纹理，要去取目标节点的纹理
                param.config.SSpriteFrame(end.getComponent(cc.Sprite).spriteFrame,end.width,end.height)
            }
        }
        if(!param.config.SpriteFrame){
            console.warn("没有找到纹理") 
            return
        }
        if(!param.config.Action){
            param.config.Action = new ActionDispersal()
        }
        if (param.count > param.config.MaxCount) {
            param.count = param.config.MaxCount
        }
        param.startPos = startPos
        param.endPos = endPos
        param.count = count
        new BFActionMore(param)
    }
    
    /**
        config:Config
        count: number
        startPos: cc.Vec2
        endPos: cc.Vec2
        progressFunc:Function
        finishFunc:Function
     */
    private constructor(param:any){
        let count = param.count
        let config = param.config
        let startPos = param.startPos
        let endPos = param.endPos
        let progressFunc = param.progressFunc
        let finishFunc = param.finishFunc
        let progress        :number = 0
        for (let i = 0; i < count; i++) {
            let node = this._createNode(i,config,startPos)
            let actionCreate = config.Action.actionCreate(i,count,node.position,endPos,config.Size)
            if(!actionCreate){
                progress ++
                node.destroy()
                continue
            }
            node.runAction(cc.sequence(actionCreate,cc.callFunc(()=>{
                let actionMove = config.Action.actionMove(i,count,node.position,endPos,config.Size)
                if(!actionMove){
                    progress ++
                    node.destroy()
                    return
                }
                let callBack = cc.callFunc(()=> {
                    progress ++
                    progressFunc && progressFunc(progress,count)
                    if(progress >= count){
                        finishFunc && finishFunc()
                    }
                    node.destroy()
                })
                let action = cc.sequence(actionMove, callBack)
                node.runAction(action)
            })))
        }
    }

    private _createNode(index:number,config:Config,pos: cc.Vec2): cc.Node {
        let node = new cc.Node(`${index}`)
        node.parent = cc.find("Canvas").parent
        node.setPosition(pos)
        let spe = node.addComponent(cc.Sprite)
        spe.spriteFrame = config.SpriteFrame
        node.width = config.Size.width
        node.height = config.Size.height
        return node
    }

}

export class Config{

    SpriteFrame     : cc.SpriteFrame = null
    MaxCount        : number = 999
    Action          : ActionI = null
    Size            : cc.Size = new cc.Size(0,0)

    SSpriteFrame(SpriteFrame: cc.SpriteFrame,Width?:number,Height?:number):Config  {
        this.SpriteFrame = SpriteFrame
        if(Width && Height){
            this.Size.width = Width
            this.Size.height = Height
        }else if(SpriteFrame){
            this.Size.width = SpriteFrame.getRect().width
            this.Size.height = SpriteFrame.getRect().height
        }
        return this
    }
    
}
export interface ActionI{
    actionCreate(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction
    actionMove(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction
}

export class ActionDispersal implements ActionI{

    actionCreate(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction{
        let moveX = Math.random() * 200
        let moveY = Math.random() * 50
        let height = Math.random() * 100
        let duration = 0.4 + Math.random()
        let action = cc.jumpBy(duration, Math.random() > 0.5 ? moveX : -moveX, Math.random() > 0.5 ? moveY : -moveY, height, 1)
        return cc.sequence(action,cc.delayTime(0.05))
    }
    actionMove(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction{
        let posVec = endPos.sub(startPos)
        let dis = posVec.mag()
        let duration = dis/600
        let action = cc.moveTo(duration, endPos)
        return action
    }
   
}
export class ActionRound implements ActionI{

    actionCreate(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction{
        let points = this._getPoint(100,startPos.x,startPos.y,total)
        let duration = 0.4// + Math.random()
        let action = cc.moveTo(duration,points[index])
        return cc.sequence(action,cc.delayTime(0.05))
    }

    actionMove(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction{
        let posVec = endPos.sub(startPos)
        let dis = posVec.mag()
        let duration = dis/600
        let action = cc.moveTo(duration, endPos)
        return action
    }

    private _getPoint(r:number, ox:number, oy:number, count:number) {
        var point = []
        var radians = (Math.PI / 180) * Math.round(360 / count); //弧度
        for (var i = 0; i < count; i++) {
            var x = ox + r * Math.sin(radians * i)
            var y = oy + r * Math.cos(radians * i)
            //为保持数据顺时针
            point.push({x: x, y: y}); 
        }
        return point;
    }

}
export class Action70 implements ActionI{

    points = [
        [-4,2],[-3,2],[-2,2],[-1,2],[-1,1],[-1,0],[-1,-1],[-1,-2],[-1,-3],
        [1,0],[1,1],[1,2],[2,2],[3,2],[4,2],[4,1],[4,0],[4,-1],[4,-2],[4,-3],[3,-3],[2,-3],[1,-3],[1,-2],[1,-1]
    ]

    actionCreate(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction{
        if(index >= this.points.length){
            return null
        }
        let point = this.points[index]
        point[0] = point[0]*size.width
        point[1] = point[1]*size.height
        let duration = 0.3// + Math.random()
        let action = cc.moveBy(duration,point[0],point[1])
        return cc.sequence(action,cc.delayTime(0.5))
    }
    
    actionMove(index:number,total:number,startPos:cc.Vec2,endPos:cc.Vec2,size:cc.Size):cc.FiniteTimeAction{
        let posVec = endPos.sub(startPos)
        let dis = posVec.mag()
        let duration = dis/600
        let action = cc.moveTo(duration, endPos)
        return action
    }

}