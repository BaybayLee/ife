/**
 * Created by liyan on 2015/5/12.
 */
window.onload=function(){
    var storage= window.localStorage;
    $("#createClassification").onclick=newClass;
};
function newClass(){//创建
    var name=prompt("分类名字：");
    var newSpan = document.createElement("span");
    newSpan.innerHTML = name;
    var newSpan2 = document.createElement("span");
    newSpan2.setAttribute("class", "deleteTask");
    var newTask = document.createElement("div");
    newTask.setAttribute("class", "taskName");
    newTask.appendChild(newSpan);
    newTask.appendChild(newSpan2);
    var newClass = document.createElement("div");
    newClass.setAttribute("class", "sumList");
    newClass.appendChild(newTask);
    $(".classify")[0].appendChild(newClass);
}