export default {
    getTime: function (str){
        var str_n = Number(str.substring(1, str.length));
        var str_t = str.substring(0, 1);
        if (str_t === "s") {
            return str_n * 1000;
        } else if (str_t === "h") {
            return str_n * 60 * 60 * 1000;
        } else if (str_t === "d") {
            return str_n * 24 * 60 * 60 * 1000;
        }
    },
    setCookie: function (name, value, time) {
        var endTime = this.getTime(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + endTime * 1);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return decodeURIComponent(arr[2]);
        else
            return null;
    },
    delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cook_name = this.getCookie(name);
        if (cook_name != null)
            document.cookie = name + "=" + cook_name + ";expires=" + exp.toUTCString();
    }
}

