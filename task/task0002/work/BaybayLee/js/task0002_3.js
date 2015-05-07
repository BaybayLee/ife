/**
 * Created by liyan on 2015/4/28.
 */
var timer=null;
var timer1=null;
var nowZindex=2;//使得图片呈现
var now=0;//记录当前播放的图片
var list=document.getElementsByTagName("span");
var pic=document.getElementsByTagName("li");
window.onload =function(){
    list[0].className="active";
    for(var i=0;i<list.length;i++){//下方的按钮与图片的对应
        list[i].index=i;//为底下的悬浮按钮添加属性index
        list[i].removeAttribute("class","active");
        list[i].onclick=function(){
            clearInterval(timer);
            if(this.index==now) return;//呈现的已是当前图片，则不作操作
            if(this.index<now)//呈现的已是当前图片，则不作操作
            {
                now=this.index;//呈现的已是当前图片，则不作操作
                slide(pic[now],-1280);//从最左边的1280处开始滑动
            }else{
                now=this.index;
                slide(pic[now],1280);//从右边滑动
            }
            timer1= setInterval(autoSlide,5000);//滑动结束后，重新开启自动定时器
        };
    }
   timer1= setInterval(autoSlide,5000);//自动滑动
};
function autoSlide(){
    now++;
    if(now==pic.length){
        now=0;
    }
    slide(pic[now],"1280");
}
function slide(obj,start){//图片滑动
   obj.style.zIndex=nowZindex++;//在最高的zindex显示
    obj.style.left=start+"px";
    clearInterval(timer1);
    for(var i=0;i<list.length;i++){
        list[i].removeAttribute("class","active");
    }
    list[now].setAttribute("class","active");
    timer=setInterval(function(){
        if(start<0){
            if(obj.offsetLeft>=0){
                obj.style.left=0;
                clearInterval(timer);
            }else{
                obj.style.left=obj.offsetLeft+128+"px";
            }
        }else {
            if (obj.offsetLeft<=0) {
                obj.style.left = 0;
                clearInterval(timer);
            } else {
                obj.style.left = obj.offsetLeft - 128 + "px";
            }
        }
    },30);
    timer1=setInterval(autoSlide,5000);
}
