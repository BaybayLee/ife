/**
 * Created by liyan on 2015/5/12.
 */

window.onload = function () {
    showClass();//将本地存储的数据显示出来
    $("#createClassification").onclick = createClass;
    delegateEvent("#classContainer", "img", "click", deleteClass);
    delegateEvent("#classContainer", "p", "click", clickClass);
    $("#classList").onclick = $("#allTsk").onclick = $("#defaultClass").onclick = removeAllClass;
    showTaskNum();
    tab();
    delegateEvent("#classContainer", "li", "click", clickSubClass);
    delegateEvent("#task", "p", "click", taskDetail);
    addClickEvent($("#taskEdit"), editTask);
    addClickEvent($("#taskCompletion"), finishTask);
};
function newClass(id, name) {//每个大的类别都有ID号，name也就是存储的名字，以及子类别
    this.id = id;
    this.name = name;
}
function newSubClass(id, name, parent) {
    this.id = id;
    this.name = name;
    this.parent = parent;
}
function task(id, content, title, time, status, parent) {
    this.id = id;
    this.content = content;
    this.title = title;
    this.time = time;
    this.status = status;//0 表示没有完成；1表示完成
    this.parent = parent;
}
/*data-parent 表示子分类的ID号码，task-ID,My-Task表示任务的ID号码*/
function createClass() {//创建新的大类
    var newCategory = new newClass();
    newCategory.name = prompt("分类名字：");//创建的名字
    if (newCategory.name != "" && newCategory.name != null) {
        newCategory.id = new Date().getTime().toString();
        appendClass(newCategory.name, newCategory.id,true);//tag用于区分是创建新类还是页面重新打开，若创建则为true
        save("Category", "", newCategory);
    }
}
function showClass() {//将本地存储的数据显示出来
    if (localStorage.getItem("Category")) {
        var array = JSON.parse(localStorage.getItem("Category"));
        for (var i in array) {
            appendClass(array[i].name, array[i].id,false);
        }
    }
}
function removeAllClass() {
    removeClass(".taskName", "classActive");
    removeClass(".subTask li", "liActive");
}
function appendClass(name, id,tag) {//html中显示元素
    var newImg = document.createElement("img");
    newImg.setAttribute("class", "deleteTask");
    newImg.setAttribute("src", "img/delete.png");
    var newIcon = document.createElement("i");
    var taskName = document.createElement("p");
    taskName.setAttribute("class", "taskName");
    taskName.setAttribute("task-num", "0");
    taskName.id = id;
    taskName.innerText = name;
    taskName.appendChild(newIcon);
    taskName.appendChild(newImg);
    if(tag){
        taskName.innerHTML+="(0)";
    }
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "sumList");
    newDiv.appendChild(taskName);
    $(".classify")[0].appendChild(newDiv);
}
function showTaskNum() {
    var Category = JSON.parse(localStorage.getItem("Category"));
    var totalTsk = 0;
    if (Category) {
        for (var i in Category) {
            var subCategory = JSON.parse(localStorage.getItem("Class" + Category[i].id));//获取到大的分类
            var tskNum = 0;
            if (subCategory) {//如果存在子分类，检查任务的情况
                for (var j in subCategory) {
                    var subTsk = JSON.parse(localStorage.getItem("Task" + subCategory[j].id));
                    if (subTsk) {
                        tskNum += subTsk.length;
                    }
                }
            }
            $("#" + Category[i].id).innerHTML += " ( " + tskNum + " ) ";
            $("#" + Category[i].id).setAttribute("task-num", tskNum);
            totalTsk += tskNum;//总的任务数目
        }
    }
    $("#taskNum").innerHTML = totalTsk;
}
function deleteClass(e) {//删除大类
    e = e ? e : window.event;
    var target = e.srcElement ? e.srcElement : e.target;
    var clsArray, subClsArray, sure;
    clsArray = JSON.parse(localStorage.getItem("Category"));
    if (target.parentNode.tagName.toLocaleLowerCase() == "p") {//删除的是大类
        var node, location;//node为在localStorage中找到的元素，location为找到元素的位置
        for (var i in clsArray) {
            if (clsArray[i].id == target.parentNode.id) {
                node = clsArray[i];
                location = i;
            }
        }
        sure = confirm("您将要删除整个" + node.name + "类别以及其子类别，确认要删除么？");
        if (sure) {//确认删除
            if (localStorage.getItem("Class" + node.id)) {//删除存储的整个子类
                var subClass = JSON.parse(localStorage.getItem("Class" + node.id));
                for (var i in subClass) {//删除每个子类中的任务
                    if (localStorage.getItem("Task" + subClass[i].id)) {
                        localStorage.removeItem("Task" + subClass[i].id);
                    }
                }
                localStorage.removeItem("Class" + node.id);//删除每个类别
                $("#taskNum").innerHTML=parseInt($('#taskNum').innerText) - parseInt(target.parentNode.getAttribute("task-num"));
            }
            clsArray.splice(location, 1);//删除存储的大类
            localStorage.setItem("Category", JSON.stringify(clsArray));
            document.getElementById(node.id).parentNode.innerHTML = "";
            $("#allTask").innerHTML = "";
            $("#taskFinished").innerHTML = "";
            $("#taskUndo").innerHTML = "";
        }
    } else {//删除的是子类
        var subTarget = target.parentNode.parentNode.previousElementSibling;//大类
        var parentNode = $("#" + subTarget.id);
        var subCataloge = "Class" + subTarget.id;
        subClsArray = JSON.parse(localStorage.getItem(subCataloge));
        for (var j in subClsArray) {
            if (subClsArray[j].id == target.parentNode.id) {
                node = subClsArray[j];
                location = j;
                break;
            }
        }
        var targetId = target.parentNode.id;
        sure = confirm("您将要删除" + node.name + "么？");
        var subNum;
        if (sure) {
            if (localStorage.getItem("Task" + targetId)) {
                subNum = JSON.parse(localStorage.getItem("Task" + targetId)).length;
                localStorage.removeItem("Task" + targetId);
            }
            var taskNum = parentNode.getAttribute("task-num");
            var nowTsk = taskNum - subNum;
            parentNode.setAttribute("task-num", nowTsk);
            parentNode.removeChild(parentNode.lastChild);
            parentNode.innerHTML += "(" + nowTsk + ")";//修改大类的任务数目
            subClsArray.splice(location, 1);
            if (subClsArray.length == 0) {
                localStorage.removeItem(subCataloge);
            }
            else {
                localStorage.setItem(subCataloge, JSON.stringify(subClsArray));
            }
            document.getElementById(node.id).innerHTML = "";
            $("#allTask").innerHTML = "";
            $("#taskFinished").innerHTML = "";
            $("#taskUndo").innerHTML = "";
            $("#taskNum").innerHTML = parseInt($('#taskNum').innerText) - subNum;
        }
    }
}
function clickClass(e) {//显示二级分类
    e = e ? e : window.event;
    var target = e.srcElement ? e.srcElement : e.target;
    if (target.nextSibling == null) {//如果子类还没有显示出来
        var littleClass = "Class" + target.id;
        if (localStorage.getItem(littleClass)) {//显示子类
            var subClass = JSON.parse(localStorage.getItem(littleClass));//子类存储的key
            for (var j in subClass) {
                appendSubClass(subClass[j].parent, subClass[j].name, subClass[j].id,false);
                var tskNum = 0;
                var task = JSON.parse(localStorage.getItem('Task' + subClass[j].id));
                if (task) {
                    tskNum = task.length;
                }
                $("#" + subClass[j].id).innerHTML += "(" + tskNum + ")";
                $("#" + subClass[j].id).setAttribute("task-num", tskNum);
            }
        }
    }
    var node;//点击节点的复制
    removeClass(".taskName", "classActive");
    if ($(".subTask li")) {
        removeClass(".subTask li", "liActive");
    }
    addClass(target, "classActive");
    node = findStorageChild("Category", target.id);
    $("#createClassification").onclick = function () {
        if (node == undefined) {
            alert("不能给默认分类添加子类")
        } else {
            var name, subID;
            name = prompt("创建" + node.name + "的子分类", "");
            if (name != "" && name != null) {//当输入的子类别名字不为空时，将把子类别的ID号码放入到父类别的subClass中
                subID = new Date().getTime().toString();
                createSubClass(node, name, subID);//创建子分类
            }
        }
        $("#createClassification").onclick = createClass;//新增分类的按钮点击事件重新为添加大的分类
    };
    $("#addTask").onclick = function () {
        alert("请在右侧选择一个子分类");
    };
}
function clickSubClass(e) {//点击子分类的操作
    e = e ? e : window.event;
    var target = e.srcElement ? e.srcElement : e.target;
    removeClass(".subTask li", "liActive");
    removeClass("#defaultClass", "classActive");
    removeClass(".taskName", "classActive");
    addClass(target, "liActive");
    taskList(target);
    $("#addTask").onclick = function () {
        addTask(target);
    };
}
function taskList(parent) {//点击二级列表的时候，显示其列表所在的所有任务
    var taskItem = JSON.parse(localStorage.getItem("Task" + parent.id));
    $("#allTask").innerHTML = " ";
    $("#taskFinished").innerHTML = " ";
    $("#taskUndo").innerHTML = " ";
    if (taskItem) {
        var taskTitle = $(".taskTitle span");
        removeClass(".taskTitle span", "taskTitleActive");
        for (var i in taskItem) {
            if (taskItem[i].status == 0) {//未完成的任务添加到未完成列表
                appendTask(taskItem[i], parent.id, 2);
            } else {
                appendTask(taskItem[i], parent.id, 1);//否则添加到已经完成的列表中
            }
            appendTask(taskItem[i], parent.id, 0);//添加任务到所有的列表中
        }
    }
    $("#all").className = "taskTitleActive";
    removeClass(".content", "taskActive");
}
function addTask(parent) {//添加任务到任务的显示
    var taskNode = new task();
    taskNode.id = new Date().getTime();
    taskNode.parent = parent.id;
    taskNode.status = 0;//没有完成
    writeTask(taskNode, parent.id, true);
}
function writeTask(node, parentID, tag) {//node为任务节点，tag为了区分是更新任务列表还是创建任务列表；填写任务信息
    $("#showTask").style.display = "none";
    $("#writeTask").style.display = "block";
    var sure1;
    $("#mask").style.display="block";
    $("#mask").onclick = function () {
        sure1 = confirm("请问要放弃当前编辑的任务么？");
        if (sure1) {
            $("#mask").style.display="none";
            $("#showTask").style.display = "block";
            $("#writeTask").style.display = "none";
            $("#taskName").value = "";
            $("#taskTime").value = "";
            $("#taskContent").value = "";
        }
    };
    $("#submitTask").onclick = function () {
        var sure = confirm("确定提交任务么？");
        if (sure) {
            $("#mask").style.display="none";
            var retTask = checkTask();
            if (retTask) {//如果填写正确的话，将保存
                node.title = retTask.name;
                node.time = retTask.time;
                node.content = retTask.content;
                $("#assignmentTitle").innerText = node.title;
                $("#showTitle").setAttribute("data-parent", parentID);
                $("#showTitle").setAttribute("Task-ID", node.id);
                $("#assignmentTime").innerText = node.time;
                $("#assignmentContent").innerText = node.content;
                $("#writeTask").style.display = "none";//将填写的内容发布在右侧
                $("#showTask").style.display = "block";
                if (tag) {//存储任务
                    save("Task", parentID, node);//存储任务
                    appendTask(node, parentID, 2);//每次添加任务之后，都将添加所有任务和为完成的任务列表中，并且先添加未完成，在添加所有
                    appendTask(node, parentID, 0);
                    var subTskNum = parseInt($("#" + parentID).getAttribute("task-num")) + 1;
                    $("#" + parentID).setAttribute("task-num", subTskNum);
                    $("#" + parentID).removeChild($("#" + parentID).lastChild);
                    $("#" + parentID).innerHTML += "(" + subTskNum + ")";
                    var parent = $("#" + parentID).parentNode.previousSibling;
                    var totoalTsk = parseInt(parent.getAttribute("task-num")) + 1;
                    parent.removeChild(parent.lastChild);
                    parent.innerHTML += "(" + totoalTsk + ")";
                    parent.setAttribute("task-num", totoalTsk);
                    $("#taskNum").innerHTML = parseInt($('#taskNum').innerText) + 1;
                } else {//更新存储和显示的taskList
                    refreshList(node, parentID);
                }
                $("#taskName").value = "";
                $("#taskTime").value = "";
                $("#taskContent").value = "";
            }
        }
    };
}
function refreshList(node, parentID) {
    var replaceList = $("[My-task=" + node.id + "]");
    for (var i = 0; i < replaceList.length; i++) {
        replaceList[i].innerText = node.title;
        replaceList[i].previousSibling.innerText = node.time;
    }
    var array = JSON.parse(localStorage.getItem("Task" + parentID));
    for (var i in array) {
        if (array[i].id == node.id) {
            array[i].time = node.time;
            array[i].title = node.title;
            array[i].content = node.content;
        }
    }
    localStorage.setItem("Task" + parentID, JSON.stringify(array));
}

function editTask(e) {//修改任务的内容
    e = e ? e : window.event;
    var target = e.srcElement ? e.srcElement : e.target;
    var parent = target.parentNode;//subTitle;
    if (parent.getAttribute("data-parent")) {
        var taskItem = "Task" + parent.getAttribute("data-parent");
        var node = findStorageChild(taskItem, parent.getAttribute("Task-ID"));//找到localStorage中存储的节点
        if(node.status==0)//表示尚未完成
        {
            $("#taskName").value = node.title;
            $("#taskTime").value = node.time;
            $("#taskContent").value = node.content;
            writeTask(node, parent.getAttribute("data-parent"), false);
        }else{
            alert("任务已经完成，不能再进行编辑！");
        }
    }
    else {
        alert("不能编辑");
    }
}
function finishTask(e) {
    e = e ? e : window.event;
    var target = e.srcElement ? e.srcElement : e.target;
    var parent = target.parentNode;//subTitle;
    if (parent.getAttribute("data-parent")) {
        var taskItem = "Task" + parent.getAttribute("data-parent");
        var array = JSON.parse(localStorage.getItem(taskItem));//找到localStorage中存储的节点
        for (var i in array) {
            if (array[i].id == parent.getAttribute("Task-ID")) {//找到节点
                if(array[i].status==1){
                    alert("该任务已经完成！");
                }else{
                    var sure = confirm("确认您的任务" + $("#assignmentTitle").innerText + "已经完成");
                    if (sure) {
                        array[i].status = 1;//表示完成
                        localStorage.setItem(taskItem, JSON.stringify(array));
                    }
                    break;
                }
            }
            var replaceList = $("[My-task=" + parent.getAttribute("Task-ID") + "]");
            var divTask = replaceList[1].parentNode;
            var divContainer = divTask.parentNode;
            divContainer.removeChild(divTask);//从未完成中删除；
            $("#taskFinished").appendChild(divTask);
        }
    } else {
        alert("不能编辑");
    }
}
function checkTask() {//检查提交的任务是否符合要求
    var taskNode = {};
    if ($("#taskName").value == "") {
        alert("请填写任务的名称！");
        return false;
    } else {
        taskNode.name = $("#taskName").value;
    }
    var reg = /^(\d{4})\-(\d{2})\-(\d{2})$/;
    if (reg.test($("#taskTime").value)) {
        taskNode.time = $("#taskTime").value;
    } else {
        alert("请按照XXXX-XX-XX的形式填写！");
        return false;
    }
    if ($("#taskContent").value == "") {
        alert("请填写任务的内容！")
    } else {
        taskNode.content = $("#taskContent").value
    }
    return taskNode;
}

function createSubClass(parent, name, id) {//子类元素的赋值和存储
    var subClass = new newSubClass();
    subClass.name = name;
    subClass.parent = parent.id;
    subClass.id = id;
    appendSubClass(parent.id, name, subClass.id,true);//显示子类
    save("Class", parent.id, subClass);
}

function taskDetail(e) {//点击任务名字，显示具体的任务信息
    e = e ? e : window.event;
    var target = e.srcElement ? e.srcElement : e.target;
    removeClass(".content", "taskActive");
    addClass(target, "taskActive");
    var parentId = target.getAttribute("data-parent");
    var taskItem = "Task" + parentId;
    var node = findStorageChild(taskItem, target.id);
    $("#assignmentTitle").innerText = node.title;
    $("#showTitle").setAttribute("data-parent", parentId);
    $("#showTitle").setAttribute("Task-ID", target.id);
    $("#assignmentTime").innerText = node.time;
    $("#assignmentContent").innerText = node.content;
}

function appendSubClass(parentId, name, id,tag) {//显示子类别
    var parent = document.getElementById(parentId).parentNode;
    removeClass(parentId, "classActive");
    var newLi = document.createElement("li");
    newLi.id = id;
    newLi.innerText = name;
    newLi.setAttribute("task-num", "0");
    var newIcon = document.createElement("i");
    var newImg = document.createElement("img");
    newImg.setAttribute("src", "img/delete.png");
    newImg.setAttribute("class", "deleteTask");
    newLi.appendChild(newIcon);
    newLi.appendChild(newImg);
    if(tag){
        newLi.innerHTML+="(0)";
    }
    if (document.getElementById(parentId).nextSibling != null) {//如果ul已经存在，则直接插入
        document.getElementById(parentId).nextSibling.appendChild(newLi);
    } else {//否则先创建ul，在加入
        var newUl = document.createElement("ul");
        newUl.setAttribute("class", "subTask");
        newUl.appendChild(newLi);
        parent.appendChild(newUl);
    }
}

function save(item, parentID, ele) {//本地存储
    var saveItem, array = [];
    if (parent) {
        saveItem = item + parentID;
    } else {
        saveItem = item;
    }
    var hasSubClass = localStorage.getItem(saveItem);
    if (hasSubClass) {
        array = JSON.parse(hasSubClass);
        array.push(ele);
    } else {
        array.push(ele);
    }
    localStorage.setItem(saveItem, JSON.stringify(array));
}

function appendTask(node, parentId, index) {//填写完任务信息后，将新的任务加到所有任务的列表
    var taskTitle = $(".taskTitle span");
    var taskContent = $(".taskContent");
    for (var i = 0; i < taskTitle.length; i++) {
        taskTitle[i].className = "";
        taskContent[i].style.display = "none";
    }
    taskTitle[index].className = "taskTitleActive";
    taskContent[index].style.display = "block";
    var newDiv = document.createElement("div");
    var newNav = document.createElement("nav");
    newNav.innerText = node.time;
    newNav.setAttribute("class", "time");
    var newP = document.createElement("p");
    newP.innerText = node.title;
    newP.setAttribute("data-parent", parentId);
    newP.setAttribute("My-task", node.id);
    newP.setAttribute("class", "content");
    newP.id = node.id;
    removeClass(".content", "taskActive");
    addClass(newP, "taskActive");
    newDiv.appendChild(newNav);
    newDiv.appendChild(newP);
    taskContent[index].appendChild(newDiv);
}

function tab() {
    var taskTitle = $(".taskTitle span");
    var taskContent = $(".taskContent");
    taskTitle[0].setAttribute("class", "taskTitleActive");
    taskContent[0].style.display = "block";
    for (var i = 0; i < taskTitle.length; i++) {
        taskTitle[i].index = i;
        taskTitle[i].onclick = function () {
            removeClass(".taskTitle span", "taskTitleActive");
            for (var i = 0; i < taskTitle.length; i++) {
                taskContent[i].style.display = "none";
            }
            this.className = "taskTitleActive";
            taskContent[this.index].style.display = "block";
        };
    }
}
function findStorageChild(item, id) {
    var node;
    var storage = JSON.parse(localStorage.getItem(item));
    for (var i in storage) {
        if (storage[i].id == id) {
            node = storage[i];
            break;
        }
    }
    return node;
}
