/**
 * Created by cuiwujie on 2017/3/28.
 */
phantom.outputEncoding="gb2312";
var page = require('webpage').create();
var system = require('system');
var time = Date.now(), url, data = {};
var config =[
    {
        "name": "iphone5",
        "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "size" : "320 * 568"
    },
    {
        "name": "iphone6",
        "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "size" : "375 * 667"
    },  {
        "name": "ipad",
        "userAgent" : "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "size" : "768 * 1024"
    },
]
page.onConsoleMessage = function(mes) {
    console.log(mes);
}
if(system.args.length === 3) {
    console.log('缺少搜索关键字!');
    phantom.exit();
}
else {
    try{
        if(!config[system.args[2]]) {
            console.log('不支持该机器');
            phantom.exit();
        }
        url = 'https://www.baidu.com/s?wd=' + encodeURIComponent(system.args[1]);
        page.Setting.userAgent = config[1].parameter.userAgent;
        var size = config[1]['size'].split('*');
        size = {
            width : size[0].trim(),
            height : size[1].trim()
        }
        page.viewportSize = size;
        page.open(url, function(status) {
            if(status === 'success') {
                page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                    var dataList = page.evaluate(function() {
                        var dataList = [];
                         if($('#results').length != 0) {
                            var result = $('.result .c-container');
                            result.each(function(index, item) {
                                var title = $(item).find('.c-title').text() || 'none';
                                if(title !== 'none') {
                                    var info = $(item).find('.c-line-clamp2').text() || $(item).find('.c-line-clamp3').text() || 'none';
                                    var link = $(item).children('a:first-child').attr('href') || 'none';
                                    var pic = $(item).find('.c-img').attr('src') || 'none';
                                    dataList.push({
                                        title : title,
                                        info : info,
                                        link : link,
                                        pic : pic
                                    });
                                }
                            });
                        }else{
                             var result = $('.c-container');
                             result.each(function(index, item) {
                                 var title = $(item).find('.t').children('a').text() || 'none';
                                 var info = $(item).find('.c-abstract').text() || $(item).find('.c-span-last').text() || 'none';
                                 var link = $(item).find('.t').children('a:first-child').attr('href') || 'none';
                                 var pic = $(item).find('.c-img').attr('src') || 'none';
                                 dataList.push({
                                     title : title,
                                     info : info,
                                     link : link,
                                     pic : pic
                                 });
                             });
                        }
                        return dataList;
                    });
                    returnSuccess(dataList);
                    phantom.exit();
                });
            }
        });
    }catch(err){
        returnError();
    }
}
function returnError() {
    data.code = 0;
    data.msg = '抓取失败';
    data.word = system.args[1];
    data.time = Date.now() - time;
    data.dataList = [];
    data.device = system.args[2];
    console.log(JSON.stringify(data, undefined, 4));
}
function returnSuccess(dataList) {
    data.code = 1;
    data.msg = '抓取成功';
    data.word = system.args[1];
    data.time = Date.now() - time;
    data.dataList = dataList;
    console.log(JSON.stringify(data, undefined, 4));
}
