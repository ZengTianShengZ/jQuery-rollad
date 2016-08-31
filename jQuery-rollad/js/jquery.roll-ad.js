
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
                console.log("..gg.nowflag... 111.");
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

            }
            var nowEle = this.rollItems.eq(this.nowflag).removeAttr('nowflag');
            console.log("..xxxxxxxxxxxxFFGG...."+this.nowflag );
            var that = this;
            if(type == 'next'){

                var nextEle =  nowEle.next().get(0)? nowEle.next() : this.firstRollItem;
                var nextEleTwo =  nextEle.next().get(0)? nextEle.next() : this.firstRollItem;
                var prev = nowEle.prev().get(0)? nowEle.prev() : this.lastRollItem;

                var     width = nextEle.css("width"),
                        height = nextEle.css("height"),
                        zIndex = nextEle.css("zIndex"),
                        opacity = nextEle.css("opacity"),
                        left = nextEle.css("left"),
                        top = nextEle.css("top");

                nextEleTwo.animate({ 
                    "width":width,
                    "height":height,
                    "zIndex":zIndex,
                    "left":left,
                    "opacity":opacity,
                    "top":top
                },1000,function () {
                    that.rollFlag = true;
                });

                var width1 = nowEle.css("width"),
                    height1 = nowEle.css("height"),
                    zIndex1 = nowEle.css("zIndex"),
                    opacity = nowEle.css("opacity"),
                    left1 = nowEle.css("left"),
                    top1 = nowEle.css("top") ;

                nextEle.animate({
                    "width":width1,
                    "height":height1,
                    "zIndex":zIndex1,
                    "left":left1,
                    "opacity":opacity,
                    "top":top1
                },1000,function () {
                    that.rollFlag = true;
                }).attr('nowflag',++this.nowflag);


                var width2 = prev.css("width"),
                    height2 = prev.css("height"),
                    zIndex2 = prev.css("zIndex"),
                    opacity = prev.css("opacity"),
                    left2 = prev.css("left"),
                    top2 = prev.css("top") ;
                nowEle.css("zIndex","22");
                nowEle.animate({
                    "width":width2,
                    "height":height2,
                    "zIndex":zIndex2,
                    "left":left2,
                    "opacity":opacity,
                    "top":top2
                },1000,function () {
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
        }


    };

    RollAd.init = function (rollAd) {
        rollAd.each(function (index,ele) {

            new RollAd($(this));

        });
    };

    window['RollAd'] = RollAd;

})(jQuery)




























