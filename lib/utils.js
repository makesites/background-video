var utils = {
	getType: function(url){
		var ext = url.substr( url.lastIndexOf('.')+1 );
		return ext.toLowerCase();
	},

	injectStyles: function ( css ) {
		var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		style.id = "css-background-video";
		style.type = "text/css";
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	},

	// deep extend, multi-object
	extend: function() {
		var objects = Array.prototype.slice.call(arguments);
		var destination = objects.shift();
		//
		for( var num in objects){
			var source = objects[num];
			for (var property in source) {
				if (source[property] && source[property].constructor && source[property].constructor === Object) {
					destination[property] = destination[property] || {};
					arguments.callee(destination[property], source[property]);
				} else {
					destination[property] = source[property];
				}
			}
		}
		return destination;
	},

	// check media queries
	// source: http://modernweb.com/2014/03/24/using-media-queries-in-javascript/
	mq: function(query, callback, usePolyfill) {
		// fallback
		callback = callback || function(){};
		var host = {};
		//
		var isMatchMediaSupported = !!(window && window.matchMedia) && !usePolyfill;
		if(isMatchMediaSupported) {
			var res = window.matchMedia(query);
			callback.apply(host, [res.matches, res.media]);
			// event listener
			res.addListener(function(changed) {
				callback.apply(host, [changed.matches, changed.media]);
			});
			return res.matches;
		} else {
			// ... polyfill
		}
	}

};
