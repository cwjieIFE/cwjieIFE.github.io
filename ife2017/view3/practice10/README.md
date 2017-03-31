# Flexbox 属性详解

注释：本文的图来自

 [http://www.css88.com/archives/7212](http://www.css88.com/archives/7212)

[http://www.w3cplus.com/css3/a-guide-to-flexbox.html](http://www.w3cplus.com/css3/a-guide-to-flexbox.html)

简介:
English:
In the flex layout model, the children of a flex container can be laid out in any direction, and can “flex” their sizes, either growing to fill unused space or shrinking to avoid overflowing the parent. Both horizontal and vertical alignment of the children can be easily manipulated. Nesting of these boxes (horizontal inside vertical, or vertical inside horizontal) can be used to build layouts in two dimensions.([https://www.w3.org/TR/2015/WD-css-flexbox-1-20150514/](https://www.w3.org/TR/2015/WD-css-flexbox-1-20150514/ "W3C"))

China:	 flexbox的出现是为了解决复杂的web布局，因为这种布局方式很灵活。容器的子元素可以任意方向进行排列。此属性目前处于非正式标准，以下是各浏览器对flexbox的支持程度，在较新的浏览器中基本可以使用该属性。


![Alt text](/markdown/2716002657-56fde33ed34c2_articlex.png)

## Flexbox 模型及其术语

flex布局模型不同于块和内联模型布局，块和内联模型的布局计算依赖于块和内联的流方向，而flex布局依赖于flex directions.简单的说：Flexbox是布局模块，而不是一个简单的属性，它包含父元素(flex container)和子元素(flex items)的属性。

1.主轴、主轴方向(main axis |main dimension)：用户代理沿着一个伸缩容器的主轴配置伸缩项目，主轴是主轴方向的延伸。

2.主轴起点、主轴终点(main-start |main-end)：伸缩项目的配置从容器的主轴起点边开始，往主轴终点边结束。

3.主轴长度、主轴长度属性(main size |main size property)：伸缩项目的在主轴方向的宽度或高度就是项目的主轴长度，伸缩项目的主轴长度属性是width或height属性，由哪一个对着主轴方向决定。

4.侧轴、侧轴方向(cross axis |cross dimension)：与主轴垂直的轴称作侧轴，是侧轴方向的延伸。

5.侧轴起点、侧轴终点(cross-start |cross-end)：填满项目的伸缩行的配置从容器的侧轴起点边开始，往侧轴终点边结束。

6.侧轴长度、侧轴长度属性(cross size |cross size property)：伸缩项目的在侧轴方向的宽度或高度就是项目的侧轴长度，伸缩项目的侧轴长度属性是"width"或"height"属性，由哪一个对着侧轴方向决定。

![Alt text](/markdown/2886917468-56fde3412376f_articlex.png)


### 用例

水平居中

	//HTML	
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>center</title>
	    <link rel="stylesheet" href="./center.css">
	</head>
	<body>
	    <div class="parent"><div class="child"></div></div>
	</body>
	</html>

	//css

	body{
    padding: 0;
    margin: 0;
	}
	
	.parent {
	  display: flex;
	  height: 300px; /* Or whatever */
	  background-color: black;
	}
	
	.child {
	  width: 100px;  /* Or whatever */
	  height: 100px; /* Or whatever */
	  margin: auto;  /* Magic! */
	  background-color: white;
	}


六个子元素布局

	//HTML

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>six</title>
	    <link rel="stylesheet" href="./six.css">
	</head>
	<body>
	    <ul class="flex-container">
	        <li class="flex-item">1</li>
	        <li class="flex-item">2</li>
	        <li class="flex-item">3</li>
	        <li class="flex-item">4</li>
	        <li class="flex-item">5</li>
	        <li class="flex-item">6</li>
	    </ul>
	</body>
	</html>

	//css
	body{ margin: 0;padding: 0;}
	ul {margin: 0;padding: 0;}
	li{list-style: none;}
	.flex-container {display: flex;flex-flow: row wrap;justify-content: space-around;}
	.flex-item {background: tomato;padding: 5px;width: 200px;height: 150px;margin-top: 10px; line-height: 150px;color: white;font-weight: bold;font-size: 3em;text-align: center;
	}

效果

![Alt text](/markdown/1140460893-56fde34372ee9_articlex.png)
		
## 属性解释


### 1.display（flex container）

	display: other values | flex | inline-flex;


![Alt text](/markdown/1-L2W-ziqU45a1BNWV79ijDQ.gif)

### 2.flex-direction（flex container）

这个主要用来创建主轴，从而定义了伸缩项目放置在伸缩容器的方向。
	
	flex-direction: row | row-reverse | column | column-reverse

>row(默认值)：在“ltr”排版方式下从左向右排列；在“rtl”排版方式下从右向左排列。

>row-reverse：与row排列方向相反，在“ltr”排版方式下从右向左排列；在“rtl”排版方式下从左向右排列.

>column：类似 于row，不过是从上到下排列.

>column-reverse：类似于row-reverse，不过是从下到上排列。



![Alt text](/markdown/2142640250-56fde345574b6_articlex.png)
![Alt text](/markdown/1-PBr_ncouIehALaEOWmSbpQ.gif)


![Alt text](/markdown/1-4yKnG2-vuPF5XA-BmXADLQ.gif)


### 3.order（flex items） 默认情况下，伸缩项目是按照文档流出现先后顺序排列。然而，“order”属性可以控制伸缩项目在他们的伸缩容器出现的顺序。

	order: <integer> (数字)

    
### 4.flex-wrap（flex container） 这个主要用来定义伸缩容器里是单行还是多行显示，侧轴的方向决定了新行堆放的方向。

	flex-wrap: nowrap | wrap | wrap-reverse 

>nowrap(默认值)：伸缩容器单行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。
>
>wrap：伸缩容器多行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。

>wrap-reverse：伸缩容器多行显示，“ltr”排版下，伸缩项目从右向左排列；“rtl”排版下，伸缩项目从左到右排列。（和wrap相反）


### 5.flex-flow（flex container） 这个是  2  和 4 属性的缩写版本。同时定义了伸缩容器的主轴和侧轴。其默认值为“row nowrap”。

	flex-flow: <‘flex-direction’> || <‘flex-wrap’>

### 6.justify-content（flex container） 这个是用来定义伸缩项目沿着主轴线的对齐方式。当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。


	justify-content: flex-start | flex-end | center | space-between | space-around;

>flex-start(默认值)：伸缩项目向一行的起始位置靠齐。

>flex-end：伸缩项目向一行的结束位置靠齐。

>center：伸缩项目向一行的中间位置靠齐。

>space-between：伸缩项目会平均地分布在行里。第一个伸缩项目一行中的最开始位置，最后一个伸缩项目在一行中最终点位置。

>space-around：伸缩项目会平均地分布在行里，两端保留一半的空间。


![Alt text](/markdown/4212753174-56fde6083157c_articlex.png)


![Alt text](/markdown/1-2-6Tw8jqWrMKOfIugKyuDA.gif)



### 7.align-content（flex container） 这个属性主要用来调准伸缩行在伸缩容器里的对齐方式。类似于伸缩项目在主轴上使用“justify-content”一样。

	align-content: flex-start | flex-end | center | space-between | space-around | stretch;

![Alt text](/markdown/3901200768-56fde5fc56a1c_articlex.png)

![Alt text](/markdown/1-htfdNmRIIFu_veRaFOj5qA.gif)
![Alt text](/markdown/1-6dd9KnKMUN49lFsbHlJi6A.png)

为了更好地演示主轴和交叉轴的区别，让我们结合 justify-content和align-items，看看在 flex-direction 两个不同属性值的作用下，轴心有什么不同：

![Alt text](/markdown/1-6mq-Uay7t6NhdF2E41Do0g.gif)


### 8.align-items（flex container）

	align-items: flex-start | flex-end | center | baseline | stretch

>flex-start：伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起始的边。

>flex-end：伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边 。

>center：伸缩项目的外边距盒在该行的侧轴上居中放置。

>baseline：伸缩项目根据他们的基线对齐。

>stretch（默认值）：伸缩项目拉伸填充整个伸缩容器。此值会使项目的外边距盒的尺寸在遵照「min/max-width/height」属性的限制下尽可能接近所在行的尺寸。

![Alt text](/markdown/20150616152600533.png)


### 9.align-self（flex items） 用来在单独的伸缩项目上覆写默认的对齐方式。

	align-self: auto | flex-start | flex-end | center | baseline | stretch;

![Alt text](/markdown/616798064-56fde606e2482_articlex.png)
![Alt text](/markdown/1-HIADl1oL6pxXb2dMh_pXSQ.gif)



### 10.flex-grow（flex items） 根据需要用来定义伸缩项目的扩展能力。它接受一个不带单位的值做为一个比例。主要用来决定伸缩容器剩余空间按比例应扩展多少空间。

	flex-grow: <number>; /* default 0 */

如果所有伸缩项目的“flex-grow”设置了“1”，那么每个伸缩项目将设置为一个大小相等的剩余空间。如果你给其中一个伸缩项目设置了“flex-grow”值为“2”，那么这个伸缩项目所占的剩余空间是其他伸缩项目所占剩余空间的两倍。

![Alt text](/markdown/1-dON3-0RooiPyfDr0DBEOmA.png)

![Alt text](/markdown/1-cK-yB4z_L6bmEqoG5qDoRA.png)
![Alt text](/markdown/5-7p2fLcy13xFU9GjtM4cbHEw.png)
![Alt text](/markdown/1-gHyLHG52cySgLmy0x-edZA.gif)
![Alt text](/markdown/1-JnjR4ULs8de0so1bdUPogw.png)

### 11.flex-shrink（flex items） 根据需要用来定义伸缩项目收缩的能力。[注意：负值同样生效。]

	flex-shrink: <number>; /* default 1 */

![Alt text](/markdown/1-FVO9kX3wwqakhcT9JWS2Ww.gif)
![Alt text](/markdown/1-GrLzJ4jH3v2Z5Va_TMOXkQ.gif)
![Alt text](/markdown/1-JnjR4ULs8de0so1bdUPogw.png)



### 12.flex-basis（flex items） 这个用来设置伸缩基准值，剩余的空间按比率进行伸缩。

	flex-basis: <length> | auto; /* default auto */

如果设置为“0”，不考虑剩余空白空间。如果设置为自动，则按照flex-grow值分配剩余空白空间。如图所示：

![Alt text](/markdown/2111470050-56fde6078aa8c_articlex.png)
![Alt text](/markdown/1-S3LKFr_BICUtAWA5LOFxVw.gif)
![Alt text](/markdown/1-W4QU1Fw9kDLEH2m-J9VGyw.gif)


### 13.flex（flex items） 这是 10 11 和  12 三个属性的缩写。其中第二个和第三个参数（flex-shrink、flex-basis）是可选参数。默认值为“0 1 auto”。

	flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

![Alt text](/markdown/1-BKZt7AT5eFee4KRhe82gew.gif)
![Alt text](/markdown/1-70-KTWYpA2LnLjqi0xDrJA.gif)
![Alt text](/markdown/1-W4QU1Fw9kDLEH2m-J9VGyw.gif)