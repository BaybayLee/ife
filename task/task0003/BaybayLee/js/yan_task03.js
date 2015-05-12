/**
 * Created by liyan on 2015/5/12.
 */
var classfication=1;//用来记录每个大类别的ID编号
window.onload=function(){
    var storage= window.localStorage;
    $("#createClassification").onclick=createClass;
//    delegateEvent("#classContainer", "span", "click", deleteClass);
    delegateEvent("#classContainer", "span", "click", function(){alert("x");});

};
function newClass(id,name,subClass){//每个大的类别都有ID号，name也就是存储的名字，以及子类别
    this.id=id;
    this.name=name;
    this.subClass = subClass;
 }

function createClass(){//创建新的大类
    var newCategory=new newClass();
    newCategory.id=classfication;
    classfication++;
    newCategory.subClass={};//子类为0
    newCategory.name=prompt("分类名字：");//创建的名字
    appendClass(newCategory.name);
    //本地存储
    var array=[];
    if(localStorage.getItem("Category")){

        array=JSON.parse(localStorage.getItem("Category"));//将已经存储数据转化json
//        array.push(classJson);
        array.push(newCategory);
//        array=JSON.stringify(array).replace("[","").replace("]","");

    }else{
        array.push(newCategory);
    }
    localStorage.setItem("Category",JSON.stringify(array));
}
function showClass(){
    if(localStorage.getItem("Category")){

    }
}
function appendClass(name){
    var newSpan = document.createElement("span");//创建html节点
    newSpan.innerHTML =name;
    var newSpan2 = document.createElement("span");
    newSpan2.setAttribute("class", "deleteTask");
    var taskName = document.createElement("div");
    taskName.setAttribute("class", "taskName");
    taskName.appendChild(newSpan);
    taskName.appendChild(newSpan2);
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "sumList");
    newDiv.appendChild(taskName);
    $(".classify")[0].appendChild(newDiv);
}
function deleteClass(){//删除大类

}