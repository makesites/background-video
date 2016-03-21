var utils = {
	getType: function(url){
		var ext = url.substr( url.lastIndexOf('.')+1 );
		return ext.toLowerCase();
	},

	injectStyles: function ( css ) {
		var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}
};
