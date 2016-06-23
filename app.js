/*
 * @package     etd-framework/js
 *
 * @version     1.0
 * @copyright   Copyright (C) 2015-2016 ETD Solutions. Tous droits réservés.
 * @license     Apache License Version 2.0 (https://raw.githubusercontent.com/etd-framework/js/master/LICENSE)
 * @author      ETD Solutions http://etd-solutions.com
 */

define(["jquery", "etdsolutions/text"], function($, text) {

    return {

        clearMessages: function() {
            $('#message-container').empty();
        },

        renderMessages: function(messages) {

            var $container = $('#message-container');
            this.clearMessages();

            var $list = $('<ul class="alerts-list"></ul>');

            $.each(messages, function(type, msgs) {

                var html = '<li><div class="alert alert-' + type + ' alert-dismissable" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">' + text._('APP_GLOBAL_CLOSE') + '</span></button>';

                $.each(msgs, function(index, msg) {
                    if (index > 0) {
                        html += '<br>';
                    }
                    html += msg;
                });

                html += '</div></li>';

                $list.append($(html));
            });

            $container.append($list);

            $container.trigger('messages');

        },

        renderMessage: function(type, message) {
            var messages = {};
            messages[type] = [message];
            this.renderMessages(messages);
        },

        raiseError: function(error) {
            this.renderMessage('error', error);
        },

        raiseWarning: function(warning) {
            this.renderMessage('warning', warning);
        },

        raiseSuccess: function(success) {
            this.renderMessage('success', success);
        },

        raiseInfo: function(info) {
            this.renderMessage('info', info);
        }

    }

});