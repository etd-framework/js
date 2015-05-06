/*
 * @package     etd-framework/js
 *
 * @version     1.0
 * @copyright   Copyright (C) 2015 ETD Solutions, SARL Etudoo. Tous droits réservés.
 * @license     Apache License Version 2.0 (https://raw.githubusercontent.com/etd-framework/js/master/LICENSE)
 * @author      ETD Solutions http://etd-solutions.com
 */

define(["jquery", "etdsolutions/app", "etdsolutions/text"], function($, app, text) {

    /*
     * Méthodes privées
     */

    function sendTask(self, $this, $icon, options, newValue, handler) {

        // On crée l'objet de données.
        var data = {};

        $.each(options.props, function(i, str) {
            data[str] =  $this.data(i);
        });

        data[options.valueName] = newValue;
        data[options.token] = '1';

        if (!$icon.hasClass('fa-spin')) {
            $icon.removeClass('fa-warning ' + options.icons).addClass('fa-spin fa-refresh');

            self.task(options.uri, data, function(data) {

                if (options.successCallback) {
                    options.successCallback(data, $this, newValue);
                }

                $this.data('current', newValue);

                var btnParams = handler(newValue, options.states || {});

                $this.tooltip('destroy');
                $this.attr('title', text._(btnParams.txt));
                $this.tooltip({
                    container: 'body',
                    html: true
                });
                $icon.removeClass('fa-spin fa-refresh').addClass(btnParams.icon);

            }, function() {

                $icon.removeClass('fa-spin fa-refresh').addClass('fa-warning');

            });
        }

    }

    function btnCall(self, type, btnSelector, options, handler) {

        $(btnSelector).on('click', function(e) {

            e.preventDefault();

            var $this = $(this),
                $icon = $this.find('.fa');

            // On change la valeur.
            var newValue;

            if (type == 'toggle') {

                newValue = 1 - $this.data('current');

                sendTask(self, $this, $icon, options, newValue, handler);

            } else if (type == 'choice') {

                if (!$this.data('init')) {

                    var html = '';
                    $.each(options.states, function(val) {
                        if (val != 'default') {
                            html += '<label class="radio-inline"><input type="radio" name="' + options.valueName + '" value="' + val + '"> ' + this.txt + '</label>';
                        }
                    });

                    $this.popover({
                            html: true,
                            content: html,
                            placement: 'bottom',
                            template: '<div class=\"popover popover-choice\" role=\"tooltip\"><div class=\"arrow\"></div><div class=\"popover-content\"></div></div>'
                    }).on('shown.bs.popover', function() {
                        $this.data('bs.popover').$tip.find('input').on('change', function() {

                            $this.popover('hide');
                            newValue = $(this).val();
                            sendTask(self, $this, $icon, options, newValue, handler);

                        });
                    });

                    $this.data('init', true);
                    $this.popover('show');
                }

            }


        });

    }

    /*
     * Objet public
     */

    return {

        createChoiceBtn: function(btnSelector, options) {

            btnCall(this, 'choice', btnSelector, options, function(newValue, states) {

                var btnParams = {
                    txt: states.default.txt,
                    icon: states.default.icon
                };

                if (states[newValue]) {
                    btnParams.txt = states[newValue].txt;
                    btnParams.icon = states[newValue].icon;
                }

                return btnParams;

            });

            return this;

        },

        createToggleBtn: function(btnSelector, options) {

            options['icons'] = 'fa-check fa-times';

            btnCall(this, 'toggle', btnSelector, options, function(newValue, states) {

                var btnParams = {
                    txt: '',
                    icon: ''
                };

                if (newValue == 1) {
                    btnParams.txt = 'APP_GLOBAL_YES';
                    btnParams.icon = 'fa-check';
                } else {
                    btnParams.txt = 'APP_GLOBAL_NO';
                    btnParams.icon = 'fa-times';
                }

                return btnParams;

            });

            return this;

        },

        /**
         * Méthode pour appeler un controller
         *
         * @param uri
         * @param data
         * @param successCallback
         * @param failCallback
         * @returns jqXHR
         */
        task: function(uri, data, successCallback, failCallback) {

            return $.ajax(uri, {
                dataType: 'json',
                type: 'POST',
                data: data
            }).done(function(data) {
                if (data.error) {
                    app.raiseError(data.message);
                    if (failCallback) {
                        failCallback(data);
                    }
                } else if(successCallback) {
                    successCallback(data);
                }
            }).fail(function(obj) {
                if (obj.responseJSON && obj.responseJSON.error) {
                    app.raiseError(obj.responseJSON.message);
                    if (failCallback) {
                        failCallback(obj.responseJSON);
                    }
                } else {
                    if (failCallback) {
                        failCallback();
                    }
                }
            });

        }

    };

});