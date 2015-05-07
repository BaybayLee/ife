/**
 * Created by liyan on 2015/4/28.
 */
window.onload = function () {

    addEvent($("#subBtn1"), "click", showIntrest1);
    addEvent($("#subBtn2"), "click", showIntrest2);
    addEvent($("#subBtn3"), "click", showIntrest3);
};

var showIntrest1 = function () {
    var inputValue = $("#intrest1").value.split(",");
    $("#show1").innerHTML = "";
    var showText = uniqArray(inputValue).join(",");
    for (var i = 0; i < showText.length; i++) {
        $("#show1").innerHTML += showText[i];
    }
};
var showIntrest2 = function () {
    var inputValue = $("#intrest2").value.split(/[',','，','、',';',''；',','\s+','\n']/);
    $("#show2").innerHTML = "";
    var showText = uniqArray(inputValue).join(",");
    for (var i = 0; i < showText.length; i++) {
        $("#show2").innerHTML += showText[i];
    }
};
var showIntrest3 = function () {
    var inputValue = $("#intrest3").value.split(/[',','，','、',';',''；',','\s+','\n']/);
    $("#show3").innerHTML = "";
    if (inputValue > 10) {
        alert("�������Ŀ��࣬�������10������");
    }
    else {
        var showText = uniqArray(inputValue);
        for (var i = 0; i < showText.length; i++) {
            $("#show3").innerHTML += showText[i] + '<input type="checkbox"/>' + "</br>";
        }
    }
};
