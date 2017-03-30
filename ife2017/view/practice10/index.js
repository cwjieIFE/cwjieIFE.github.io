var page = require('webpage').create(),
    system = require('system'),
    baseurl = "https://www.baidu.com/s?wd=",
    keyword;

if(system.args.length === 1){
    console.log('Try to pass some arguments when invoking this script!');
    phantom.exit();
}

try{
    var startTime = Date.now();

    phantom.outputEncoding="gb2312"
    keyword = system.args[1];
    baseurl +=  keyword;
    page.open(baseurl,function(status){
        console.log('Status: ' + status);
        if(status !== 'success'){
            console.log("FAIL to load the address");
        } else{
            page.includeJs("http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js",function(){
                var data = page.evaluate(function(){
                    var result = $("#content_left .result.c-container").map(function(){
                        var cc = {};
                        cc.title = $(this).find(".t").text() || '';
                        cc.info = $(this).find(".c-abstract").text() || '';
                        cc.link = $(this).find("h3").find("a").eq(0).attr("href") || '';
                        cc.pic = $(this).find(".c-img").attr("src") || '';
                        return cc;
                    }).toArray();
                    return result;
                });
                var msg = {
                    code: '1',
                    msg: '抓取成功',
                    word: keyword,
                    time: Date.now() - startTime,
                    dataList: data
                }
                console.log(JSON.stringify(msg));
                phantom.exit();
            });
        }
    });
} catch(err){
    console.log(JSON.stringify({ code: '0', msg: '抓取失败', err: err.message }));
}