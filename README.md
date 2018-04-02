# zlib
a small library help our project
### 接口
1.clone
clone(date: any)，浅拷贝数据
2.deepClone
deepClone(date: any)，深拷贝数据
3.缓存相关
3.1 ls
ls(key, value), 保存到localStorage，会对value做base64加密。
3.2 lg
lg(key)，获取ls保存的值
3.3 clearL
clearL(key),清除某个缓存
3.4 clearLAll
清除所有的本地（local）缓存
3.5 sls
3.6 slg
3.7 clearS
3.8 clearAll
用法同上，这里针对session缓存
4. isInt
isInt(number)判断是否是整数
5. queryUrl
解析当前url的参数，并返回参数对象
6.toThousands
toThousands(number)转化数字为千分位
7.calAdd/calReduce/calMul
参数均为两个，精确计算两个数字加减乘。
8.formatKeyDown
formatKeyDown(inputValue),保证输入的内容为数字，包括小数
9. resizePage
resizePage(fn1, fn2)，监听移动端键盘弹起和释放，fn1为弹起回调事件，fn2位键盘落下回调事件。
10. listToTree
listToTree(list: array)，用于将分类列表转换成嵌套可用的树状结构
11. jsonp
jsonp(url, cbKey, cbName, options)，简单实现jsonp，url是请求的url，cbKey、cbName表示"https://xxx.xx.xx?cbKey=cbName"，就是回调函数的key和函数名。option表示其他url参数，一个对象集合
12. dateFormat
dateFormat(date),日期格式化，传入日期对象，可调用方法：
```
let date = dateFormat(new Date())
console.log(date.formatAll()) //默认分隔符为‘-’，2018-04-02 15-34-13
console.log(date.formatDate('/'))//2018/04/02
console.log(date.formatTime(':'))//15:34:05
console.log(date.format('MM-DD'))//04-02，可以自由组合，标准为‘YYYY-MM-DD hh:mm:ss’
```
13.compareData
compareData(dataA, dataB),比较连个数据是否相等，可以是任意嵌套复杂型，Symbol和function转化为字符串如果一致则视为相同。