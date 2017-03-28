/**
 * Created by cuiwujie on 2017/3/10.
 */

function Event() {
    this.events = {}
}

Event.prototype.on = function (attr, callback) {
    if (this.events[attr]) {
        // 放进回调函数
        this.events[attr].push(callback)
    } else {
        this.events[attr] = [callback]
    }
}


Event.prototype.off = function (attr) {
    for (let key of this.events) {
        if (this.events.hasOwnProperty(key) && key === attr) {
            delete this.events[key]
        }
    }
}
// 执行多次回调
Event.prototype.emit = function (attr, ...args) {
    // 执行$watch回调函数
    this.events[attr] && this.events[attr].forEach(item => {
        item(...args)
})
}


function Observer(data) {
    this.data = data
    this.walk(data)
    this.eventsBus = new Event()
}

Observer.prototype.convert = function (key, val) {
    let _this = this
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('您访问了' + key)
            return val
        },
        set: function (newVal) {
            console.log('您设置了' + key)
            console.log('新的' + key + '=' + newVal);

            // 触发$watch
            _this.eventsBus.emit(key, val, newVal);
            val = newVal

            // 深度遍历
            if (typeof newVal === 'object') {
                new Observer(val)
            }
        }
    })
}

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

Observer.prototype.$watch = function (attr, callback) {
    // 注册事件
    this.eventsBus.on(attr, callback)
}


let app = new Observer({
    basicInfo: {
        name: 'water'
    },
    address: 'GZ, Guangzhou',
    age: 20
})

//test
app.data.basicInfo = { like: 'Anime' }
app.data.basicInfo.like
app.$watch('age', (oldVal, newVal) => {
    console.log(`age变化了，原来是${oldVal}，现在是${newVal}`)
})
app.data.age = 18
