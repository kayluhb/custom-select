/*
Call the plugin with
    $('jquery-selector').customSelect();

*/
(function($) {
    var CustomSelect = function(el, opts) {
        //Defaults are below
        var settings = $.extend({}, $.fn.customSelect.defaults, opts),
            selected = ':selected',
            $el = $(el),
            $wrap = $('<span/>'),
            cls = $el.attr('class') === undefined ? 'custom-select' : $el.attr('class'),
            cur = $el.find(selected),
            firstCls = cls.split(' ')[0],
            innerCls = firstCls + '-inner',
            id = $el.attr('id'),
            f = 'focus';

        // Set id on input if it doesn't have one
        if (!id || id.length < 1) {
            id = $el.attr('id', '_custom_select_' + $.fn.customSelect.uid++).attr('id');
        }
        $el.addClass(cls);
        
        $wrap
            .addClass(firstCls + '-wrap ' + cls.split(firstCls).join(''))
            .html('<span class="' + cls + '" id="cs_' + id + '" aria-controls="' + id + '"><span class="' + innerCls + '"></span><i></i></span>');

        var $inner = $wrap.find('.' + innerCls);

        $el
            .after($wrap)
            .css({ fontSize: $el.next().css('font-size'), opacity: 0 })
            .change(function () {
                setText();
            })
            .focusin(function () {
                $wrap.addClass(f);
            })
            .focusout(function () {
                $wrap.removeClass(f);
            });

        $wrap.append($el);
        setText();

        function setText() {
            $inner.text($el.find(selected).text());
            var w = $inner.parent().outerWidth();
            $el.width(w);
            $wrap.width(w);
        }
    };

    $.fn.customSelect = function (options) {
        return this.each(function(idx, el) {
            var $el = $(this), key = 'customSelect';
            // Return early if this element already has a plugin instance
            if ($el.data(key)) { return; }
            // Pass options to plugin constructor
            var customSelect = new CustomSelect(this, options);
            // Store plugin object in this element's data
            $el.data(key, customSelect);
        });
    };

    // Static properties
    $.fn.customSelect.uid = 0;

    // Default settings
    $.fn.customSelect.defaults = { /* nothing yet */ };
})(jQuery);
