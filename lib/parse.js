var parse = function(){
	// prerequisites
	if( !w.document.styleSheets ) return;
	// sniff all the css attributes
	var sheets = w.document.styleSheets;
	// loop through stylesheets to find videos
	var videos = parseSheets.bind(this)( sheets );
	// get el
	for( var selector in videos ){
		var el = w.document.querySelectorAll( selector );
		this.render(el, videos[selector]);
	}
};

// helpers
var parseSheets = function( sheets, data ){
	data = data || {};
	for(var i in sheets){
		var rules = sheets[i].rules || sheets[i].cssRules;
		for(var r in rules){
			// conditions
			if( !rules[r].cssText ) continue;
			if( rules[r].cssText.search( this.options.attribute ) == -1 ) continue;
			if( rules[r].cssText.search(/mp4|webm|ogv/g) == -1 ) continue;
			// if media query, check that it validates
			//if( rules[r].cssText.search("@media") > -1 ){
			if( rules[r].media ){
			//	var queries = rules[r].cssText.match(/@media (.*?)\{/g);
			//	if( queries ){
				//var query = queries[0].replace(/@media|\{/g, ""); // not expect more than one
				var query = rules[r].media[0]; // not expect more than one
				var valid =  utils.mq( query );
				if( !valid ) continue;
				data = parseSheets.bind(this)( [rules[r]], data );
				continue;
			}
			var selector = rules[r].selectorText;
			// get urls
			var videos = rules[r].cssText.match(/url\((.*?)\)/g);
			// clean urls
			for(var j in videos){
				videos[j] = videos[j].replace(/url\(|\)|'|"/g, "");
			}
			data[selector] = videos;
		}
	}

	return data;
};
