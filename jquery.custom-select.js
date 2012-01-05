/* Custom Select plugin */
(function($){
    $.fn.extend({
        customSelect: function(opts) {
            if(!$.browser.msie || ($.browser.msie&&$.browser.version > 6)){
                return this.each(function() {
                    var $el = $(this), cur = $el.find(':selected');
                    $el.after('<span class="' + $el.attr('class') + '"><span class="inner">' + cur.text() + '</span></span>')
                        .css({ position:'absolute', opacity:0, fontSize:$el.next().css('font-size') });
                    var span = $el.next(), inner = span.find(':first-child');
                    $el.change(function(){
                        inner.text($(this).find(':selected').text()).parent();
                    });
                });
            }
        }
    });
})(jQuery);
