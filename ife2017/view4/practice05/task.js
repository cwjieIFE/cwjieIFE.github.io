/**
 * Created by cuiwujie on 2017/4/21.
 */
var robot = document.getElementById('machine_box');
var cmd_btn = document.getElementById('comand_button');
var deg = 0; //初始化角度
var face = 0; //初始化方向  0: 上, 1: 右, 2: 下, 3: 左;
var xPos =  300;//初始化X距离
var yPos =  300;//初始化Y距离
//创建表格 以及初始化方块位置
(function createTableBox() {
    var table = document.getElementById('table');
    var tr_arr = [];
    for (var i = 0; i < 11; i++) {
        tr_arr[i] = document.createElement("tr");
        for (var j = 0; j < 11; j++) {
            var td_arr = [];
            td_arr[j] = document.createElement("td");

            if (i == 0) {
                td_arr[j].setAttribute("class", "clear_border");
                if (j > 0) td_arr[j].innerHTML = j;
            }
            if (j == 0) {
                td_arr[0].setAttribute("class", "clear_border");
                if (i > 0) td_arr[0].innerHTML = i;
            }
            tr_arr[i].appendChild(td_arr[j]);
        }
        table.appendChild(tr_arr[i]);
    }
    robot.style.left= xPos+ "px";
    robot.style.top= yPos+ "px";
})();
var root = {
    //X距离
    xPos: function() {
        xPos += "px";
        return robot.style.top
    },
    //Y距离
    yPos: function() {
        yPos += "px"
        return robot.style.left
    },
    //正面方向
    face: function() {
        face = face % 4;
        if (face == 0) {
            console.log(face, "朝上");
            return face;
        } else if (face == 1) {
            console.log(face, "朝左");
            return face;
        } else if (face == 2) {
            console.log(face, "朝下");
            return face;
        } else {
            console.log(face, "朝右");
            return face;
        }
    },
    go: function() {
        var comand_input = document.getElementById('comand_input')
        switch (comand_input.value) {
            case "GO":
                //判断是否在边缘
                switch (face) {
                    case 0:
                        if (yPos > 50) {
                            yPos -= 50;
                            robot.style.top = yPos + 'px';
                        }
                        break;
                    case 1:
                        if (xPos > 50) {
                            xPos -= 50;
                            robot.style.left = xPos + 'px';
                        }
                        break;
                    case 2:
                        if (yPos < 500) {
                            yPos += 50;
                            robot.style.top = yPos + 'px';
                        }
                        break;
                    default:
                        if (xPos < 500) {
                            xPos += 50;
                            robot.style.left = xPos + 'px';
                        }
                        break;
                }
                break;
            case "TUN LEF":
                root.turnLeft();
                break;
            case "TUN RIG":
                root.turnRight();
                break;
            case "TUN BAC":
                root.turnBack();
                break;
            //新加指令
            case "TRA LEF":
                root.ToLeft();
                break;
            case "TRA TOP":
                root.ToTop();
                break;
            case "TRA RIG":
                root.ToRight();
                break;
            case "TRA BOT":
                root.ToBottom();
                break;
            case "MOV LEF":
                root.MoveLeft();
                break;
            case "MOV TOP":
                root.MoveTop();
                break;
            case "MOV RIG":
                root.MoveRight();
                break;
            case "MOV BOT":
                root.MoveBottom();
                break;
        }
    },
    turnLeft: function() {
        face = face % 4;
        deg -= 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face++;
        root.face()
    },
    turnRight: function() {
        face = face % 4;
        deg += 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 3;
        root.face()
    },
    turnBack: function() {
        deg += 180;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 2;
        root.face()
    },
    ToLeft: function(){
        if (xPos > 50) {
            xPos -= 50;
            robot.style.left = xPos + 'px';
        }
    },
    ToTop: function(){
        if (yPos > 50) {
            yPos -= 50;
            robot.style.top = yPos + 'px';
        }
    },
    ToRight:function(){
        if (xPos < 500) {
            xPos += 50;
            robot.style.left = xPos + 'px';
        }
    },
    ToBottom:function(){
        if (yPos < 500) {
            yPos += 50;
            robot.style.top = yPos + 'px';
        }
    },
    MoveLeft:function(){
        //如果方向不同
        if (face != 1) {
            var little = setInterval(function() {
                root.turnLeft();
                if (face == 1) {
                    clearInterval(little);
                }
            }, 50);
            setTimeout("root.ToLeft()",1000);
        } else {
            setTimeout("root.ToLeft()",1000);
        }
    },
    MoveTop:function(){
        if (face != 0) {
            var little = setInterval(function() {
                root.turnLeft();
                if (face == 0) {
                    clearInterval(little);
                }
            }, 50);
            setTimeout("root.ToTop()",1000);
        } else {
            setTimeout("root.ToTop()",1000);
        }
    },
    MoveRight:function(){
        if (face != 3) {
            var little = setInterval(function() {
                root.turnRight();
                if (face == 3) {
                    clearInterval(little);
                }
            }, 50);
            setTimeout("root.ToRight()",1000);
        } else {
            setTimeout("root.ToRight()",1000);
        }
    },
    MoveBottom:function(){
        if (face != 2) {
            var little = setInterval(function() {
                root.turnRight();
                if (face == 2) {
                    clearInterval(little);
                }
            }, 50);
            setTimeout("root.ToBottom()",1000);
        } else {
            setTimeout("root.ToBottom()",1000);
        }
    }
}
cmd_btn.addEventListener("click", root.go, false)
