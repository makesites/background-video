/**
 * @name {{name}}
 * @author {{author}}
 * Homepage: {{homepage}}
 * Version: {{version}} ({{build_date}})
 * @license {{#license licenses}}{{/license}}
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

{{{lib}}}

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
