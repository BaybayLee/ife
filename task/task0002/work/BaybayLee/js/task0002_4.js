/**
 * Created by liyan on 2015/5/5.
 */
var data = aColors = ["red", "purple", "black", "white", "orange", "yellow", "green",
    "syan", "blue", "fuchsia", "pink", "tan", "gray", "brown", "maroon", "olive",
    "navy", "teal", "aqua", "lime", "silver", "blueviolet", "crimson", "cyan",
    "gold", "khaki", "forestgreen", "goldenrod", "lightcoral", "lightblue",
    "lightslategray", "tan", "orchid", "plum", "deeppink", "darkred"];
data.sort();//将所有颜色按照字母排序
var active, next, pre;
window.onload = function () {
    addEvent($("#inputSearch"), "keyup", indexData);
    delegateEvent("#list", "div", "click", onchoice);
    document.onkeydown = function (e) {
        e = e ? e : window.event;
        var currentKay = e.keyCode || e.which || e.charCode;
        switch (currentKay) {
            case 38://up
                if ($("#list").innerHTML != "")
                    searchPre();
                break;
            case 40://down
                if ($("#list").innerHTML != "")
                    searchNext();
                break;
            case 13://enter
                if ($("#list").innerHTML != "")
                    enterChoice();
        }
    };
};
function indexData() {//关键字匹配
    var content = $("#inputSearch").value.trim();
    $("#list").innerHTML = "";//每次输入新的字符都清空
    for (var i = 0; i < data.length; i++) {
        if (data[i].indexOf(content) >= 0) {
            var oDiv = document.createElement("div");
            oDiv.innerText = data[i];
            oDiv.setAttribute("class", "item");
            $("#list").appendChild(oDiv);
        }
    }
}
var onchoice = function (e) {//选择某一个提示信息
    e = e ? e : window.event;
    var target = e.srcElement ? e.srcElement : e.target;
    var text = target.innerHTML;
    $("#inputSearch").value = text;
    $("#list").innerHTML = "";
};

function searchPre() {
    $("#inputSearch").blur();
    active = $(".active");
    var item = $(".item");
    if (active.length != 0) {//如果下拉列表已经有被选择的
        pre = active[active.length - 1].previousSibling;
        if (pre)//如果不是第一个选项
        {
            for (var i = 0; i < item.length; i++) {
                removeClass(item[i], "active");
            }
            addClass(pre, "active");
        }
    }
}

function searchNext() {
    $("#inputSearch").blur();
    active = $(".active");
    var item = $(".item");
    if (active.length != 0) {//如果下拉列表已经有被选择的
        next = active[active.length - 1].nextSibling;
        if (next)//如果不是最后一个选项
        {
            for (var i = 0; i < item.length; i++) {
                removeClass(item[i], "active");
            }

            addClass(next, "active");
        }
    } else {//如果没有元素被选择
        addClass(item[0], "active");
    }
}

function enterChoice() {
    $("#inputSearch").blur();
    var text = $(".active")[0].innerText;
    $("#inputSearch").value = text;
    $("#list").innerHTML = "";
}