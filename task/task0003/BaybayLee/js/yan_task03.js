/**
 * Created by liyan on 2015/5/12.
 */
var classfication=1;//用来记录每个大类别的ID编号
window.onload=function(){
    var storage= window.localStorage;
    showClass();
    $("#createClassification").onclick=createClass;
//    delegateEvent("#classContainer", "span", "click", deleteClass);
    delegateEvent("#classContainer", "img", "click", function(){alert("x");});
    delegateEvent("#classContainer","p","click",clickClass);

};
function newClass(id,name,subClass){//每个大的类别都有ID号，name也就是存储的名字，以及子类别
    this.id=id;
    this.name=name;
    this.subClass = subClass;
 }
function newSubClass(id,name,subClass,parent){
    this.id=id;
    this.name=name;
    this.subClass = subClass;
    this.parent=parent;
}
function createClass(){//创建新的大类
    var newCategory=new newClass();
    newCategory.name=prompt("分类名字：");//创建的名字
    if(newCategory.name!=""&&newCategory.name!=null){
        newCategory.subClass=[];//子类为0
        newCategory.id=classfication++;
        appendClass(newCategory.name,newCategory.id.toString());
        //本地存储
        var array=[];
        if(localStorage.getItem("Category")){
            array=JSON.parse(localStorage.getItem("Category"));//将已经存储数据转化json，并存入array中
            array.push(newCategory);
        }else{
            array.push(newCategory);
        }
        localStorage.setItem("Category",JSON.stringify(array));
    }
}
function showClass(){
    if(localStorage.getItem("Category")){
        var array=JSON.parse(localStorage.getItem("Category"));
        for(var i in array){
            appendClass(array[i].name,array[i].id.toString());
        }
    }
}
function appendClass(name,id){//html中显示元素
//    var newSpan = document.createElement("span");//创建html节点
//    newSpan.innerHTML =name;
    var newImg = document.createElement("img");
    newImg.setAttribute("class", "deleteTask");
    newImg.setAttribute("src", "img/delete.png");
    var newIcon=document.createElement("i");
    var taskName = document.createElement("p");
    taskName.setAttribute("class", "taskName");
    taskName.id=id;
    taskName.innerText=name;
    taskName.appendChild(newIcon);
    taskName.appendChild(newImg);

    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "sumList");
    newDiv.appendChild(taskName);
    $(".classify")[0].appendChild(newDiv);
}
function deleteClass(){//删除大类

}
function clickClass(e){//
    e=e?e:window.event;
    var target= e.srcElement ? e.srcElement : e.target;

    var taskName=$(".taskName");
    for(var i=0;i<taskName.length;i++){
        removeClass(taskName[i],"classActive");
    }
    addClass(target,"classActive");
    $("#createClassification").onclick=function(){
        var Category=JSON.parse(localStorage.getItem("Category"));
        var node;
        for(var i in Category){
            if(Category[i].id==target.id){
               node=Category[i];
                var array=node.subClass;
                array.push(node.id.toString()+(node.subClass.length).toString());
                node.subClass=array;
                Category[i]=node;
                localStorage.setItem("Category",JSON.stringify(Category));
                break;
            }
        }
        if(node==undefined){
            alert("不能给默认分类添加子类")
        }else{
            createSubClass(node);
        }
    };
}
function createSubClass(parent){
    var SubClass=new newSubClass();
   SubClass.name= prompt("创建"+parent.name+"的子分类","");
    if(SubClass.name!=""&&newSubClass.name!=null){
        SubClass.parent=parent.id;
        SubClass.id=parent.id.toString()+(parent.subClass.length+1).toString();
       SubClass.subClass=[];
    }


}
