//判断符号相同
function sameSign(a,b){
    return (a^b)>=0;//a,b异或大于0，符号相同
}

//向量的计算公式
function vector(a,b){
    return {
        x:b.x-a.x,
        y:b.y-a.y
    }
}
//两个的向量的差乘公式
function vectorProduct(v1,v2){
    return v1.x*v2.y-v2.x*v1.y;
}

//判断点在三角形内
function isPointTrangle(p,a,b,c){
    var pa=vector(p,a);
    var pb=vector(p,b);
    var pc=vector(p,c);

    var t1=vectorProduct(pa,pb);
    var t2=vectorProduct(pb,pc);
    var t3=vectorProduct(pc,pa);

    return sameSign(t1,t2) && sameSign(t2,t3);
}

function needDelay(elem,leftCorner,currMousePos){
    var offset=elem.offset();
    //三角形的底边两点
    var topLeft={
        x:offset.left,
        y:offset.top
    }
    var bottomLeft={
        x:offset.left,
        y:offset.top+elem.height()
    }

    return isPointTrangle(currMousePos,leftCorner,topLeft,bottomLeft);
}