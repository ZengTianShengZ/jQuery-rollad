
;(function ($) {

    var RollAd = function (rollAd) {
        var self = this;
        this.rollAd = rollAd;
        this.rollItems =  rollAd.find('.roll-item');
        this.firstRollItem = this.rollItems.first();
        this.secondRollItem = this.firstRollItem.next();
        this.lastRollItem = this.rollItems.last();

        this.prevBtn =  rollAd.find('.roll-prev-btn');
        this.nextBtn =  rollAd.find('.roll-next-btn');
        this.rollBtn =  rollAd.find('.roll-btn');

       this.rollItemLen =  this.rollItems.length;
        //默认参数
        this.setting = {
            "width":800,
            "height":250,
            "liWidth":520,
            "liHeight":220,
            "delay":1000
        }
        //自定义参数与默认参数合并，jq 的 extend 方法
        $.extend(this.setting,this.getSetting())

        this.initPosition();

        this.rollFlag = true;
        this.prevBtn.bind('click',function () {
            if(self.rollFlag){
                self.rollFlag = false;
                self.rotateAnimate('prev');
            }
        });
        this.nextBtn.bind('click',function () {
            if(self.rollFlag){
                self.rollFlag = false;
                self.rotateAnimate('next');

            }
        });

        this.autoRoll();
        this.rollAd.hover(function(){
            clearInterval(self.timer);
            self.rollBtn.fadeIn(600);
        },function(){
            self.autoRoll();
            self.rollBtn.fadeOut(600);

        });

    };
    RollAd.prototype = {

        autoRoll:function () {
            var roll_this =  this;
            this.timer = window.setInterval(function () {
                  roll_this.nextBtn.click();
              },roll_this.setting.delay);
        },
        initPosition:function () {
            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var firPos =  (rollWidth - liWidth - 20 )/2;

            this.rollAd.css({"width":rollWidth,"height":rollHeight});

            this.rollItems.each(function (index,item) {
                $(this).css({"width":liWidth,"height":liHeight,"left":firPos});
            });

            this.firstRollItem.css({
                "left":firPos,
                "width":liWidth+20,
                "height":liHeight+10,
                "opacity":1,
                //Math.ceil 向上取整
                "zIndex":33,
                "top":0
            }).attr('nowflag','0');

            this.secondRollItem.css({
                "left":rollWidth - liWidth,
                "opacity":0.5,
                "zIndex":22,
                "top":10
            });

            this.lastRollItem.css({
                "left":0,
                "opacity":0.5,
                "zIndex":22,
                "top":10
            });
        },

        "nowflag":0,

        rotateAnimate:function (type) {

            var rollWidth = this.setting.width;
            var rollHeight = this.setting.height;
            var liWidth = this.setting.liWidth;
            var liHeight = this.setting.liHeight;
            var delay =  this.setting.delay;

            if(parseInt(this.nowflag) >= this.rollItemLen){

                this.nowflag = 0;

            }else if(parseInt(this.nowflag) < 0){

                this.nowflag = this.rollItemLen - 1;
            }
            console.log(".... this.nowflag...."+  this.nowflag);
            var nowEle = this.rollItems.eq(this.nowflag).removeAttr('nowflag');
            var that = this;
            var nextEle =  nowEle.next().get(0)? nowEle.next() : this.firstRollItem;
            var prev = nowEle.prev().get(0)? nowEle.prev() : this.lastRollItem;

            if(type == 'next'){
                var nextEleTwo =  nextEle.next().get(0)? nextEle.next() : this.firstRollItem;

                nextEleTwo.animate(this.getEleCss(nextEle),delay,function () {
                    that.rollFlag = true;
                });

                nextEle.animate(this.getEleCss(nowEle),delay,function () {
                    that.rollFlag = true;
                }).attr('nowflag',++this.nowflag);

               // nowEle.css("opacity","22");
                nowEle.animate(this.getEleCss(prev),delay,function () {
                    that.rollFlag = true;
                });

                prev.animate({
                    "width":liWidth,
                    "height":liHeight,
                    "zIndex":0,
                    "left":"140px",
                    "opacity":0,
                    "top":"10px"
                },delay,function () {
                    that.rollFlag = true;
                });

            }

            if(type =='prev'){
                var prevEleTwo =  prev.prev().get(0)? prev.prev() : this.lastRollItem;


                prevEleTwo.animate(this.getEleCss(prev),delay,function () {
                    that.rollFlag = true;
                });

                prev.animate(this.getEleCss(nowEle),delay,function () {
                    that.rollFlag = true;
                }).attr('nowflag',--this.nowflag);

               // nowEle.css("opacity","22");
                nowEle.animate(this.getEleCss(nextEle),delay,function () {
                    that.rollFlag = true;
                });

                nextEle.animate({
                    "width":liWidth,
                    "height":liHeight,
                    "zIndex":0,
                    "left":"140px",
                    "opacity":0,
                    "top":"10px"
                },delay,function () {
                    that.rollFlag = true;
                });

            }
        },
        getEleCss:function (ele) {
            var     width = ele.css("width"),
                height = ele.css("height"),
                zIndex = ele.css("zIndex"),
                opacity = ele.css("opacity"),
                left = ele.css("left"),
                top = ele.css("top");

            return {
                "width":width,
                "height":height,
                "zIndex":zIndex,
                "left":left,
                "opacity":opacity,
                "top":top
            }
        },
        getSetting:function () {
            var setting = this.rollAd.attr('data-setting');
            if(setting != undefined){
                // 解析 json ，返回 obj  ， javascript 的 json 数据 跟对象一样一样的
                return $.parseJSON(setting);
            }else{
                return {} ;
            }
        }
    };

    RollAd.init = function (rollAd) {
        rollAd.each(function (index,ele) {
            new RollAd($(this));
        });
    };

    window['RollAd'] = RollAd;

})(jQuery);
