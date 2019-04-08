/**
 * @name css-background-video
 * @author makesites
 * Homepage: http://github.com/makesites/css-background-video
 * Version: 1.0.0 (Mon, 08 Apr 2019 17:29:39 GMT)
 * @license Apache License, Version 2.0
 */


(function (root, lib) {

	"use strict";

	var define = define || false;
	var module = module || false;

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define('background-video', [], lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		lib(root);
	}

}(this, function ( w ) {

// Local variables
var video, backgroundVideo;

var Shim = function( options ){
	// variables
	var self = this;
	// fallbacks
	w.document = w.document || {};
	options = options || {};
	// extend options
	this.options = utils.extend({}, defaults, options);
	//
	this.styles();

	// find all the elements
	if( this.options.autoparse ) this.parse();
	//
};

// Methods

// default options (extend when you initialize)
var defaults = {
	autoparse: true,
	position: "absolute", // options: absolute, fixed, relative
	attribute: "background",
	className: "css-background-video",
	dataClass: false
};

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


	//
	Shim.prototype.events = events;
	Shim.prototype.parse = parse;
	Shim.prototype.render = render;
	Shim.prototype.styles = styles;
	//Shim.prototype.update = update;

	// auto-run if defined
	var css = w.css || {};
	if( css['background-video'] ){
		var options = (typeof css['background-video'] == "object") ? css['background-video'] : {};
		w.onload = function(){
			new Shim( options );
		};
	}
	// update global namespace
	css['background-video'] = Shim;
	w.css = css;

	// for module loaders:
	return Shim;


}));

/*
// watch an element for changes
// Source: jQuery Three - https://github.com/makesites/jquery-three
Three.prototype.watch = function( el ) {
	var self = this;
	var element = $(this.el).toSelector() +" "+ $( el ).selector;
	// monitor new elements
	$('body').on('DOMSubtreeModified', element, function(e){
		self.eventSubtree(e);
	});
	// monitor attribute changes
	if (el.onpropertychange){
		$('body').on('propertychange', element, function(e){
			self.eventAttribute(e);
		});
	}
	else {
		$('body').on('DOMAttrModified', element, function(e){
			self.eventAttribute(e);
		});
	}
	// monitor css style changes

};
*/
