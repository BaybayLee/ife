/**
 * User: liyan
 */
window.onload = function () {
    addEvent($("#submitBtn"), "click", show);
};
var time;
var show = function () {
    var inputTime = $("#inputYear").value,
        regExp = new RegExp("[0-9]{4}-[0,1][0-9]-[0-3][0-9]");
    if (inputTime.match(regExp)) {
        var text = inputTime.split("-");
        var endDate = new Date(text[0], text[1] - 1, text[2]);
        showTime(endDate, text[0], text[1], text[2]);
        time = setInterval(function () {
            showTime(endDate, text[0], text[1], text[2])
        }, 1000);
    }
    else {
        alert("输入格式错误");
    }
};
function showTime(textTime, year, month, day) {
    var now = new Date();
    var leftTime = textTime.getTime() - now.getTime();
    if (leftTime > 0) {
        var leftSecond = parseInt(leftTime / 1000);
        var days = Math.floor(leftSecond / (24 * 60 * 60));
        var hour = Math.floor((leftSecond - days * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftSecond - days * 24 * 60 * 60 - hour * 60 * 60) / 60);
        var second = Math.floor(leftSecond - days * 24 * 60 * 60 - hour * 60 * 60 - minute * 60);
        $("#show").innerHTML = "距离" + year + "年" + month + "月" + day + "日,还剩余" + days + "天" + hour + "小时" + minute + "分钟" + second + "秒";
    } else {
        alert("时间已经过去");
        clearInterval(time);
    }
}

