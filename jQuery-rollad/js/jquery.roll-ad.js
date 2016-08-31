
(function ($) {

    var RollAd = function (rollAd) {
        var self = this;
        this.rollAd = rollAd;
        this.rollItems =  rollAd.find('.roll-item');
        this.firstRollItem = this.rollItems.first();
        this.secondRollItem = this.firstRollItem.next();
        this.lastRollItem = this.rollItems.last();

        this.initPosition();

    };
    RollAd.prototype = {


        initPosition:function () {

            var firPos =  (800 - 520 - 20 )/2;

            this.firstRollItem.css({
                "left":firPos,
                "width":520+20,
                "height":220+10,
                //Math.ceil 向上取整
                "zIndex":Math.ceil(this.rollItems.size()),
                "top":0
            });

            this.secondRollItem.css({
                "left":800 - 520,
                "zIndex":Math.ceil(this.rollItems.size()-1),
                "top":10
            });

            this.lastRollItem.css({
                "left":0,
                "zIndex":Math.ceil(this.rollItems.size()-1),
                "top":10
            });
        }


    };

    RollAd.init = function (rollAd) {
        rollAd.each(function (index,ele) {

            new RollAd($(this));

        });
    };

    window['RollAd'] = RollAd;

})(jQuery)




























