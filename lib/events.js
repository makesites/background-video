var events = function( video ){
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
	// broadcast state to data attribute
	video.addEventListener('play', function( e ){
		this.setAttribute('data-state','play');
	}, false);
	video.addEventListener('pause', function( e ){
		this.setAttribute('data-state','pause');
	}, false);
	video.addEventListener('ended', function( e ){
		this.setAttribute('data-state','ended');
	}, false);
};
