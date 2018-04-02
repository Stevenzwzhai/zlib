function addPreZero(num){
    return ('0'+num).slice(-2);
}
export default class mimo {
    constructor(date){
        if(!this._isDate(date)){
            throw new Error('please use Date object')
        }
        this.date = date;
    }
    _isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }
    _getObj(){
        let date = this.date;
        return {
            year: date.getFullYear(),
            month: addPreZero(date.getMonth()+1),
            day: addPreZero(date.getDate()),
            hour: addPreZero(date.getHours()),
            minute: addPreZero(date.getMinutes()),
            second: addPreZero(date.getSeconds())
        }
    }
    _getTplObj(){
        let date = this.date;
        return {
            YYYY: date.getFullYear(),
            MM: addPreZero(date.getMonth()+1),
            DD: addPreZero(date.getDate()),
            hh: addPreZero(date.getHours()),
            mm: addPreZero(date.getMinutes()),
            ss: addPreZero(date.getSeconds())
        }
    }
    formatAll(split){
        if(!split){
            split = '-'
        }
        return this._getObj().year+split+this._getObj().month+split+this._getObj().day+' '+this._getObj().hour+split+this._getObj().minute+split+this._getObj().second
    }
    formatDate(split){
        if(!split){
            split = '-'
        }
        return this._getObj().year+split+this._getObj().month+split+this._getObj().day
    }
    formatTime(split){
        if(!split){
            split = '-'
        }
        return this._getObj().hour+split+this._getObj().minute+split+this._getObj().second
    }
    format(dateTemplate){
        if(!dateTemplate){
            return this.formatAll();
        }
        return dateTemplate.replace(/((YYYY)|(MM)|(DD)|(hh)|(mm)|(ss))/g, ($1, $2, $3, $4, $5, $6, $7, $8, $9) => {
            return this._getTplObj()[$1];
        })
    }
}