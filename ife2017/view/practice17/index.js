/**
 * Created by cuiwujie on 2017/3/28.
 */
var mongoose = require('mongoose');
var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var iconv = require('iconv-lite');
var encoding = 'cp936';



mongoose.connect('mongodb://localhost/test');

//创建实例 加载 phantomjs 模块
var phantomjs = mongoose.model('phantomjs', {
    code: Number,
    msg: String,
    word: String,
    time: Number,
    dataList: [{
        info: String,
        link: String,
        pic: String,
        title: String}]
});




http.createServer(function(req, res) {
    if(req.url !== '/favicon.ico') {
        var search = url.parse(req.url, true).query.search;
        res.writeHead(200, {"Content-Type": "text/plain"});
        exec( "phantomjs demo.js" + search, { encoding: 'binary' }, function(err, stdout, stderr) {
            if(err) {
                console.log('exec error' + err);
                res.write('404');
                res.end();
            }
            else {
                // Javascript解码的模块  Buffer  node中储存二进制数据的中介者。
                var data = iconv.decode(new Buffer(stdout, 'binary'), encoding);
                res.write(data);
                res.end();
                data = JSON.parse(data);
                //返回数据
                var TestEntity = new phantomjs(data);
                TestEntity.save(function(err) {
                    if(err) {
                        console.log('数据库err');
                    }
                    else {
                        console.log('数据库正常');
                    }
                })
            }
        });
    }
}).listen(8000);