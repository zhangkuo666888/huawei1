/**
 * auther: tianxi, qq:   wechat: tel: fed:   email
 */
;(function (){
    /**
     * 动画
     * @param ele 要运动的元素
     * @param target 要运动的终点
     * @param duration 在多长时间内完成运动
     * @param callback 运动结束之后要执行函数
     */
    function animate(ele,target,duration,callback){ // ['Quad','easeOut'] 1 2 3 4 5
        //zhufengEffect.Quad.easeOut
        //zhufengEffect[effect[0]][effect[1]]
        //zhufengEffect['Quad']['easeOut']
        var time = 0;
        var begin = {};
        var change = {};
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        var  interval = 10;
        ele.timer && window.clearInterval(ele.timer); //只要运动的元素有自定义属性保存着定时器那么在下一次执行的时候一定要把上一次的定时器清掉，无论是否已经到达终点
        ele.timer = window.setInterval(function (){
            time += interval;
            if(time >= duration){ //到达终点传入回调函数
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback == 'function'){ //callback参数是一个函数
                    callback.call(ele); //把回调函数中的this修改成运动的那个元素
                }
                return;
            }
            for(var key in change){
                if(change[key]){ //在当前这个属性上有变化
                    var val = linear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },interval);
    }
    function linear(t, b, c, d) {
        return c * t / d + b;
    }
    window.animate = animate;
})();

