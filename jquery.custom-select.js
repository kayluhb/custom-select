/*
Call the plugin with
$('jquery-selector').customSelect();
*/

(function ($) {
    $.customSelect = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        var $el = $(el),
            $inner,
            $wrap = $('<span/>'),
            selected = ':selected';

        // Access to jQuery and DOM versions of element
        base.el = el;
        base.$el = $el;

        // Add a reverse reference to the DOM object
        base.$el.data('customSelect', base);

        function init() {
            
            base.options = $.extend({}, $.customSelect.defaults, options);

            var cls = $el.attr('class') === undefined ? 'custom-select' : $el.attr('class'),
                cur = $el.find(selected),
                firstCls = cls.split(' ')[0],
                f = 'focus',
                id = $el.attr('id'),
                innerCls = firstCls + '-inner';

            // Set id on input if it doesn't have one
            if (!id || id.length < 1) {
                id = $el.attr('id', '_custom_select_' + $.customSelect.uid++).attr('id');
            }
            $el.addClass(cls);
        
            $wrap
                .addClass(firstCls + '-wrap ' + cls.split(firstCls).join(''))
                .html('<span class="' + cls + '" id="cs_' + id + '" aria-controls="' + id + '"><span class="' + innerCls + '"></span><i></i></span>');

            $inner = $wrap.find('.' + innerCls);

            $el
                .after($wrap)
                .css({
                    fontSize: $el.next().css('font-size'),
                    opacity: 0
                })
                .change(function () {
                    base.setText();
                })
                .focusin(function () {
                    $wrap.addClass(f);
                })
                .focusout(function () {
                    $wrap.removeClass(f);
                });

            $wrap.append($el);
            base.setText();
        };

        base.setText = function () {
            $inner.text($el.find(selected).text());
            var w = $inner.parent().outerWidth();
            $el.width(w);
            $wrap.width(w);
        }

        // Run initializer
        init();
    };

    // Default options
    $.customSelect.defaults = {
        /* nothing yet */
    };

    // Static properties
    $.customSelect.uid = 0;

    $.fn.customSelect = function (options) {
        return this.each(function () {
            (new $.customSelect(this, options));
        });
    };

})(jQuery);
