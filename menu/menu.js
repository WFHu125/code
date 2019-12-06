$(document).ready(function(){
    var sub=$("#sub");
    var activeRow,activeMenu;
    var timer;
    var mouseInSub=false;//判断是否在子菜单内
    sub.on("mouseenter",function(e){
        mouseInSub=true;
    }).on("mouseleave",function(e){
        mouseInSub=false;
    });

    var mouseTrack=[];//记录鼠标的位置
    var moveHanlder=function(e){
        mouseTrack.push({
            x:e.pageX,
            y:e.pageY
        });
        if(mouseTrack.length>3){
            mouseTrack.shift();
        }
    }
    $("#test").on("mouseenter",function(e){
        sub.removeClass("none");

        $(document).bind("mousemove",moveHanlder);
    }).on("mouseleave",function(e){
        sub.addClass("none");
        if(activeRow){
            activeRow.removeClass("active");
            activeRow=null;
        } 
        if(activeMenu){
            activeMenu.addClass("none");
            activeMenu=null;
        }

        $(document).unbind("mousemove",moveHanlder);
    }).on("mouseenter","li",function(e){
        if(!activeRow){
            activeRow=$(e.target).addClass("active");
            activeMenu=$("#"+activeRow.data("id"));
            activeMenu.removeClass("none");
            return;
        }

        if(timer){
            clearTimeout(timer);
        }

        var currentmousePos=mouseTrack[mouseTrack.length-1];//当前鼠标的位置
        var leftCorner=mouseTrack[mouseTrack.length-2];//鼠标上次的位置

        var delay=needDelay(sub,leftCorner,currentmousePos);
        if(delay){
            timer=setTimeout(function(){
                if(mouseInSub){
                    return;
                }
                activeRow.removeClass("active");
                activeMenu.addClass("none");
    
                activeRow=$(e.target);
                activeRow.addClass("active");
                activeMenu=$("#"+activeRow.data("id"));
                activeMenu.removeClass("none");
                timer=null;
            },300)
        }else{
            var preActiveRow=activeRow;
            var preActiveMenu=activeMenu;
            activeRow=$(e.target);
            activeMenu=$("#"+activeRow.data("id"));

            preActiveRow.removeClass("active");
            preActiveMenu.addClass("none");

            activeRow.addClass("active");
            activeMenu.removeClass("none");
        }
    });
});