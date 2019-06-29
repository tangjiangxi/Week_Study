(function(){
    // 匿名函数模仿块级作用域  避免在函数内部定义变量随处访问的问题
    // 圆括号扩起来是因为函数声明后面是不可以跟圆括号的
    // 在临时需要一些变量，就可以使用私有作用域
})()
// 先定义一个函数   在调用它 
// var somefunction=function(){ }
// somefunction()
// --------------------------事件封装-----------------------------
var EventUtil={
    // 添加事件
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler); //ie
        }else{
            element["on"+type]=handler
        }
    },
    // 移除事件
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.detachEvent("on"+type,handler); //ie
        }else{
            element["on"+type]=null;
        }
    },
    //跨浏览器事件对象
    getEvent:function(){
        return event?event:window.event;
    },
    // 事件对象目标
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    // 组织事件默认行为
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    // 停止事件传播
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },
};
// -------------------------ajax交互-----------------------------
// 创建XMLHttpRequest对象   主要是兼容ie早期版本
var AjaxC={
    createXHL:function(){
        if(typeof XMLHttpRequest!="undefined"){
            return new XMLHttpRequest();
        }else if(typeof ActiveXObject!="undefined"){
            if(typeof arguments.callee.activeXString!="string"){
                var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                i,len;
                for(i=0,len=versions.length;i<len;i<len){
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString=versions[i];
                        break;
                    }catch{
                        // 
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }else{
            throw new Error ("NO XHR object available")
        }
    },
    // get请求后面追加名-值对
    addURLParam(url,name,value){
        url+=(url.indexOf("?")==-1 ? "?":"&");
        url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
        return url;
    }
};