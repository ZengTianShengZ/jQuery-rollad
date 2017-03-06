#jQuery-rollad
##广告轮番图--模仿网易云音乐的广告轮播图

###这是网易音乐的效果图：
![wangyi](https://raw.githubusercontent.com/ZengTianShengZ/jQuery-rollad/master/jQuery-rollad/images/wangyi.png)

###这是轮播插件的效果图：
 ![rollADx](https://raw.githubusercontent.com/ZengTianShengZ/jQuery-rollad/master/jQuery-rollad/images/rolladimg.png)

只需将项目的 html 模板插入到你的html页面中：

```
  <article class="jq-roll">
    <!--......-->
  </article>
```

并在html头部加入样式

```
 <link type="text/css" rel="stylesheet" href="css/roll-ad.css">
```
body底部加入 script 脚本即可

```
    <script src="js/jquery.roll-ad.js"></script>

    <script>
        RollAd.init($('.rollad'));
    </script>
```

其中 `<div class="rollad" ` 的 `data-setting` 属性 应许你自定义，设置你所需的参数

```
 <div class="rollad" data-setting ='{
            "width":800,
            "height":250,
            "liWidth":520,
            "liHeight":220,
            "delay":1000
        }'>
```
