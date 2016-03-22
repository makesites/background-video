var styles = function(){
	var css = "";
	// lookup conflicting stylesheet
	var stylesheet = document.getElementById('css-background-video');
	if( stylesheet ){
		// get styles
		css = stylesheet.innerHTML;
        // exit now if it already contains the .video-background class
        if( css.search(this.options.className) > -1 ) return;
		// remove existing stylesheet
		stylesheet.parentNode.removeChild(stylesheet);
	}
	// inject stylesheet
	css += '.'+ this.options.className +' { position: '+ this.options.position +'; top: 50%; left: 50%; -webkit-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%); min-width: 100%; min-height: 100%; width: 100%; height: auto; z-index: -1000; overflow: hidden; }';

	utils.injectStyles( css );

};
