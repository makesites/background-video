/**
 * @name css-background-video
 * @author makesites
 * Homepage: http://github.com/makesites/css-background-video
 * Version: 0.2.0 (Mon, 21 Mar 2016 07:45:18 GMT)
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
	utils.injectStyles('.video-background { position: '+ this.options.position +'; /* bottom: 50%; right: 50%; -webkit-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-50%); */ min-width: 100%; min-height: 100%; width: auto; height: auto; z-index: -1000; overflow: hidden; }');

	// find all the elements
	if( this.options.autoparse ) this.parse();
	//
};

// Methods

// default options (extend when you initialize)
var defaults = {
	autoparse: true,
	position: "absolute", // options: absolute, fixed
	attribute: "background",
	dataClass: false
};

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
			if( rules[r].cssText.search("background") == -1 ) continue;
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

var render = function(els, videos){
	var video = '<video autoplay muted loop class="video-background">';
	for( var n in videos ){
		var url = videos[n];
		var type = utils.getType( url );
		video += '<source src="'+ url +'" type="video/'+ type +'">';
	}
	video += "</video>";
	var parser = new DOMParser();
	video = parser.parseFromString(video, "text/html");
	video = video.getElementsByTagName('video')[0];
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
	}

};


	//
	Shim.prototype.parse = parse;
	Shim.prototype.render = render;
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
