/**!
	* @package     @etd-framework/js
	*
	* @version     2.0.0
	* @copyright   Copyright (C) 2016 ETD Solutions. Tous droits réservés.
	* @license     Apache-2.0 
	* @author      ETD Solutions http://etd-solutions.com
*/

define(["module","exports"],function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),e=function(){function a(b,d){c(this,a),this.start=b,this.limit=d}return d(a,[{key:"update",value:function(a,b,c){var d=!1,e=0,f=0;b=Math.max(b,0),c=Math.max(c,0),c>a&&(b=0),c||(c=a,b=0),b>a-c&&(b=Math.max(0,(Math.ceil(a/c)-1)*c)),c>0&&(f=Math.ceil(a/c),e=Math.ceil((b+1)/c));var g,h=10,i=e-h/2;i<1&&(i=1),i+h>f?(g=f,i=f<h?1:f-h+1):g=i+h-1,0==c&&(d=!0),this.viewall=d,this.total=a,this.start=b,this.limit=c,this.pagesTotal=f,this.pagesCurrent=e,this.pagesStart=i,this.pagesStop=g,this.displayedPages=h}}]),a}();b.default=e,a.exports=b.default});
//# sourceMappingURL=pagination.js.map