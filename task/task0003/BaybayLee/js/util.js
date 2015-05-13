/**
 * Created by liyan on 2015/4/20.
 */

function renderResult(result) {
    $('result').innerHTML = result;
}

function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

function cloneObject(src) {
    // your implement
    var o = src.constructor === Array ? [] : {};
    for (var i in src) {
        if (src.hasOwnProperty(i)) {
            o[i] = typeof src[i] === 'object' ? cloneObject(src[i]) : src[i];
        }
    }
    return o;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var temp = new Array();
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i + 1]) {
            continue;
        }
        temp[temp.length] = arr[i];
    }
    return temp;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    // your implement
    if (str.length > 0) {
        if (str.charAt(0) == " ") {
            str = str.substring(1, str.length);
        }
        if (str.charAt(str.length - 1) == " ") {
            str = str.substring(0, str.length - 1);
        }
        if (str.charAt(0) == " " || str.charAt(str.length - 1) == " ") {
            return trim(str);
        }
    }
    return str;
}


//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
    }
}

function getObjectLength(obj) {
    var n = 0;
    for (var i in obj) {
        n++;
    }
    return n;
}


// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    // 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
//    第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
//而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (re.test(emailStr)) {
        alert("正确");
    } else {
        alert("错误");
    }

}
// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement,以1开头，11位
    var re = /^1\d{10}$/;
    if (re.test(phone)) {
        alert("true");
    }
}

function hasClass(element, cls) {
//    return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    var classNames = element.className.split(/\s+/);
    for(var i = 0; i < classNames.length; i++){
        if(classNames[i] == cls){
            return true;
        }
    }

    return false;
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (element.classList) {
        element.classList.add(newClassName);
    } else {
        if (!this.hasClass(element, newClassName))
            element.className += " " + newClassName;
    }

}
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (element.classList) {
        element.classList.remove(oldClassName);
    } else {
        if (hasClass(element, oldClassName)) {
            var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
    }
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if (element.parentNode = siblingNode.parentNode) {
        return true;
    }
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var a = new Object();
    if (element.offsetParent != null) {
        a.x = element.offsetLeft + getPosition(element.offsetParent);
        a.y = element.offsetTop + getPosition(element.offsetParent);
    }
    return a;
}
function getClassName(NewClassName) {
    var allClass = document.getElementsByTagName("*");
    var allClassEle = [];
    for (var i = 0; i < allClass.length; i++) {
        if (allClass[i].className == NewClassName) {
            allClassEle.push(allClass[i]);
        }
    }
    return allClassEle;
}
function findChild(parent, selector) {
    var childNode = parent.childNodes;
    var childResult = [];
    if (childNode.length > 0) {
        for (var i = 0; i < childNode.length; i++) {
            switch (selector.substr(0, 1)) {
                case"#":
//                    console.log(document.getElementById(selector.substr(1)));
                    return [document.getElementById(selector.substr(1))];
                case ".":
                    if (parent.getElementsByClassName)
//                        console.log(parent.getElementsByClassName(selector.substr(1)));
                        return parent.getElementsByClassName(selector.substr(1));
                    if (childNode[i].className == selector.substr(1))
                        childResult.push(childNode[i]);
                    break;
                default :
                    return parent.getElementsByTagName(selector);
            }
//            childResult=childResult.concat(findChild(childNode[i],selector));
        }
    }
    return childResult;
}
function matchAttributes(itm) {
    var temp = itm.match(/\[(\S+)\]/);
//    console.log(temp);
    var checkValue = temp[1].match(/(.+)=(.+)/);
    var attr, value, documentList;
    var results = [];
    documentList = document.getElementsByTagName("*");
    if (checkValue) {//有属性值
        attr = checkValue[1];
        value = checkValue[2];
        for (var i = 0; i < documentList.length; i++) {
            if (documentList[i].getAttribute(attr) == value) {
                results.push(documentList[i]);
            }
        }
        return(results);
    }
    else {//没有属性值
        attr = temp[1];
        for (var j = 0; j < documentList.length; j++) {
            if (documentList[j].getAttribute(attr)) {
                results.push(documentList[j]);
            }
        }
        return(results);

    }
}
// 实现一个简单的Query
function $(selector) {
    selector.trim();
    var value = selector.split(" ");
    if (value.length == 1) {//只有一个选择名字
        switch (value[0].substr(0, 1)) {
            case"#":
                return document.getElementById(value[0].substr(1));
            case".":
                if (document.getElementsByClassName) {
                    var b = value[0].substr(1);
                    var b = value[0].substr(1);
                    var a = document.getElementsByClassName(b);
                    return a;
                } else {
                    return getClassName(value[0].substr(1));
                }
                break;
            case "[":
                return matchAttributes(selector);
            default :
                return document.getElementsByTagName(value[0]);
        }
    }
//多个选择名字
    var parentNodes = [document.body];//首先从body中查找第一个selector
    for (var i = 0; i < value.length; i++) {//依次查找selector
        var result = [];
        for (var j = 0; j < parentNodes.length; j++) {
            var childResult = findChild(parentNodes[j], value[i]);//在父节点中找子节点
            for (var s = 0; s < childResult.length; s++) {
                result.push(childResult[s]);
            }
            if (i == value.length - 1) {
                return result;
            }
        }
        parentNodes = result;//从父级中再选择子元素
    }
}


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    if (element.addEventListener) {
        element.addEventListener(event, listener, false)
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if (element.addEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.detach("on" + event, listener);
    } else {
        element["on" + event] = null;
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);

}
// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    if (element.addEventListener) {
        element.addEventListener("keydown", function (e) {
            var oEvent = e || window.event;
            if ((e.keyCode || e.which) == 13) {
                listener();
            }
        }, false)
    } else {
        element.attachEvent("kaydown", function (e) {
            var oEvent = e || window.event;
            if ((e.keyCode || e.which) == 13) {
                listener();
            }
        })
    }
}
// 先简单一些事件代理绑定
function delegateEvent(element, tag, eventName, listener) {
    var ele = $(element);
    addEvent(ele, eventName, function (e) {
        var oEvent = e || window.event;
        var target = oEvent.srcElement ? oEvent.srcElement : oEvent.target;
        if (target.tagName.toLowerCase() === tag) {
            listener();
        }
    })
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.delegate = delegateEvent;
$.enter = addEnterEvent;


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent;
    alert(ua);
    if (/MSIE ([^;]+)/.test(ua)) {
        return parseFloat(RegExp["$1"]);
    } else
        return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText=encodeURI(cookieName)+"="+encodeURI(cookieValue);
    if(expiredays instanceof  Date){
        cookieText+=";exexpiredays"+expiredays.toGMTString();
    }
    document.cookie=cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var name=encodeURI(cookieName) + "=",
        cookieStart=document.cookie.indexof(name),
        cookieValue=null;
    if(cookieStart>-1){
        var cookieEnd=document.cookie.indexof(";",cookieStart);
        if(cookieEnd==-1){
            cookieEnd=document.cookie.length;
        }
        cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+name.length,cookieEnd));
    }
    return cookieValue;
}

function ajax(url, options) {
    var xhr,
        type=options.type?options.type:"GET",
        data= options.data?options.data:"",
        onsuccess=options.onsuccess,
        onfail=options.onfail?options.onfail:function(){console.log(xhr.status);};
  if(window.XMLHttpRequest){
      xhr=new XMLHttpRequest();
  }else{
      xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }
    if(data!=""){
        url = url + "?";
        for(var i in data){
            url = url + i + "=" +data[i] +"&";
        }
    }
    xhr.open(type,url,true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                onsuccess(xhr.responseText,xhr);
            }else{
                onfail();
            }
        }
    };
}


