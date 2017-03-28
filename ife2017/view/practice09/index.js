/**
 * Created by cuiwujie on 2017/3/10.
 */
function Observer(data) {
    this.data = data
    this.dep = new Dep()

    if (Array.isArray(data)) {

    } else {
        this.walk(data)
    }
}
// 遍历
Observer.prototype.walk = function (obj) {
    let val
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key]

            if (typeof val === 'object') {
                new Observer(val)
            }
        }
        this.convert(key, val)
    }
}

Observer.prototype.convert = function (key, val) {
    let dep = new Dep()
    if (typeof val === 'object') {
        var childOb = new Observer(val)
    }

    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key)

            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return val
        },

        set: function (newVal) {
            console.log('你设置了' + key);
            console.log('新的' + key + '=' + newVal);

            if (newVal == val) return
            val = newVal
            if (typeof val === 'object') {
                childOb = new Observer(newVal)
            }

            dep.notify()
        }
    })
}

// 观察着
function Dep() {
    this.subs = []
}

Dep.target = null

// 当通过 watcher 触发 getter时，watcher会使用 dep.addSub(this) 把自己的实例推到 subs 中
//  this => Dep
Dep.prototype.depend = function () {
    Dep.target.addDep(this)
}

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}

// 当触发setter的时候，会触发notify，而notify则会把watcher的update方法执行一遍
Dep.prototype.notify = function () {
    for (let i = 0, len = this.subs.length; i < len; i++) {
        this.subs[i].update()
    }
}

// 订阅者

function Watcher(value, attr) {
    this.value = value
    this.attr = attr
    this.get()
}
//  this => Watcher
Watcher.prototype.beforeGet = function () {
    Dep.target = this

    // console.log(this)
}

// 遍历
Watcher.prototype.get = function () {
    this.beforeGet()

    let val = this.value[this.attr]

    if (typeof val === 'object') {
        for (let childAttr in val) {
            new Watcher(val[childAttr], childAttr)
        }
    }
}

Watcher.prototype.addDep = function (dep) {
    dep.addSub(this);
    console.log('我订阅了basicInfo的变化')
}

Watcher.prototype.update = function () {
    console.log('name或age变化了，导致basicIndo变化了')
}

//测试
let app = new Observer({
    basicInfo: {
        name: 'water',
        age: 20
    },
    address: 'Guangzhou'
});

let watcher = new Watcher(app.data, "basicInfo");
app.data.basicInfo.age = 18;
app.data.basicInfo.name = 'balabala';