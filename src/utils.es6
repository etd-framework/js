/**
 * @package     JS
 *
 * @version     2.0.0
 * @copyright   Copyright (C) 2016 ETD Solutions. Tous droits réservés.
 * @license     Apache-2.0
 * @author      ETD Solutions http://etd-solutions.com
 */

// Méthodes privées
// ===============================

function _round(value, precision, mode) {

    precision |= 0;
    var m = Math.pow(10, precision);
    value *= m;
    var sgn = (value > 0) | -(value < 0); // sign of the number
    var isHalf = value % 1 === 0.5 * sgn;
    var f = Math.floor(value);

    if (isHalf) {
        switch (mode) {
            case 'HALF_DOWN':
                value = f + (sgn < 0); // rounds .5 toward zero
                break;
            case 'HALF_EVEN':
                value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
                break;
            case 'HALF_ODD':
                value = f + !(f % 2); // rounds .5 towards the next odd integer
                break;
            default:
                value = f + (sgn > 0); // rounds .5 away from zero
        }
    }

    return (isHalf ? value : Math.round(value)) / m;
}


function _ceilf(value, precision) {

    var precision_factor = precision == 0 ? 1 : Math.pow(10, precision);
    var tmp              = value * precision_factor;
    var tmp2             = tmp.toString();

    // Si la valeur actuelle a déjà la précision désirée.
    if (tmp2.indexOf('.') === -1) {
        return value;
    }

    if (tmp2[tmp2.length - 1] == 0) {
        return value;
    }

    return Math.ceil(tmp) / precision_factor;
}

function _floorf(value, precision) {

    var precision_factor = precision == 0 ? 1 : Math.pow(10, precision);
    var tmp              = value * precision_factor;
    var tmp2             = tmp.toString();

    // Si la valeur actuelle a déjà la précision désirée.
    if (tmp2.indexOf('.') === -1) {
        return value;
    }

    if (tmp2[tmp2.length - 1] == 0) {
        return value;
    }

    return Math.floor(tmp) / precision_factor;
}

// Classe publique
// ===============================

/**
 * Classe d'utilitaires.
 *
 * @class {Utils}
 */
class Utils {

    static clone(obj) {
        if (typeof obj == "undefined" || obj === null) {
            return obj;
        }
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Méthode pour trouver l'index d'un noeud chez son parent.
     *
     * @param node
     * @returns {number}
     */
    static indexOfNode(node) {
        if (!node) return -1;
        var i = 0;
        while (node = node.previousElementSibling) {
            ++i;
        }
        return i;
    }

    /**
     * Méthode pour savoir si un objet est vide.
     *
     * @param obj
     * @returns {boolean} True si vide, false sinon.
     */
    static isObjectEmpty(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Méthode pour récupérer la position absolue d'un élément dans la page.
     *
     * @param el
     * @returns {{top: number, left: number}}
     */
    static getElementOffset(el) {

        var _x = 0;
        var _y = 0;

        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }

        return { top: _y, left: _x };
    }

    /**
     * Méthode pour tester si deux tableaux possèdent les même valeurs.
     *
     * @param {[]} arr1
     * @param {[]} arr2
     * @returns {boolean}
     */
    static areArraysEqual(arr1, arr2) {

        var len = arr1.length;

        if (len != arr2.length) {
            return false;
        }

        for (var i=0; i < len; i++) {
            if (arr2.indexOf(arr1[i]) === -1) {
                return false;
            }
        }

        return true;

    }

    static uniq(array) {

        var uniq = array.slice()
            .sort(function(a,b){
                return a > b;
            })
            .reduce(function(a,b){
                if (a.slice(-1)[0] !== b) a.push(b);
                return a;
            },[]);

        return uniq;

    }

    static isNumeric(obj) {
        return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
    }

    static getCursorPosition(input) {
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }

    static elementExists(element) {
        while (element) {
            if (element === document) {
                return true;
            }
            element = element.parentNode;
        }
        return false;
    }

    static elementHasParent(element, parent) {

        while (element) {
            if (element === document) {
                return parent === document;
            }
            if ((typeof parent == "string" && Utils.is(element, parent)) || element === parent) {
                return true;
            }
            element = element.parentNode;
        }

        return false;
    }

    static getElementParent(element, selector) {

        while (element) {
            if (element === document) {
                return document;
            }
            if (Utils.is(element, selector)) {
                return element;
            }
            element = element.parentNode;
        }

        return false;
    }

    static getPreviousSibling(element, selector) {

        element = element.previousSibling;

        while (element) {
            if (element === document) {
                return document;
            }
            if (Utils.is(element, selector)) {
                return element;
            }
            element = element.previousSibling;
        }

        return false;
    }

    static getNextSibling(element, selector) {

        element = element.nextSibling;

        while (element) {
            if (element === document) {
                return document;
            }
            if (Utils.is(element, selector)) {
                return element;
            }
            element = element.nextSibling;
        }

        return false;
    }

    static is(element, selector) {
        if (element.nodeType == Node.ELEMENT_NODE) {
            return (element.matches
            || element[ 'webkitMatchesSelector' ]
            || element[ 'mozMatchesSelector' ]
            || element[ 'msMatchesSelector' ]
            || element[ 'oMatchesSelector' ]).call( element, selector );
        }
        return false;
    }

    static removeElement(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
            return true;
        }
        return false;
    }

    /**
     * Méthode pour arrondir un nombre
     *
     * @param {number|float} value
     * @param {int} method
     * @param {int} prec
     *
     * @returns {float}
     */
    static round(value, method, precision) {

        if (method == 1) {
            return _ceilf(value, precision);
        } else if (method == 2) {
            return _floorf(value, precision);
        } else if (method == 3) {
            return _round(value, precision, 'HALF_DOWN');
        }

        return _round(value, precision, 'HALF_UP');

    }

    static str_pad(i,l,s) {
        var o = i.toString();
        if (!s) { s = '0'; }
        while (o.length < l) {
            o = s + o;
        }
        return o;
    }

    static parseStr(str) {

        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }

        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            var s = key.indexOf("["),
                e = key.indexOf("]");

            if (s != -1 && e != -1) {
                var subkey = key.substr(s+1,e-s-1);
                key = key.substr(0,s);
                if (!ret.hasOwnProperty(key)) {
                    ret[key] = {};
                }
                ret[key][subkey] = val;
            } else if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});

    }

    static encodeStr(obj, prefix) {
        var str = [];
        for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(typeof v == "object" ?
                    Utils.encodeStr(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    /**
     * Merge the contents of two or more objects together into the first object.
     *
     * @param   {object}    target  The object to extend. It will receive the new properties.
     * @param   {...object} object1 An object containing additional properties to merge in.
     *
     * @returns {object}
     */
    static extend(target, object1) {

        target = target || {};

        for (var i = 1; i < arguments.length; i++) {

            var obj = arguments[i];

            if (!obj) {
                continue;
            }

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        target[key] = Utils.extend(target[key], obj[key]);
                    } else {
                        target[key] = obj[key];
                    }
                }
            }

        }

        return target;

    }

    /**
     * Méthode pour déclencher un événement sur un élément DOM
     *
     * @param {HTMLElement} element    La cible (target) de l'évènement.
     * @param {string}      type       Le type d'événement à envoyer.
     *
     * @return {bool} La valeur renvoyée est false si au moins un des gestionnaires d'évènements gérant cet évènement a appelé preventDefault. Dans les autres cas, la valeur renvoyée est true.
     */
    static triggerEvent(element, type) {

        var e;

        if ('createEvent' in document) {
            e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            return element.dispatchEvent(e);
        } else {
            e = document.createEventObject();
            e.eventType = type;
            return element.fireEvent('on' + e.eventType, e);
        }
    }

    /**
     * Assigne de gestionnaires d'évènements sur plusieurs éléments cibles.
     *
     * @param selector   chaîne qui contient un ou plusieurs sélecteurs CSS séparés par des virgules.
     * @param event      une chaîne représentant le type d'évènement à enregistrer.
     * @param listener   l'objet qui recevra une notification lorsqu'un évènement du type spécifié se produit
     * @param useCapture si défini à true, useCapture indique que l'utilisateur désire initier la capture
     * @param baseEl     élément de base pour querySelectorAll
     */
    static addEventListener(selector, event, listener, useCapture, baseEl) {
        
        let base = baseEl || document;

        for (let el of base.querySelectorAll(selector)) {
            el.addEventListener(event, listener, useCapture);
        }
        
    }

    /**
     * Retourne une représentation d'un formulaire sous forme d'objet.
     *
     * @param {HTMLElement} element L'élément contenant les champs à inclure.
     *
     * @returns {{}}
     */
    static serialize(element) {

        let s = {};

        for (let field of element.querySelectorAll("input, select, textarea")) {
            if (field.name && !field.disabled) {
                if (field.type == 'select-multiple') {
                    for (let j=0, l=field.options.length; j < l; j++) {
                        if (field.options[j].selected) {
                            if (!s[field.name]) {
                                s[field.name] = [];
                            }
                            s[field.name].push(field.options[j].value);
                        }
                    }
                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[field.name] = field.value;
                }
            }
        }

        return s;
    }

    static numberFormat(number, decimals, decPoint, thousandsSep) {

        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        let n = !isFinite(+number) ? 0 : +number;
        let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
        let dec = typeof decPoint === 'undefined' ? '.' : decPoint;
        let s = '';

        let toFixedFix = function toFixedFix(n, prec) {
            let k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k).toFixed(prec);
        };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }

        return s.join(dec);
    }

}

export default Utils;
