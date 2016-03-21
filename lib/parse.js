var parse = function(){
	// prerequisites
	if( !w.document.styleSheets ) return;
	// sniff all the css attributes
	var sheets = w.document.styleSheets;
	// loop through stylesheets
	for(var i in sheets){
		var rules = sheets[i].rules || sheets[i].cssRules;
		for(var r in rules){
			// #21 - excluding :hover styles from parsing
			if( !rules[r].cssText ) continue;
			if( rules[r].cssText.search( this.options.attribute ) == -1 ) continue;
			if( rules[r].cssText.search(/mp4|webm|ogv/g) == -1 ) continue;
			// get el
			var selector = rules[r].selectorText;
			var els = w.document.querySelectorAll( selector );
			// get urls
			var videos = rules[r].cssText.match(/url\((.*?)\)/g);
			// clean urls
			for(var j in videos){
				videos[j] = videos[j].replace(/url\(|\)|'|"/g, "");
			}
			this.render(els, videos);
		}
	}
};
