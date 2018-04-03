;
(function(name, definition) {
    // 检测上下文环境是否为AMD或CMD
    var hasDefine = typeof define === 'function',
        // 检查上下文环境是否为Node
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine) {
        // AMD环境或CMD环境
        define(definition);
    } else if (hasExports) {
        // 定义为普通Node模块
        module.exports = definition();
    } else {
        // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
        this[name] = definition();
    }
})('zlib', function() {
    function Base64() {
        // private property
        let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        // public method for decoding
        this.decode = function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }

        // private method for UTF-8 encoding
        let _utf8_encode = function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }

        // private method for UTF-8 decoding
        let _utf8_decode = function(utftext) {
            var string = "";
            var i = 0;
            var c = 0,
                c1 = 0,
                c2 = 0,
                c3 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    function addPreZero(num) {
        return ('0' + num).slice(-2);
    }

    function mimo(date) {

        this._isDate = function(input) {
            return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
        }

        this._getObj = function() {
            let date = this.date;
            return {
                year: date.getFullYear(),
                month: addPreZero(date.getMonth() + 1),
                day: addPreZero(date.getDate()),
                hour: addPreZero(date.getHours()),
                minute: addPreZero(date.getMinutes()),
                second: addPreZero(date.getSeconds())
            }
        }

        this._getTplObj = function() {
            let date = this.date;
            return {
                YYYY: date.getFullYear(),
                MM: addPreZero(date.getMonth() + 1),
                DD: addPreZero(date.getDate()),
                hh: addPreZero(date.getHours()),
                mm: addPreZero(date.getMinutes()),
                ss: addPreZero(date.getSeconds())
            }
        }

        if (!this._isDate(date)) {
            throw new Error('please use Date object')
        }
        this.date = date;
    }
    mimo.prototype.formatAll = function(split) {
        if (!split) {
            split = '-'
        }
        return this._getObj().year + split + this._getObj().month + split + this._getObj().day + ' ' + this._getObj().hour + split + this._getObj().minute + split + this._getObj().second
    }
    mimo.prototype.formatDate = function(split) {
        if (!split) {
            split = '-'
        }
        return this._getObj().year + split + this._getObj().month + split + this._getObj().day
    }
    mimo.prototype.formatTime = function(split) {
        if (!split) {
            split = '-'
        }
        return this._getObj().hour + split + this._getObj().minute + split + this._getObj().second
    }
    mimo.prototype.format = function(dateTemplate) {
        if (!dateTemplate) {
            return this.formatAll();
        }
        return dateTemplate.replace(/((YYYY)|(MM)|(DD)|(hh)|(mm)|(ss))/g, ($1, $2, $3, $4, $5, $6, $7, $8, $9) => {
            return this._getTplObj()[$1];
        })
    }
    var base64 = new Base64();
    var zlib = {
        clone: function(data) {
            return JSON.parse(JSON.stringify(data));
        },
        deepClone: function(obj) {
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
        lg: function(key) {
            if (!key) {
                return null;
            }
            let lStore = window.localStorage.getItem(key);
            return lStore ? JSON.parse(base64.decode(lStore)) : '';
        },
        ls: function(key, item) {
            if (!key) {
                console.error('没有key')
            }
            window.localStorage.setItem(key, base64.encode(JSON.stringify(store)));
        },
        clearL: function(key) {
            if (!key) {
                console.error('没有key')
            }
            window.localStorage.removeItem(key);
        },
        clearLAll: function() {
            window.localStorage.clear();
        },
        //session缓存
        clearS: function(key) {
            if (!key) {
                console.error('没有key')
            }
            window.sessionStorage.removeItem(key);
        },
        clearLAll: function() {
            window.sessionStorage.clear();
        },
        slg: function(key) {
            if (!key) {
                return null;
            }
            let res = window.sessionStorage.getItem(key);
            return res ? JSON.parse(base64.decode(res)) : ''
        },
        sls: function(key, item) {
            if (!key) {
                console.error('没有key')
            }
            window.sessionStorage.setItem(key, base64.encode(JSON.stringify(item)))
        },
        //是否是整数
        isInt: function(num) {
            return (num + '').indexOf('.') < 0;
        },
        //解析url参数
        queryUrl: function() {
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
        toThousands: function(number) {
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
        calcMul: function(arg1, arg2) {
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
        calcAdd: function(arg1, arg2) {
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
        calcReduce: function(arg1, arg2) {
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
        formatKeyDown: function(value) {
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
        resizePage: function(fn1, fn2) {
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
        listToTree: function(list) {
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
        jsonp: function(url, cbKey, cbName, options) {
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
        },
        //不满10的补零
        addPreZero: function(num) {
            return ('0' + num).slice(-2);
        },
        //日期格式化
        dateFormat: function(date) {
            return new mimo(date);
        },
        //比较连个数据是否相等
        compareData: function(eleA, eleB) {
            return toString(eleA) === toString(eleB);
        },
        _toString: function(obj) {
            let result = null;
            if (Object.prototype.toString.call(obj) === "[object Array]") {
                result = [];
                result = obj.map(item => {
                    return toString(item)
                })
            } else if (Object.prototype.toString.call(obj) === "[object Null]") {
                result = JSON.stringify(obj);
            } else if (typeof obj === 'object') {
                result = {}
                for (let key in obj) {
                    result[key] = toString(obj[key])
                }
            } else if (typeof obj === 'function') {
                result = obj.toString();
            } else if (typeof obj === "undefined") {
                result = obj;
            } else if (typeof obj === "symbol") {
                result = obj.toString();
            } else {
                result = JSON.stringify(obj);
            }
            return JSON.stringify(result);
        }
    };
    return zlib;
});