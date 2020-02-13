var GUI = {

    /**
     * 添加防穿透的遮罩
     */
    AddMaskBg(node, opacity = 200, color = cc.Color.BLACK) {
        let MaskNode = new cc.Node("MaskNode")
        MaskNode.width = cc.winSize.width / node.scale + 5
        MaskNode.height = cc.winSize.height / node.scale + 5
        MaskNode.addComponent(cc.BlockInputEvents)
        MaskNode.parent = node
        MaskNode.zIndex = -1
        let graphics = MaskNode.addComponent(cc.Graphics)
        color.setA(opacity)
        graphics.fillColor = color
        graphics.fillRect(-MaskNode.width / 2, -MaskNode.height / 2, MaskNode.width, MaskNode.height)
    },

    /**
     * 加载一个节点到常驻节点
     * @param node 
     * @param position 
     */
    AddToRoot(node: cc.Node, position?: cc.Vec2) {
        node.parent = null
        cc.game.addPersistRootNode(node)
        if (!position) {
            position = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2)
        }
        node.position = position
    },

    //加载资源
    LoadRes(sPath, type, cb) {
        if (!sPath || !type) return
        let res = cc.loader.getRes(sPath, type)
        if (res) {
            cb && cb(res)
            return
        }
        cc.loader.loadRes(sPath, type, (err, res) => {
            if (err || !res) {
                console.log(`LoadRes 找不到${sPath}`)
            } else {
                cb && cb(res)
            }
        })
    },

    LoadPrefabNewNode(target: cc.Prefab | String, cb) {
        let callBack = (prefab) => {
            let node = cc.instantiate(prefab)
            cb && cb(node)
        }
        if (target instanceof cc.Prefab) {
            callBack(target)
        } else if (typeof (target) == "string") {
            this.LoadRes(target, cc.Prefab, (prefab) => {
                callBack(target)
            })
        }
    },

    //加载一个预制到Canavs的父节点下
    LoaderPrefabToCnavas(target: cc.Prefab | String, param: { isOnly?: boolean, zIndex?: number, position?: cc.Vec2 }, callBack) {
        this.LoadPrefabNewNode(target, (prefab) => {
            if (!cc.director.getScene()) {
                console.error(`找不到 cc.director.getScene()`)
                return
            }
            var node = cc.instantiate(prefab)
            if (param.isOnly && cc.director.getScene().getChildByName(node.name)) {
                node.destroy()
                return
            }
            if (param.position) {
                node.position = param.position
            } else {
                node.x = cc.winSize.width / 2
                node.y = cc.winSize.height / 2
            }
            cc.director.getScene().addChild(node)
            node.zIndex = param.zIndex || 0
            this.AdjustNodeZoom(node)
            callBack && callBack(node)
        })
    },

    //循环给指定条件的node添加点击事件
    ForToggleClickListener(node, listenerFunc) {
        let children = node.children
        let child
        for (let k in children) {
            child = children[k]
            if (child.getComponent(cc.Toggle) || child.getComponent(cc.Button)) {
                child.on("click", listenerFunc)
            }
            this.ForToggleClickListener(child, listenerFunc)
        }
    },

    /**
     * @name 根据屏幕比例调整节点缩放
     * @param {cc.Node} node 的大小默认视为设计分辨率大小
     */
    AdjustNodeZoom(node) {
        let width = cc.winSize.width
        let height = cc.winSize.height
        if (width < height) {
            node.width = 750
            node.height = 1334
            //竖屏 如果屏幕宽高比大于控件，控件上下会超出屏幕
            let pWin = cc.winSize.width / cc.winSize.height
            let pNode = node.width / node.height
            let scale = cc.winSize.height / node.height
            // console.log(cc.winSize.width,cc.winSize.height,node.width,node.height,pWin,scale)
            pWin > pNode && (cc.winSize.width < node.width || cc.winSize.height < node.height) && (node.scale = scale)
            //校验宽度是否会超过屏幕
            if (node.width * scale > cc.winSize.width) {
                node.scale = scale * (cc.winSize.width / (node.width * scale))
            }
        } else {
            node.width = 1334
            node.height = 750
            //横屏 如果屏幕高宽比大于控件，控件左右会超出屏幕
            let pWin = cc.winSize.height / cc.winSize.width
            let pNode = node.height / node.width
            let scale = cc.winSize.width / node.width
            // console.log(cc.winSize.width,cc.winSize.height,node.width,node.height,pWin,scale)
            pWin > pNode && (cc.winSize.width < node.width || cc.winSize.height < node.height) && (node.scale = scale)
            //校验高度是否会超过屏幕
            if (node.height * scale > cc.winSize.height) {
                node.scale = scale * (cc.winSize.height / (node.height * scale))
            }
        }
    },



}
window["GUI"] = GUI