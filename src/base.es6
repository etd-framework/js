/**
 * @package     JS
 *
 * @version     2.0.0
 * @copyright   Copyright (C) 2016 ETD Solutions. Tous droits réservés.
 * @license     Apache-2.0
 * @author      ETD Solutions http://etd-solutions.com
 */

import Utils from "etdsolutions/utils";

// Méthodes privées
// ===============================

/**
 * Returns unique class identifier
 *
 * @param {HTMLElement} element The base element.
 *
 * @returns {String}
 * @private
 */
function _uid(element) {

    if (element.getAttribute('id')) {
        return element.getAttribute('id');
    }
// TEST
    if (element.getAttribute('name')) {
        return element.getAttribute('name');
    }

    var form = '';
    if (element.form.id) {
        form = element.form.id;
    }

    if (!form && element.form.name) {
        form = element.form.name;
    }

    return form + Utils.indexOfNode(element);
}

// Classe publique
// ===============================

/**
 * Classe de base avec les méthodes de base
 *
 * @class {Base}
 */
class Base {

    /**
     * Un objet contenant les écouteurs des événements émis par la classe.
     * @type {{}}
     * @private
     */
    _listeners;

    element;
    defaults;
    options;

    /**
     * Constructeur
     *
     * @param {HTMLElement|String} element   L'élément DOM de base ou un identifiant.
     * @param {object}                    [options] Les options
     *
     * @constructor
     */
    constructor(element, options) {

        this.element  = document.getElementById(element);
        this.options  = {};
        this._listeners = {};

        if (options) {
            this.setOptions(options);
        }

    }

    /**
     * Définit les options.
     *
     * @param {object} options Un objet contenant les options.
     *
     * @returns {Base}
     */
    setOptions(options) {
        this.options = Utils.extend({}, this.options, options);
        return this;
    }

    /**
     * Donne l'élément jQuery de base.
     *
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }

    /**
     * Donne l'identifiant unique de l'objet.
     *
     * @returns {string}
     */
    uid() {
        return _uid(this.getElement()).replace(/\[\]:/gi, '');
    }

    /**
     * Attache des événements à l'instance.
     *
     * @param {[]}       types    Un tableau des types d'événements à écouter.
     * @param {function} listener La fonction appelée quand l'événement est déclenché.
     *
     * @returns {Base}
     */
    on(types, listener) {

        if (!Array.isArray(types)) {
            types = types.split(" ");
        }

        for (var a = 0, len = types.length; a < len; a++) {

            var type = types[a];

            if (typeof this._listeners[type] == "undefined") {
                this._listeners[type] = [];
            }

            this._listeners[type].push(listener);

        }

        return this;
    }

    /**
     * Supprime des événements attachés à l'instance.
     *
     * @param {[]}       types      Un tableau des types d'événements à retirer.
     * @param {function} [listener] La fonction a détacher en particulier de l'événement (optionnel)
     *
     * @returns {Base}
     */
    off(types, listener) {

        if (!Array.isArray(types)) {
            types = types.split(" ");
        }

        for (var a = 0, tLen = types.length; a < tLen; a++) {

            var type = types[a];

            if (Array.isArray(this._listeners[type])) {

                var listeners = this._listeners[type];

                if (typeof listener !== "undefined") {
                    for (var i=0, len=listeners.length; i < len; i++) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    listeners = [];
                }
            }

        }

        return this;
    }

    trigger(events, args) {

        args = args || [];

        if (!Array.isArray(events)) {
            events = events.split(" ");
        }

        for (var a = 0, eLen = events.length; a < eLen; a++) {

            var event = events[a];

            if (typeof event == "string") {
                event = { type: event };
            }

            if (!event.target) {
                event.target = this;
            }

            if (!event.type) {  //falsy
                throw new Error("Event object missing 'type' property.");
            }

            event.defaultPrevented = false;
            event.isStopped = false;

            /**
             * Empêche d'autres listeners du même évévement d'être appelé.
             */
            event.stopImmediatePropagation = function() {
                this.isStopped = true;
            };

            /**
             * Annule l'évènement s'il est annulable, sans stopper sa propagation.
             */
            event.preventDefault = function() {
                this.defaultPrevented = true;
            };

            if (Array.isArray(this._listeners[event.type])) {
                var emitArgs  = [event].concat(args);
                var listeners = this._listeners[event.type];
                for(var i=0, len=listeners.length; i<len; i++) {
                    listeners[i].apply(this, emitArgs);
                    if (event.isStopped) {
                        break;
                    }
                }
            }

        }

        return this;
    }

}

export default Base;
