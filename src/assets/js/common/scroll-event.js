import Vue from 'vue'
import { EventBus } from './event-bus.js';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public

var _this;
var _scrollTop;

var _created = function() {
    window.addEventListener('scroll', _scrollHandler);
}
var _scrollHandler = function(){
    var top = _getScrollPosY();

    if(_scrollTop != top){
        _scrollTop = top;
        EventBus.$emit(EventBus.CHANGE_SCROLL, _scrollTop);
    }


    // 현재 스크롤 Y 값
    function _getScrollPosY() {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        return top;
    }

}

module.exports = {
    created: _created()
}
