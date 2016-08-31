
(function ($) {

    var RollAd = function (rollAd) {
        var self = this;
        this.rollAd = rollAd;
        this.rollItems =  rollAd.find('.roll-item');
        this.firstRollItem = this.rollItems.first();
        this.secondRollItem = this.firstRollItem.next();
        this.lastRollItem = this.rollItems.last();

        this.prevBtn =  rollAd.find('.roll-prev-btn');
        this.nextBtn =  rollAd.find('.roll-next-btn');

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


    };
    RollAd.prototype = {

        initPosition:function () {

            var firPos =  (800 - 520 - 20 )/2;

            this.firstRollItem.css({
                "left":firPos,
                "width":520+20,
                "height":220+10,
                "opacity":1,
                //Math.ceil 向上取整
                "zIndex":33,
                "top":0
            }).attr('nowflag','0');

            console.log("..gg.nowflag... 000.");
            this.secondRollItem.css({
                "left":800 - 520,
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

            if(parseInt(this.nowflag) >= 7){

                this.nowflag = 0;

            }else if(parseInt(this.nowflag) < 0){

                this.nowflag = 6;
            }
            console.log(".... this.nowflag...."+  this.nowflag);
            var nowEle = this.rollItems.eq(this.nowflag).removeAttr('nowflag');
            var that = this;
            var nextEle =  nowEle.next().get(0)? nowEle.next() : this.firstRollItem;
            var prev = nowEle.prev().get(0)? nowEle.prev() : this.lastRollItem;

            if(type == 'next'){
                var nextEleTwo =  nextEle.next().get(0)? nextEle.next() : this.firstRollItem;

                nextEleTwo.animate(this.getEleCss(nextEle),1000,function () {
                    that.rollFlag = true;
                });

                nextEle.animate(this.getEleCss(nowEle),1000,function () {
                    that.rollFlag = true;
                }).attr('nowflag',++this.nowflag);

                nowEle.css("opacity","22");
                nowEle.animate(this.getEleCss(prev),1000,function () {
                    that.rollFlag = true;
                });

                prev.animate({
                    "width":"520px",
                    "height":"220px",
                    "zIndex":0,
                    "left":"140px",
                    "opacity":0,
                    "top":"10px"
                },1000,function () {
                    that.rollFlag = true;
                });

            }

            if(type =='prev'){
                var prevEleTwo =  prev.prev().get(0)? prev.prev() : this.lastRollItem;


                prevEleTwo.animate(this.getEleCss(prev),1000,function () {
                    that.rollFlag = true;
                });

                prev.animate(this.getEleCss(nowEle),1000,function () {
                    that.rollFlag = true;
                }).attr('nowflag',--this.nowflag);

               // nowEle.css("opacity","22");
                nowEle.animate(this.getEleCss(nextEle),1000,function () {
                    that.rollFlag = true;
                });

                nextEle.animate({
                    "width":"520px",
                    "height":"220px",
                    "zIndex":0,
                    "left":"140px",
                    "opacity":0,
                    "top":"10px"
                },1000,function () {
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
        }


    };

    RollAd.init = function (rollAd) {
        rollAd.each(function (index,ele) {

            new RollAd($(this));

        });
    };

    window['RollAd'] = RollAd;

})(jQuery)




























