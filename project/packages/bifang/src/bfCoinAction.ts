
class Action {

    constructor(param:  {
        count: number,
        start: cc.Node | cc.Vec2,
        end: cc.Node | cc.Vec2,
        config?: Config,
        progressFunc?:Function
        finishFunc?:Function
      }) {
        param.config = param.config || bfCoinAction.CloneConfig()
        let startPos
        let endPos
        if (param.start instanceof cc.Node) {
            startPos = param.start.convertToWorldSpaceAR(cc.Vec2.ONE)
        } else if (param.start instanceof cc.Vec2) {
            startPos = param.start
        }
        if (param.end instanceof cc.Node) {
            endPos = param.end.convertToWorldSpaceAR(cc.Vec2.ONE)
        } else if (param.end instanceof cc.Vec2) {
            endPos = param.end
        }
        if (!startPos || !endPos || !param.count) {
            console.warn("参数有误", param)
            return
        }
        if (param.end instanceof cc.Node) {
            if (!param.config.SpriteFrame) {
                //没有纹理，要去取目标节点的纹理
                param.config.SSpriteFrame(param.end.getComponent(cc.Sprite).spriteFrame, param.end.width, param.end.height)
            }
        }
        if (!param.config.SpriteFrame) {
            console.warn("没有找到纹理")
            return
        }
        if (!param.config.Action) {
            param.config.Action = new ActionDispersal()
        }
        if (param.count > param.config.MaxCount) {
            param.count = param.config.MaxCount
        }

        let count = param.count
        let config = param.config
        let progressFunc = param.progressFunc
        let finishFunc = param.finishFunc
        let progress: number = 0
        for (let i = 0; i < count; i++) {
            let node = this._createNode(i, config, startPos)
            let actionCreate = config.Action.actionCreate(i, count, node.position, endPos, config.Size)
            if (!actionCreate) {
                progress++
                node.destroy()
                continue
            }
            node.runAction(cc.sequence(actionCreate, cc.callFunc(() => {
                let actionMove = config.Action.actionMove(i, count, node.position, endPos, config.Size)
                if (!actionMove) {
                    progress++
                    node.destroy()
                    return
                }
                let callBack = cc.callFunc(() => {
                    progress++
                    progressFunc && progressFunc(progress, count)
                    if (progress >= count) {
                        finishFunc && finishFunc()
                    }
                    node.destroy()
                })
                let action = cc.sequence(actionMove, callBack)
                node.runAction(action)
            })))
        }
    }

    private _createNode(index: number, config: Config, pos: cc.Vec2): cc.Node {
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

export class Config {
    SpriteFrame: cc.SpriteFrame = null
    MaxCount: number = 999
    Action: ActionI = null
    Size: cc.Size = new cc.Size(0, 0)

    SSpriteFrame(SpriteFrame: cc.SpriteFrame, Width?: number, Height?: number): Config {
        this.SpriteFrame = SpriteFrame
        if (Width && Height) {
            this.Size.width = Width
            this.Size.height = Height
        } else if (SpriteFrame) {
            this.Size.width = SpriteFrame.getRect().width
            this.Size.height = SpriteFrame.getRect().height
        }
        return this
    }

}
interface ActionI {
    actionCreate(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction
    actionMove(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction
}

class ActionDispersal implements ActionI {

    actionCreate(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction {
        let moveX = Math.random() * 200
        let moveY = Math.random() * 50
        let height = Math.random() * 100
        let duration = 0.4 + Math.random()
        let action = cc.jumpBy(duration, Math.random() > 0.5 ? moveX : -moveX, Math.random() > 0.5 ? moveY : -moveY, height, 1)
        return cc.sequence(action, cc.delayTime(0.05))
    }
    actionMove(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction {
        let posVec = endPos.sub(startPos)
        let dis = posVec.mag()
        let duration = dis / 600
        let action = cc.moveTo(duration, endPos)
        return action
    }

}
class ActionRound implements ActionI {

    actionCreate(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction {
        let points = this._getPoint(100, startPos.x, startPos.y, total)
        let duration = 0.4// + Math.random()
        let action = cc.moveTo(duration, points[index])
        return cc.sequence(action, cc.delayTime(0.05))
    }

    actionMove(index: number, total: number, startPos: cc.Vec2, endPos: cc.Vec2, size: cc.Size): cc.FiniteTimeAction {
        let posVec = endPos.sub(startPos)
        let dis = posVec.mag()
        let duration = dis / 600
        let action = cc.moveTo(duration, endPos)
        return action
    }

    private _getPoint(r: number, ox: number, oy: number, count: number) {
        var point = []
        var radians = (Math.PI / 180) * Math.round(360 / count); //弧度
        for (var i = 0; i < count; i++) {
            var x = ox + r * Math.sin(radians * i)
            var y = oy + r * Math.cos(radians * i)
            //为保持数据顺时针
            point.push({ x: x, y: y });
        }
        return point;
    }

}
let CloneConfig = function () {
    let config = new Config()
    let defaultConfig = this.GDefaultConfig()
    let keys = Object.keys(defaultConfig)
    for (let i = 0; i < keys.length; i++) {
        config[keys[i]] = defaultConfig[keys[i]]
    }
    return config
}
let GDefaultConfig = function () {
    this.DConfig = this.DConfig || new Config()
    return this.DConfig
}
let SDefaultConfig = function(config:Config){
    this.DConfig = config
}
let Run = function (param) {
    new Action(param)
}
!window.bfCoinAction && (window.bfCoinAction = {})
bfCoinAction.Config = Config
bfCoinAction.GDefaultConfig = GDefaultConfig
bfCoinAction.SDefaultConfig = SDefaultConfig
bfCoinAction.CloneConfig = CloneConfig
bfCoinAction.Run = Run
bfCoinAction.ActionRound = ActionRound
bfCoinAction.ActionDispersal = ActionDispersal

