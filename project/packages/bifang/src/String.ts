interface String {
    /**
     * 汉字长度规则来，截取字符串指定长度
     * test code
        console.log("汉武帝是一个伟大的".Clamp(3,"..."))
    * @from            https://gitee.com/qilinzi/qlz_ccc_tips
    * @param maxChars  保留的汉字长度
    * @param suffix    添加的后缀 （注意，如果后缀不为null或者'' ，则要占用一个汉字的位置,具体看下方的示例代码)
    */
    Clamp(maxChars, suffix)
}
String.prototype.Clamp = function (maxChars, suffix) {
    var toCodePoint = function (unicodeSurrogates) {
        var r = [], c = 0, p = 0, i = 0
        while (i < unicodeSurrogates.length) {
            var pos = i
            c = unicodeSurrogates.charCodeAt(i++)//返回位置的字符的 Unicode 编码 
            if (c == 0xfe0f) {
                continue
            }
            if (p) {
                var value = (0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00))
                r.push({
                    v: value,
                    pos: pos,
                }) //计算4字节的unicode
                p = 0
            } else if (0xD800 <= c && c <= 0xDBFF) {
                p = c //如果unicode编码在oxD800-0xDBff之间，则需要与后一个字符放在一起
            } else {
                r.push({
                    v: c,
                    pos: pos
                }) //如果是2字节，直接将码点转为对应的十六进制形式
            }
        }
        return r
    }
    suffix = suffix == null ? '...' : suffix
    maxChars *= 2
    var codeArr = toCodePoint(this)
    var numChar = 0
    var index = 0
    for (var i = 0; i < codeArr.length; ++i) {
        var code = codeArr[i].v
        var add = 1
        if (code >= 128) {
            add = 2
        }

        index = i
        //累加
        numChar += add
        if (numChar > maxChars) {
            break
        }
    }
    if (codeArr.length - 1 == index) {
        return this
    }
    var more = suffix ? 1 : 0
    return this.substring(0, codeArr[index - more].pos + 1) + suffix
}