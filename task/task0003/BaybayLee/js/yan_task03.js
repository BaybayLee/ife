/**
 * Created by liyan on 2015/5/12.
 */
//var classfication;//用来记录每个大类别的ID编号
window.onload=function(){
//    var storage= window.localStorage;
    showClass();//将本地存储的数据显示出来
    $("#createClassification").onclick=createClass;
//    delegateEvent("#classContainer", "span", "click", deleteClass);
    delegateEvent("#classContainer", "img", "click", deleteClass);
    delegateEvent("#classContainer","p","click",clickClass);

};
function newClass(id,name){//每个大的类别都有ID号，name也就是存储的名字，以及子类别
    this.id=id;
    this.name=name;
    //this.subClass = subClass;
 }
function newSubClass(id,name,parent){
    this.id=id;
    this.name=name;
    this.parent=parent;
}
function createClass(){//创建新的大类
    var newCategory=new newClass();
    newCategory.name=prompt("分类名字：");//创建的名字
    if(newCategory.name!=""&&newCategory.name!=null){
        //newCategory.subClass=[];//子类为0
        newCategory.id=new Date().getTime().toString();
        appendClass(newCategory.name,newCategory.id);
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
function showClass(){//将本地存储的数据显示出来
    if(localStorage.getItem("Category")){
        var array=JSON.parse(localStorage.getItem("Category"));
        for(var i in array){
            appendClass(array[i].name,array[i].id);
            var littleClass="Class"+array[i].id;
            if(localStorage.getItem(littleClass)){//显示子类
                var subClass=JSON.parse(localStorage.getItem(littleClass));//子类存储的key
                for(var j in subClass){
                    appendSubClass(subClass[j].parent,subClass[j].name,subClass[j].id);
                }
            }
        }
    }
}
function appendClass(name,id){//html中显示元素
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
function deleteClass(e){//删除大类
    e=e?e:window.event;
    var target= e.srcElement? e.srcElement: e.target;
    var calsArray,subClsArray,sure;
    calsArray=JSON.parse(localStorage.getItem("Category"));
    if(target.parentElement.tagName.toLocaleLowerCase()=="p"){//删除的是大类
        var node,location;//node为找到的元素，location为找到元素的位置
        for(var i in calsArray){
            if (calsArray[i].id==target.parentElement.id){
                node=calsArray[i];
                location=i;
            }
        }
      sure=confirm("您将要删除整个"+node.name+"类别以及其子类别，确认要删除么？")
        if(sure){//确认删除
            if(localStorage.getItem("Class"+node.id)){//删除存储的整个子类
                localStorage.removeItem("Class"+node.id);
            }
            calsArray.splice(location,1);//删除存储的大类
            localStorage.setItem("Category",JSON.stringify(calsArray));
            document.getElementById(node.id).parentNode.innerHTML="";
        }
    }else
    {//删除的是子类
        var subCataloge="Class"+target.parentElement.parentElement.previousElementSibling.id;
        subClsArray=JSON.parse(localStorage.getItem(subCataloge));
        for(var j in subClsArray){
            if(subClsArray[j].id==target.parentElement.id){
                node=subClsArray[j];
                location=j;
            }
        }
        sure=confirm("您将要删除"+node.name+"么？");
        if(sure){
            subClsArray.splice(location,1);
            if(subClsArray.length==0){
                localStorage.removeItem(subCataloge);
            }
           else{localStorage.setItem(subCataloge,JSON.stringify(subClsArray));}
            document.getElementById(node.id).innerHTML="";
        }
    }
//    alert(target.parentElement.tagName.toLocaleLowerCase());
}
function clickClass(e){//点击创建二级分类
    e=e?e:window.event;
    var target= e.srcElement ? e.srcElement : e.target;
//    alert(target.parentElement.tagName);
    var taskName=$(".taskName");
    for(var i=0;i<taskName.length;i++){
        removeClass(taskName[i],"classActive");
    }
    addClass(target,"classActive");
    $("#createClassification").onclick=function(){
        var Category=JSON.parse(localStorage.getItem("Category"));
        var node,name,subID;
        for(var i in Category){
            if(Category[i].id==target.id){
                node=Category[i];
                name=prompt("创建"+node.name+"的子分类","");
                if(name!=""&&name!=null){//当输入的子类别名字不为空时，将把子类别的ID号码放入到父类别的subClass中
                    subID=new Date().getTime().toString();
                    //var array=node.subClass;
                    //array.push(node.id.toString()+subID);
                    //node.subClass=array;
                    //Category[i]=node;
                    //localStorage.setItem("Category",JSON.stringify(Category));
                    createSubClass(node,name,subID);//创建子分类
                }
                break;
            }
        }
        if(node==undefined){
            alert("不能给默认分类添加子类")
        }
        $("#createClassification").onclick=createClass;
    };

}
function createSubClass(parent,name,id){//子类元素的赋值和存储
    var subClass=new newSubClass();
    subClass.name=name;
    subClass.parent = parent.id;
    subClass.id = id;
    appendSubClass(parent.id,name,subClass.id);//显示子类
    //存储子类
    var littleClass="Class"+parent.id;
    var array=[];
    var hasSubClass=localStorage.getItem(littleClass);
    if(hasSubClass){
         array=JSON.parse(hasSubClass);
         array.push(subClass);
    }else{
        array.push(subClass);
    }
    localStorage.setItem(littleClass,JSON.stringify(array));
}
function appendSubClass(parentId,name,id){//显示子类别
    var parent=document.getElementById(parentId).parentNode;
    removeClass(document.getElementById(parentId),"classActive");
    var newLi=document.createElement("li");
    newLi.id=id;
    newLi.innerText=name;
    var newIcon=document.createElement("i");
    var newImg=document.createElement("img");
    newImg.setAttribute("src","img/delete.png");
    newImg.setAttribute("class","deleteTask");
    newLi.appendChild(newIcon);
    newLi.appendChild(newImg);
    if(document.getElementById(parentId).nextSibling!=null){//如果ul已经存在，则直接插入
        document.getElementById(parentId).nextSibling.appendChild(newLi);
    }else{//否则先创建ul，在加入
        var newUl=document.createElement("ul");
        newUl.setAttribute("class","subTask");
        newUl.appendChild(newLi);
        parent.appendChild(newUl);
    }
}