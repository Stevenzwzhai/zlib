export default class mimo {
    constructor(date){
        if(!this._isDate(date)){
            throw new Error('please use Date object')
        }
        this.date = date;
    }
    _addPreZero(num){
        return ('0'+num).slice(-2);
    }
    _isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }
    _getObj(){
        let date = this.date;
        return {
            year: date.getFullYear(),
            month: this._addPreZero(date.getMonth()+1),
            day: this._addPreZero(date.getDate()),
            hour: this._addPreZero(date.getHours()),
            minute: this._addPreZero(date.getMinutes()),
            second: this._addPreZero(date.getSeconds())
        }
    }
    _getTplObj(){
        let date = this.date;
        return {
            YYYY: date.getFullYear(),
            MM: this._addPreZero(date.getMonth()+1),
            DD: this._addPreZero(date.getDate()),
            hh: this._addPreZero(date.getHours()),
            mm: this._addPreZero(date.getMinutes()),
            ss: this._addPreZero(date.getSeconds())
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