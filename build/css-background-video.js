/**
 * @name css-background-video
 * @author makesites
 * Homepage: http://github.com/makesites/css-background-video
 * Version: 0.0.0 (Mon, 21 Mar 2016 02:20:01 GMT)
 * @license Apache License, Version 2.0
 */


(function (root, lib) {

	"use strict";

	var define = define || false;

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

var Shim = function(){
	//
}

console.log( w );
// Methods




	//
	Shim.prototype.process = process;
	Shim.prototype.update = update;

	// auto-run if defined
	new Shim();

	// update global namespace
	window.css = {
		'background-video': Shim
	};

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
