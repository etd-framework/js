/*
 * @package     etd-framework/js
 *
 * @version     1.0
 * @copyright   Copyright (C) 2015 ETD Solutions, SARL Etudoo. Tous droits réservés.
 * @license     Apache License Version 2.0 (https://raw.githubusercontent.com/etd-framework/js/master/LICENSE)
 * @author      ETD Solutions http://etd-solutions.com
 */

/**
 * Traduction JavaScript I18N pour l'application.
 */
define(["jquery", "vendor/etdsolutions/js/utils/sprintf"], function($, sprintf) {

    return {

        strings: {},

        '_': function(key) {
            return this.strings[key.toUpperCase()];
        },

        plural: function(string, n) {

            var self = this,
                key,
                found = false, // On essaye la clé sur les suffixes de pluriel potentiels.
                suffixes = this.getPluralSuffixes(n);

            suffixes.unshift(n);

            $.each(suffixes, function(i, suffix) {
                key = string + '_' + suffix;
                if (self.strings.hasOwnProperty(key)) {
                    found = true;
                    return false;
                }
                return true;
            });

            if (!found) {
                // Non trouvé, on revient à l'original.
                key = string;
            }

            key = this._(key);

            return sprintf.call(this, key, n);
        },

        sprintf: function() {
            if (arguments.length > 0) {
                arguments[0] = this._(arguments[0]);
                return sprintf.apply(this, arguments);
            }
            return '';
        },

        load: function(object) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    this.strings[key.toUpperCase()] = object[key];
                }
            }
            return this;
        },

        getPluralSuffixes: function(count) {

            var ret;

            if (count == 0) {
                ret = ['0'];
            } else if (count == 1) {
                ret = ['1'];
            } else {
                ret = ['MORE'];
            }

            return ret;
        }

    };

});