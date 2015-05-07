/**
 * Created by liyan on 2015/5/6.
 */
window.onload = function () {
    var first = document.getElementById("first");
    var second = document.getElementById("second");
    var dragEle, target;
    var disX = 0;//元素与鼠标之间的横坐标距离
    var disY = 0;//元素与鼠标之间的纵坐标距离
    for (var i = 0; i < $("li").length; i++) {
        addEvent($("li")[i], "mousedown", mouseDown);
    }

    function mouseDown(e) {
        e = e ? e : window.event;
        target = e.srcElement ? e.srcElement : e.target;
        disX = e.clientX - target.offsetLeft;//保持鼠标与元素之间的距离
        disY = e.clientY + scrollY - target.offsetTop;
        dragEle = document.createElement("div");//创建虚拟的拖拽框
        dragEle.className = "box";
        dragEle.style.left = target.offsetLeft + "px";//初始位置与鼠标放入元素的位置相同
        dragEle.style.top = target.offsetTop + "px";
        document.body.appendChild(dragEle);
        if (target.setCapture) {//IE
            target.onmousemove = mouseMov;
            target.onmouseup = mouseUp;
        } else {//ff chrome
            document.onmousemove = mouseMov;
            document.onmouseup = mouseUp;
        }
        return false;
    }

    function mouseMov(e) {//移动的过程中，始终保持拖拽框与鼠标的距离相同
        e = e ? e : window.event;
        dragEle.style.left = e.clientX - disX + "px";
        dragEle.style.top = e.clientY + scrollY - disY + "px";
        return false;
    }

    function mouseUp(e) {
        var secondLeft = $("#second").offsetLeft;
        var firstLeft = $("#first").offsetLeft;
        e = e ? e : window.event;
        if (target.offsetLeft <= secondLeft) {//来自第一个ul
            if (((dragEle.offsetLeft + 100) >= secondLeft) && (dragEle.offsetLeft <= (secondLeft + second.offsetWidth))) {//鼠标进入到第二个ul中
                first.removeChild(target);
                second.appendChild(target);
            }
        } else {//来自第二个
            if (((dragEle.offsetLeft + dragEle.offsetWidth) >= firstLeft) && (dragEle.offsetLeft <= secondLeft - 50)) {//移入到第一个ul中
                second.removeChild(target);
                first.appendChild(target);
            }
        }
        this.onmousemove = null;
        this.onmouseup = null;
        document.body.removeChild(dragEle);
        if (target.releaseCapture) {
            target.releaseCapture();
        }
    }
    return false;
};
