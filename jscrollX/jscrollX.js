"use strict";

;(function($) {
    $.fn.jscrollX = function(options) {
	var defaults = {
	    "orientation": "left",
	    "speed": 10
	};
	var options = $.extend(defaults, options);
	return this.each(function() {
	    var topDiv = $(this);
	    var ul  = topDiv.children("ul");
	    var length =
		    ul.children("li").length * ul.children("li").width();
	    var width = topDiv.width();
	    topDiv.css("position", "relative");
	    ul.css("width", "400%");
	    ul.css("position", "absolute");
	    ul.find("li").clone().appendTo(ul);
	    if (length < width) {
		ul.find("li").clone().appendTo(ul);
	    }
	    var interval = setInterval(scrollX, parseInt(options.speed));
	    var pos = 0;
	    $(this).hover(
		       function() {
			   clearInterval(interval);
		       },
		       function() {
			   interval =
			       setInterval(scrollX, parseInt(options.speed));
		       });
	    function scrollX() {
		pos -= 1;
		if (pos <= -length) {
		    pos = 0;
		}
		ul.css(options.orientation, pos);
	    }
	});
    };
})(jQuery)
	    
