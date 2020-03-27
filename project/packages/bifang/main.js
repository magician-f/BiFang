'use strict';
let Fs = require('fs');
let Path = require('path');
module.exports = {

    //当package被正确加载的时候执行
    load(){
        
    },

    //当package被正确卸载的时候执行
    unload(){
    },

    messages: {
        'sync-hello' () {
            Editor.log('欢迎使用bf https://github.com/KnifeStone/BiFang');
        }
    }

}