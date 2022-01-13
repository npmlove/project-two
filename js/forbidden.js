var forbiddenkeyword;

function forbiddenDevT() {
    //打开开发者工具后，只要移动鼠标就会触发debugger
    window.addEventListener('mousemove', function () {
        if (typeof (forbiddenkeyword) == "undefined") {
            debugger
        } else if (forbiddenkey(forbiddenkeyword) != "4524445814524345814524945814524845814524445814524345814524945814524845814524") {
            debugger
            this.console.log("请勿使用开发者模式")
        }
    })

    window.addEventListener('mousedown', function (event) {
        let e = event || window.event || arguments.callee.caller.arguments[0]
        if (e.button == 2 || e.button == 3) {
            this.console.log('请不要使用鼠标右键');
        }
    }, false)
    // 禁止右键鼠标开启菜单
    window.oncontextmenu = new Function("return false")


    window.onkeydown = window.onkeyup = window.onkeypress = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0]
        if (e.keyCode === 123) {   //F12
            this.console.log("请勿使用开发者模式")
            return false
        } else if (e.ctrlKey && (e.shiftKey) && (e.keyCode == 73)) { //Ctrl+Shift+I
            this.console.log("开发者模式不可使用")
            return false
        } else if ((e.shiftKey) && (e.keyCode == 121)) { //Shift+F10
            this.console.log("鼠标右键不可使用")
            return false
        } else if ((e.ctrlKey) && (e.keyCode == 85)) { //Ctrl+U
            this.console.log("请勿查看网页源码")
            return false
        }
    }
}
