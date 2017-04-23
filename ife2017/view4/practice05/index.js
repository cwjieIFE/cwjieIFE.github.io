/**
 * Created by cuiwujie on 2017/4/23.
 */
(function createTable() {
    var table = document.getElementById('table');
    var tr_arr = [];
    for (var i = 0; i < 11; i++) {
        tr_arr[i] = document.createElement("tr");
        table.appendChild(tr_arr[i]);
        for (var j = 0; j < 11; j++) {
            var td_arr = [];
            td_arr[j] = document.createElement("td");
            tr_arr[i].appendChild(td_arr[j]);
            if (i == 0) {
                td_arr[j].setAttribute("class", "clear_border");
                if (j > 0) td_arr[j].innerHTML = j;
            }
            if (j == 0) {
                td_arr[0].setAttribute("class", "clear_border");
                if (i > 0) td_arr[0].innerHTML = i;
            }
        }
    }
})();

var robot = document.getElementById('robot_box');
var cmd_btn = document.getElementById('comand_button');
var t_left = document.getElementById('turn_left');
var t_right = document.getElementById('turn_right');
var t_back = document.getElementById('turn_back');
var deg = 0; //初始化角度
var face = 0; //初始化方向  0: 上, 1: 右, 2: 下, 3: 左;
var xPos = 50;
var yPos = 50;

var RobotBox = {
    xPos: function() {
        xPos += "px";
        return robot.style.top
    },
    yPos: function() {
        yPos += "px"
        return robot.style.left
    },
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
        } else if (face == 3) {
            console.log(face, "朝右");
            return face;
        } else {
            throw "啊？"
        }
    },
    go: function() {
        var comand_input = document.getElementById('comand_input')
        switch (comand_input.value) {
            case "":
                switch (face) {
                    case 0:
                        RobotBox.transTop();
                        break;
                    case 1:
                        RobotBox.transLeft();
                        break;
                    case 2:
                        RobotBox.transBottom();
                        break;
                    case 3:
                        RobotBox.transRight();
                        break;
                }
                break;
            case "TUN LEF":
                RobotBox.turnLeft();
                break;
            case "TUN RIG":
                RobotBox.turnRight();
                break;
            case "TUN BAC":
                RobotBox.turnBack();
                break;
            case "TRA LEF":
                RobotBox.transLeft();
                break;
            case "TRA TOP":
                RobotBox.transTop();
                break;
            case "TRA RIG":
                RobotBox.transRight();
                break;
            case "TRA BOT":
                RobotBox.transBottom();
                break;
            case "MOV LEF":
                RobotBox.moveLeft();
                break;
            case "MOV TOP":
                RobotBox.moveTop();
                break;
            case "MOV RIG":
                RobotBox.moveRight();
                break;
            case "MOV BOT":
                RobotBox.moveBottom();
                break;
            default:
                alert("指令错误，请查阅右边的指令")
        }
    },
    turnLeft: function() {
        face = face % 4;
        deg -= 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face++;
        RobotBox.face()
    },
    turnRight: function() {
        face = face % 4;
        deg += 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 3;
        RobotBox.face()
    },
    turnBack: function() {
        deg += 180;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 2;
        RobotBox.face()
    },
    transLeft: function() {
        if (xPos > 50) {
            xPos -= 50;
            robot.style.left = xPos + 'px';
        }
    },
    transTop: function() {
        if (yPos > 50) {
            yPos -= 50;
            robot.style.top = yPos + 'px';
        }
    },
    transRight: function() {
        if (xPos < 500) {
            xPos += 50;
            robot.style.left = xPos + 'px';
        }
    },
    transBottom: function() {
        if (yPos < 500) {
            yPos += 50;
            robot.style.top = yPos + 'px';
        }
    },
    moveLeft: function() {
        if (face != 1) { //如果方向不同
            var little = setInterval(function() {
                RobotBox.turnLeft();
                if (face == 1) {
                    clearInterval(little);
                }
            }, 100);
            setTimeout("RobotBox.transLeft()",1000);
        } else {
            setTimeout("RobotBox.transLeft()",1000);
        }
    },
    moveTop: function() {
        if (face != 0) { //如果方向不同
            var little = setInterval(function() {
                RobotBox.turnLeft();
                if (face == 0) {
                    clearInterval(little);
                }
            }, 100);
            setTimeout("RobotBox.transTop()",1000);
        } else {
            setTimeout("RobotBox.transTop()",1000);
        }
    },
    moveRight: function() {
        if (face != 3) { //如果方向不同
            var little = setInterval(function() {
                RobotBox.turnLeft();
                if (face == 3) {
                    clearInterval(little);
                }
            }, 100);
            setTimeout("RobotBox.transRight()",1000);
        } else {
            setTimeout("RobotBox.transRight()",1000);
        }
    },
    moveBottom: function() {
        if (face != 2) { //如果方向不同
            var little = setInterval(function() {
                RobotBox.turnLeft();
                if (face == 2) {
                    clearInterval(little);
                }
            }, 100);
            setTimeout("RobotBox.transBottom()",1000);
        } else {
            setTimeout("RobotBox.transBottom()",1000);
        }
    },
}

cmd_btn.addEventListener("click", RobotBox.go, false)
t_left.addEventListener("click", RobotBox.turnLeft, false);
t_right.addEventListener("click", RobotBox.turnRight, false);
t_back.addEventListener("click", RobotBox.turnBack, false);