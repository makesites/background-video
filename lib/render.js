var render = function(els, videos){
	var video = '<video autoplay muted loop class="'+ this.options.className +'">';
	for( var n in videos ){
		var url = videos[n];
		var type = utils.getType( url );
		video += '<source src="'+ url +'" type="video/'+ type +'">';
	}
	video += "</video>";
	var parser = new DOMParser();
	video = parser.parseFromString(video, "text/html");
	video = video.getElementsByTagName('video')[0];
	// setup events
	this.events( video );

	// insert in the DOM
	for(var e = 0; e < els.length; e++) {
		var el = els[e];
		// remove previous background(s)
		var vbg = el.getElementsByClassName( this.options.className );
		for( var i=0; i < vbg.length; i++) el.removeChild( vbg[i] );
		// add new video background
		if( el.children ){
			// insert before first element
			el.insertBefore( video, el.children[0] );
		} else {
			// simple append
			el.appendChild( video );
		}
	}
};
