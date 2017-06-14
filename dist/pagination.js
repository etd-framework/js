/**!
	* @package     @etd-framework/js
	*
	* @version     2.0.0
	* @copyright   Copyright (C) 2017 ETD Solutions. Tous droits réservés.
	* @license     Apache-2.0 
	* @author      ETD Solutions http://etd-solutions.com
*/

define(["module","exports"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),e=function(){function a(b,d){c(this,a),this.start=b,this.limit=d}return d(a,[{key:"update",value:function(a,b,c){var d=!1,e=0,f=0;b=Math.max(b,0),c=Math.max(c,0),c>a&&(b=0),0===c&&(b=0),void 0===c&&(c=a),b>a-c&&(b=Math.max(0,(Math.ceil(a/c)-1)*c)),c>0&&(f=Math.ceil(a/c),e=Math.ceil((b+1)/c));var g=e-5,h=void 0;g<1&&(g=1),g+10>f?(h=f,g=f<10?1:f-10+1):h=g+10-1,0===c&&(d=!0),this.viewall=d,this.total=a,this.start=b,this.limit=c,this.pagesTotal=f,this.pagesCurrent=e,this.pagesStart=g,this.pagesStop=h,this.displayedPages=10}}]),a}();b.default=e,a.exports=b.default});
//# sourceMappingURL=pagination.js.map