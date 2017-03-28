/**
 * Created by cuiwujie on 2017/3/28.
 */
phantom.outputEncoding="gb2312";
var page = require('webpage').create();
var system = require('system');
var time = Date.now(), url, data = {};
page.onConsoleMessage = function(mes) {
    console.log(mes);
}
if(system.args.length === 1) {
    console.log('缺少搜索关键字!');
    phantom.exit();
}
else {
    try{
        url = 'https://www.baidu.com/s?wd=' + encodeURIComponent(system.args[1]);
        page.open(url, function(status) {
            if(status === 'success') {
                page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                    var dataList = page.evaluate(function() {
                        var result = $('.c-container');
                        var dataList = [];
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

