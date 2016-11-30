/**!
	* @package     @etd-framework/js
	*
	* @version     2.0.0
	* @copyright   Copyright (C) 2016 ETD Solutions. Tous droits réservés.
	* @license     Apache-2.0 
	* @author      ETD Solutions http://etd-solutions.com
*/

define(["module","exports"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b,c){b|=0;var d=Math.pow(10,b);a*=d;var e=a>0|-(a<0),f=a%1===.5*e,g=Math.floor(a);if(f)switch(c){case"HALF_DOWN":a=g+(e<0);break;case"HALF_EVEN":a=g+g%2*e;break;case"HALF_ODD":a=g+!(g%2);break;default:a=g+(e>0)}return(f?a:Math.round(a))/d}function e(a,b){var c=0==b?1:Math.pow(10,b),d=a*c,e=d.toString();return e.indexOf(".")===-1?a:0==e[e.length-1]?a:Math.ceil(d)/c}function f(a,b){var c=0==b?1:Math.pow(10,b),d=a*c,e=d.toString();return e.indexOf(".")===-1?a:0==e[e.length-1]?a:Math.floor(d)/c}Object.defineProperty(b,"__esModule",{value:!0});var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=function(){function a(){c(this,a)}return h(a,null,[{key:"clone",value:function(a){return"undefined"==typeof a||null===a?a:JSON.parse(JSON.stringify(a))}},{key:"indexOfNode",value:function(a){if(!a)return-1;for(var b=0;a=a.previousElementSibling;)++b;return b}},{key:"isObjectEmpty",value:function(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}},{key:"getElementOffset",value:function(a){for(var b=0,c=0;a&&!isNaN(a.offsetLeft)&&!isNaN(a.offsetTop);)b+=a.offsetLeft-a.scrollLeft,c+=a.offsetTop-a.scrollTop,a=a.offsetParent;return{top:c,left:b}}},{key:"areArraysEqual",value:function(a,b){var c=a.length;if(c!=b.length)return!1;for(var d=0;d<c;d++)if(b.indexOf(a[d])===-1)return!1;return!0}},{key:"uniq",value:function a(b){var a=b.slice().sort(function(a,b){return a>b}).reduce(function(a,b){return a.slice(-1)[0]!==b&&a.push(b),a},[]);return a}},{key:"isNumeric",value:function(a){return!Array.isArray(a)&&a-parseFloat(a)+1>=0}},{key:"getCursorPosition",value:function(a){if(a){if("selectionStart"in a)return a.selectionStart;if(document.selection){a.focus();var b=document.selection.createRange(),c=document.selection.createRange().text.length;return b.moveStart("character",-a.value.length),b.text.length-c}}}},{key:"elementExists",value:function(a){for(;a;){if(a===document)return!0;a=a.parentNode}return!1}},{key:"elementHasParent",value:function(b,c){for(;b;){if(b===document)return c===document;if("string"==typeof c&&a.is(b,c)||b===c)return!0;b=b.parentNode}return!1}},{key:"getElementParent",value:function(b,c){for(;b;){if(b===document)return document;if(a.is(b,c))return b;b=b.parentNode}return!1}},{key:"getPreviousSibling",value:function(b,c){for(b=b.previousSibling;b;){if(b===document)return document;if(a.is(b,c))return b;b=b.previousSibling}return!1}},{key:"getNextSibling",value:function(b,c){for(b=b.nextSibling;b;){if(b===document)return document;if(a.is(b,c))return b;b=b.nextSibling}return!1}},{key:"is",value:function(a,b){return a.nodeType==Node.ELEMENT_NODE&&(a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector).call(a,b)}},{key:"removeElement",value:function(a){return!!a.parentNode&&(a.parentNode.removeChild(a),!0)}},{key:"round",value:function(a,b,c){return 1==b?e(a,c):2==b?f(a,c):3==b?d(a,c,"HALF_DOWN"):d(a,c,"HALF_UP")}},{key:"str_pad",value:function(a,b,c){var d=a.toString();for(c||(c="0");d.length<b;)d=c+d;return d}},{key:"parseStr",value:function(a){return"string"!=typeof a?{}:(a=a.trim().replace(/^(\?|#|&)/,""),a?a.split("&").reduce(function(a,b){var c=b.replace(/\+/g," ").split("="),d=c.shift(),e=c.length>0?c.join("="):void 0;d=decodeURIComponent(d),e=void 0===e?null:decodeURIComponent(e);var f=d.indexOf("["),g=d.indexOf("]");if(f!=-1&&g!=-1){var h=d.substr(f+1,g-f-1);d=d.substr(0,f),a.hasOwnProperty(d)||(a[d]={}),a[d][h]=e}else a.hasOwnProperty(d)?Array.isArray(a[d])?a[d].push(e):a[d]=[a[d],e]:a[d]=e;return a},{}):{})}},{key:"encodeStr",value:function(b,c){var d=[];for(var e in b)if(b.hasOwnProperty(e)){var f=c?c+"["+e+"]":e,h=b[e];d.push("object"==("undefined"==typeof h?"undefined":g(h))?a.encodeStr(h,f):encodeURIComponent(f)+"="+encodeURIComponent(h))}return d.join("&")}},{key:"extend",value:function(b,c){b=b||{};for(var d=1;d<arguments.length;d++){var e=arguments[d];if(e)for(var f in e)e.hasOwnProperty(f)&&("object"===g(e[f])?b[f]=a.extend(b[f],e[f]):b[f]=e[f])}return b}},{key:"triggerEvent",value:function(a,b){var c;return"createEvent"in document?(c=document.createEvent("HTMLEvents"),c.initEvent(b,!1,!0),a.dispatchEvent(c)):(c=document.createEventObject(),c.eventType=b,a.fireEvent("on"+c.eventType,c))}},{key:"addEventListener",value:function(a,b,c,d,e){var f=e||document,g=!0,h=!1,i=void 0;try{for(var j,k=f.querySelectorAll(a)[Symbol.iterator]();!(g=(j=k.next()).done);g=!0){var l=j.value;l.addEventListener(b,c,d)}}catch(a){h=!0,i=a}finally{try{!g&&k.return&&k.return()}finally{if(h)throw i}}}}]),a}();b.default=i,a.exports=b.default});
//# sourceMappingURL=utils.js.map