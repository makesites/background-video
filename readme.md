# CSS: background-video

An HTML5 shim to support background videos as a CSS attribute.


## Features

* **Lightweight**: only a few KB download
* **Automated**: works with no additional logic on the client
* **Independent**: no other dependencies required
* **Standards-compliant**: following existing conventions of CSS/HTML5
* **Multi-format**: add multiple video URLs for cross-browser support


## Examples

* [Basic demo](http://rawgit.com/makesites/css-background-video/master/examples/basic.html)
* [Auto-parse on page load](http://rawgit.com/makesites/css-background-video/master/examples/autoparse.html)
* [Fixed hero](http://rawgit.com/makesites/css-background-video/master/examples/fixed.html)
* [Parallax hero](http://rawgit.com/makesites/css-background-video/master/examples/parallax.html)
* [Fade-in effect](http://rawgit.com/makesites/css-background-video/master/examples/fade-in.html)
* [Media Queries](http://rawgit.com/makesites/css-background-video/master/examples/media-queries.html)


## Install

Using npm:
```
$ npm install css-background-video
```

Using bower:
```
$ bower install css-background-video
```


## Usage

The shim works with the traditional css attribute ```background``` where you define the urls of the videos:
```
.selector {
	background: url(/path/to/video-url.mp4), url(/path/to/video-url.webm), url(/path/to/video-url.ogv);
}
```
To utilize those attributes, initialize the logic that's saved in the global namespace manually, usually after all the have markup has been rendered.
```
var Shim = css['background-video'];
new Shim();
```
You can also let the plugin automatically execute ```onload``` by creating adding the following global var:
```
css = css || {};
css['background-video'] = true;
```
Instead of a boolean you can define an object, which will be used as the initialization options.

## Options

* **attribute** (string, default: "background"): the attribute to lookup for the video URLs. Usually doesn't need to change, although come handy if there is significant latency parsing the styles.

* **autoparse** (boolean, default: true): if the script will try to parse the existing styles automatically, to lookup for video URLs

* **className** (string, default: "css-background-video"): the class name used in the injected stylesheet to target the video element styling. If the default name is conflicting with other elements in your UI, you can change it with this option.

* **position** (string, default: "absolute"): How the video element is positioned related to its container, following regular CSS conventions. Acceptable options: absolute, fixed, relative.


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Originally inspired by the jQuery plugin [videoBG](https://github.com/sydlawrence/jquery.videoBG) by Syd Lawrence

Distributed through [Makesites.org](http://makesites.org/)

### License

Released under the [Apache License v2.0](http://www.makesites.org/licenses/APACHE-2.0)
