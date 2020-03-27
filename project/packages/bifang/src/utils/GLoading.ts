/**
 * 全局loading 适用于：耗时loading、场景跳转loading等
 */
let LoadingNode: cc.Node = null
let GLoading = {

    _initDefaultLoading() {
        if(LoadingNode) return
        let node = new cc.Node("GLoading")
        GUI.AddMaskBg(node)
        let labelNode = new cc.Node()
        labelNode.parent = node
        let label = labelNode.addComponent(cc.Label)
        label.string = `加载中`
        this.Set(node)
    },

    Get(){
        this._initDefaultLoading()
        return LoadingNode
    },

    Set(target: cc.Node | cc.Prefab | String) {
        LoadingNode && LoadingNode.destroy()
        if (target instanceof cc.Node) {
            LoadingNode = target
        } else if (target instanceof cc.Prefab) {
            LoadingNode = cc.instantiate(target)
        } else if (typeof (target) == 'string') {
            GUI.LoadPrefabNewNode(target, (node: cc.Node) => {
                LoadingNode = node
            })
        }
    },

    Show() {
        this._initDefaultLoading()
        GUI.AddToRoot(LoadingNode)
    },

    Hide() {
        LoadingNode && (LoadingNode.parent = null)
    }
}
window["GLoading"] = GLoading