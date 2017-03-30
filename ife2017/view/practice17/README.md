## MongoDB介绍

MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。
MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

## MongoDB安装

### 1.下载MongoDB并安装

　　下载地址：[http://www.mongodb.org/downloads](http://www.mongodb.org/downloads "MongoDB 安装地址 此处需要翻墙")

  注意：一般都安装在默认路径就OK了，我的安装路径是  C:\Program Files\MongoDB\Server\3.4\bin


<!-- more -->

### 　2.创建数据库和日志存放目录

　在C盘 C:\Program Files\MongoDB\Server\3.4  目录下新建“data”和“log”两个文件夹，分别存放数据库文件和日志文件如图

### 3.创建一个config文件
	

打开目录“C:\Program Files\MongoDB\Server\3.4\bin”，并在此目录下新建一个mongo.config文件，文件内容如下
	
	##数据库目录
	dbpath=C:\Program Files\MongoDB\Server\3.4\data

	##日志输出文件
	logpath=C:\Program Files\MongoDB\Server\3.4\log\mongo.log

### 4.添加环境变量

添加环境变量 [http://jingyan.baidu.com/article/d5a880eb6aca7213f047cc6c.html](http://jingyan.baidu.com/article/d5a880eb6aca7213f047cc6c.html "百度百科关于添加环境变量")
	
	　在环境变量PATH中加入  “C:\Program Files\MongoDB\Server\3.4\bin“

### 5.以Windows服务器运行MongoDB

以系统管理员身份运行cmd，切换至C:\Program Files\MongoDB\Server\3.4\bin目录输入mongod.exe --dbpath=C:\Program Files\MongoDB\Server\3.4\data。如看到控制台最后一行类似Tue Oct 09 11:50:55 [websvr] admin web console watiing for connections on port 27017说明启动成功（MongoDB占用系统27017端口） 


### 6.测试MongoDB

以管理员身份新建一个cmd窗口，进入MongoDB的bin目录输入mongo，如出现connecting to:test说明测试通过。

继续测试：
(1).输入use test回车
(2).输入db.foo.save({hello:1, baie:2})回车
(3).输入db.foo.find()回车
如果出现类似{ "_id" : ObjectId("5073a0a090f93be1455461d2"), "hello" : 1, "baie" : 2 }之类信息，说明测试成功数据已经插入数据库，然后输入exit退出。

### 7.注册MongoDB为系统服务（此步骤必须以系统管理员身份运行cmd，否则会报错）
以系统管理员身份运行cmd输入并切换至MongoDB的bin目录运行以下语句
	
	sc create MongoDB binPath= "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe --service --dbpath C:\M_DB--
	
	logpath=C:\M_LOG\mongodb.log  --logappend"


如果控制台出现类似Tue Oct 09 12:05:15 Service can be started from the command line with 'net start MongoDB'这样的语句，说明服务已经注册成功。

### 8.在cmd中输入net start MongoDB即可启动MongoDB数据库服务，此时控制台输出Mongo DB 服务已经启动成功，说明系统启动成功。


### 9.如果出现发生系统错误 1067 请把db目录下的mongod.lock文件删除后重新输入net start MongoDB启动服务即可。


### 10.如果解决 1067 没有解决，请参考以下链接

[http://blog.csdn.net/lg_lin/article/details/45420121](http://blog.csdn.net/lg_lin/article/details/45420121)
 
## 参考地址

MongoDB 官网地址：[https://www.mongodb.com/](https://www.mongodb.com/)
MongoDB 官方英文文档：[https://docs.mongodb.com/manual/](https://docs.mongodb.com/manual/)

MongoDB 各平台下载地址：[https://www.mongodb.com/download-center#community](https://www.mongodb.com/download-center#community)



## 库操作

　	1.新建数据库：第一步：use 新建数据库名；第二步：进行此库相关的操作；如果不进行第二步，该数据库不会被创建

　　2.查看数据库：show dbs;

　　3.新建表：db.createCollection('要新建的表名');

　　4.查看当前数据库下表： show collections;

　　5.删除当前数据库指定表：db.表名.drop();

　　6.删除当前数据库：db.dropDatabase();

## 示例操作如下图：
	![](http://i.imgur.com/PhvnCbv.png)


　　1.默认为存在“admin”和“local”两个数据库；admin数据库是存放管理员信息的数据库，认证会用到；local是存放replication相关的数据；这两处本篇都没有涉及到；

　　2.find();是个查询操作，后面会讲到，上面用到主要是为了演示use不存在的库后，进行相关操作会创建出这个库；

　　3.MongoDB没有像MySQL或MSSQL等数据库这么严格的规定，不是非得要先建库、建表、建各种字段，以后的操作中慢慢的会体会到^_^！

## 参考资料
[http://docs.mongodb.org/manual/reference/program/](http://docs.mongodb.org/manual/reference/program/)

[http://www.cnblogs.com/zhongweiv/p/node_mongodb.html](http://www.cnblogs.com/zhongweiv/p/node_mongodb.html)

[http://docs.mongodb.org/manual/](　http://docs.mongodb.org/manual/)

[https://github.com/mongodb/node-mongodb-native](　　https://github.com/mongodb/node-mongodb-native)

## NodeJs 操作
npm安装mongodb

	npm install mongodb




## 实例：

### 实例1

数据库的连接，Schemal的创建，模型的创建，实体的创建，通过实体保存数据库信息。

	var mongoose = require("mongoose");
	var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
	var TestSchema = new mongoose.Schema({
	    name : {type:String},
	    age : {type:Number,default:0},
	    email : {type:String},
	    time : {type:Date,default:Date.now}
	});
	var TestModel = db.model("test1",TestSchema); //'test'相当于collection
	var TestEntity = new TestModel({
	    name:'helloworld',
	    age:28,
	    emial:'helloworld@qq.com'
	});
	TestEntity.save(function(err,doc){
	    if(err){
	        console.log("error :" + err);
	    } else {
	        console.log(doc);
	    }
	});

### 实例2

通过entity、model来完成数据库的增删查改。

// mongoose 链接 

	var mongoose = require('mongoose');
	var db       = mongoose.createConnection('mongodb://127.0.0.1:27017/test'); 
