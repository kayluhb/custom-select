/*
Call the plugin with $('jquery-selector').customSelect();
*/
(function($) {
    var CustomSelect = function(el, opts) {
        //Defaults are below
        var settings = $.extend({}, $.fn.customSelect.defaults, opts),
            selected = ':selected',
            $el = $(el),
            $wrap = $('<div/>'),
            cur = $el.find(selected),
            cls = $el.attr('class');

        $wrap
            .addClass(cls + '-wrap')
            .html('<span class="' + cls + '"><span class="inner">' + cur.text() + '</span></span>');

        var $inner = $wrap.find('.inner');

        $el
            .after($wrap)
            .css({ fontSize:$el.next().css('font-size'), opacity:0 })
            .change(function(){
                $inner.text($(this).find(selected).text());
            });

        $wrap.append($el);
    };
    $.fn.customSelect = function(options) {
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
    // default settings
    $.fn.customSelect.defaults = { /* nothing yet */ };
})(jQuery);
