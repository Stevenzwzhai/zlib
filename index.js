import Base64 from './base64'
const base64 = new Base64();
export default = {
    formatMoney(money, deci) {
        return money.toFixed(deci || 2)
    },
    clone(data) {
        return JSON.parse(JSON.stringify(data));
    },
    deepClone(obj) {
        if (obj === null) {
            return obj;
        }
        if (typeof obj === 'function') {
            return new obj().constructor;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => deepClone(obj));
        }
        if (Object.prototype.toString.call(obj) === '[object RegExp]') {
            let g = obj.global ? 'g' : '';
            let m = obj.multiline ? 'm' : '';
            let i = obj.ignoreCase ? 'i' : '';
            return new RegExp(obj.source, g + i + m);
        }
        if (typeof obj === 'object') {
            let result = {};
            for (key in obj) {
                result[key] = deepClone(obj[key]);
            }
            return result;
        }
        return obj;
    },
    lg(key) {
        if (!key) {
            return null;
        }
        let lStore = window.localStorage.getItem(key);
        return lStore ? JSON.parse(base64.decode(lStore)) : '';
    },
    ls(key, item) {
        if (!key) {
            console.error('没有key')
        }
        window.localStorage.setItem(key, base64.encode(JSON.stringify(store)));
    },
    clearL(key) {
        if (!key) {
            console.error('没有key')
        }
        window.localStorage.removeItem(key);
    },
    clearLAll() {
        window.localStorage.clear();
    },
    //session缓存
    clearS(key) {
        if (!key) {
            console.error('没有key')
        }
        window.sessionStorage.removeItem(key);
    },
    clearLAll() {
        window.sessionStorage.clear();
    },
    slg(key) {
        if (!key) {
            return null;
        }
        let res = window.sessionStorage.getItem(key);
        return res ? JSON.parse(base64.decode(res)) : ''
    },
    sls(key, item) {
        if (!key) {
            console.error('没有key')
        }
        window.sessionStorage.setItem(key, base64.encode(JSON.stringify(item)))
    },
    //是否是整数
    isInt(num) {
        return (num + '').indexOf('.') < 0;
    }
    //解析url参数
    queryUrl() {
        let url = window.location.href;
        let search = url.split('?')[1] || "";
        let query = {};
        let searchArr = search.slice(0, search.length).split('&');
        for (let i = 0; i < searchArr.length; i++) {
            let tempArr = searchArr[i].split('=');
            if (typeof query[tempArr[0]] == "undefined") {
                query[tempArr[0]] = tempArr[1];
            }
        }
        return {
            query
        }
    },
    //转化为千分位
    toThousands(number) {
        var number = String(number).split('.');
        var num = (number[0] || 0).toString(),
            result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result + (number[1] ? ('.' + number[1]) : '');
    },
    calcMul(arg1, arg2) {
        let m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {}
        try {
            m += s2.split('.')[1].length;
        } catch (e) {}
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    },
    calcAdd(arg1, arg2) {
        let m = 0,
            n = 0,
            q = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {}
        try {
            n += s2.split('.')[1].length;
        } catch (e) {}
        q = Math.max(m, n);
        return (Number(arg1) * Math.pow(10, q) + Number(arg2) * Math.pow(10, q)) / Math.pow(10, q);
    },
    calcReduce(arg1, arg2) {
        let m = 0,
            n = 0,
            q = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {}
        try {
            n += s2.split('.')[1].length;
        } catch (e) {}
        q = Math.max(m, n);
        return (Number(arg1) * Math.pow(10, q) - Number(arg2) * Math.pow(10, q)) / Math.pow(10, q);
    },
    //保持输入内容为数字，包括小数
    formatKeyDown(value) {
        value = value.replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        value = value.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        value = value.replace(/\.{2,}/g, "");
        //保证.只出现一次，而不能出现两次以上
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        return value;
    },
    //移动端键盘出现和收起的回调事件
    resizePage(fn1, fn2) {
        var winHeight = document.documentElement.clientHeight; //获取当前页面高度

        window.addEventListener('resize', function() {
            var thisHeight = document.documentElement.clientHeight;
            if (winHeight - thisHeight > 50) {
                //当软键盘弹出，在这里面操作
                fn1 && (typeof fn1 == "function") && fn1();
            } else {
                //当软键盘收起，在此处操作
                fn2 && (typeof fn2 == "function") && fn2();
            }
        })
    },
    // 用于将分类列表转换成嵌套可用的
    listToTree(list) {
        const map = {};
        let node;
        let roots = [];
        let i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId !== '-9999') {
                // if you have dangling branches check that map[node.parentId] exists
                if (map[node.parentId] !== undefined && list[map[node.parentId]]) {
                    // 避免父类已经删除
                    node.parentName = list[map[node.parentId]].label;
                    list[map[node.parentId]].children.push(node);
                }
            } else {
                roots.push(node);
            }
        }
        return roots;
    },
    //简单版的jsonp
    jsonp(url, cbKey, cbName, options) {
        let scriptObj = document.createElement('script')
        let params = ""
        if (options && options.toString() === '[object Object]' && Object.keys(options).length) {
            Object.keys(options).forEach(key => `&${params}${key}=${options.key}`)
        }
        scriptObj.src = `${url}?${cbKey}=${cbName+params}`;
        document.body.appendChild(scriptObj);

        scriptObj.onload = function() {
        document.body.removeChild(scriptObj)
    }
}
}