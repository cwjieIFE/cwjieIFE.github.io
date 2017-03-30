# 网页抓取分析服务系列之二（设备模拟）
API提示：system.args、page.settings['userAgent']、page.viewportSize、page.clipRect

## page.settings['userAgent']

    var webPage = require('webpage');
    var page = webPage.create();
    //参数
    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
    
## page.viewportSize

    var webPage = require('webpage');
    var page = webPage.create();
    
    page.viewportSize = {
      width: 480,
      height: 800
    };
    
    var page = require('webpage').create(),
    	address, output, size;
    var system = require('system');	
    
    var arg_count = system.args.length - 1;
    if (arg_count < 4 || arg_count > 5) {
        console.log('Usage: viewport.js URL filename sizeX sizeY');
        phantom.exit();
    } else {
        address = system.args[1];
        output = system.args[2];
        sizeX = system.args[3];
        sizeY = system.args[4];
        page.viewportSize = { width: sizeX, height: sizeY };
        page.open(address, function (status) {
            if (status !== 'success') {
                console.log('Unable to load the address!');
            } else {
                window.setTimeout(function () {
                    page.render(output);
                    phantom.exit();
                }, 200);
            }
        });
    }
    
## page.clipRect

    var webPage = require('webpage');
    var page = webPage.create();
    
    page.clipRect = {
      top: 14,
      left: 3,
      width: 400,
      height: 300
    };
