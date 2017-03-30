function Treestart(object, objdata) {
    var tree = new Tree(object, objdata);
    tree.init(tree)
}
var Tree = function(object, objdata) {
    this.element = object;
    this.data = objdata
};
Tree.prototype = {
    init: function() {
        var _this = this;
        this.createTree(this.element, this.data);
        try {
            this.element.addEventListener("click", function(e) {
                _this.changeChildShow(e)
            })
        } catch (err) {
            console.log(err)
        }
    },
    createTree: function(parent, objdata) {
        for (var i in objdata) {
            var treelist = document.createElement("div");
            if (objdata[i]["children"]) {
                treelist.className = "tree-list has-child";
                treelist.innerHTML = '<span class="icon open"></span>' + objdata[i]["name"];
                this.createTree(treelist, objdata[i]["children"])
            } else {
                treelist.className = "tree-list no-child";
                treelist.innerHTML = objdata[i]["name"]
            }
            parent.appendChild(treelist)
        }
    },
    changeChildShow: function(event) {
        var target = event.target || event.srcElement;
        if (target.classList.contains("has-child")) {
            var treeList = target.getElementsByClassName("tree-list");
            if (target.firstElementChild.classList.contains("open")) {
                target.firstElementChild.classList.remove("open");
                target.firstElementChild.classList.add("close");
                for (var i in treeList) {
                    try {
                        treeList[i].style.display = "none"
                    } catch (err) {}
                }
            } else {
                target.firstElementChild.classList.remove("close");
                target.firstElementChild.classList.add("open");
                for (var i in treeList) {
                    try {
                        treeList[i].style.display = "block"
                    } catch (err) {}
                }
            }
        }
    }
};
window.onload = function() {
    var obj = document.getElementById("tree-box");
    var nodes = [{
        name: "父节点1",
        children: [{
            name: "子节点1"
        }, {
            name: "子节点2"
        }]
    }, {
        name: "父节点2",
        children: [{
            name: "子节点3"
        }, {
            name: "子节点4",
            children: [{
                name: "子节点5"
            }]
        }]
    }];
    Treestart(obj, nodes)
};