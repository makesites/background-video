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
	// events
	video.addEventListener('error', function( e ){
		//console.log("error",  e);
		// reset
		this.load();
		//this.play();
	}, false);
	// remove any fallback background when playing
	video.addEventListener('canplaythrough', function( e ){
		this.parentNode.style.background = "none";
	}, false);
	// insert in the DOM
	for(var e = 0; e < els.length; e++) {
		var el = els[e];
		if( el.children ){
			// insert before first element
			el.insertBefore( video, el.children[0] );
		} else {
			// simple append
			el.appendChild( video );
		}
	}
};
