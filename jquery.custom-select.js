/* 

Call the plugin with $('jquery-selector').customSelect({  });

*/
(function($) {
    var CustomSelect = function(el, opts) {
        //Defaults are below
        var settings = $.extend({}, $.fn.customSelect.defaults, opts),
        selected = ':selected',
        $win = $(window),
        $el = $(el),
        cur = $el.find(selected);
        $el
            .after('<span class="' + $el.attr('class') + '"><span class="inner">' + cur.text() + '</span></span>')
            .css({ fontSize:$el.next().css('font-size'), opacity:0 });
        var span = $el.next()
            .mousemove(function(e){
                $el.css({
                  'left': e.pageX - span.offset().left - $el.outerWidth() + 20, // position right side 20px right of cursor X)
                  'top': e.pageY - span.offset().top - $win.scrollTop() - 3
                });	
            }),
	      inner = span.find(':first-child');
        $el.change(function(){
            inner.text($(this).find(selected).text()).parent();
        });
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

