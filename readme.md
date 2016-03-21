# CSS: background-video

An HTML5 shim to support background videos as a CSS attribute.


## Features

* **Lightweight**: only a few KB download
* **Automated**: works with no additional logic on the client
* **Independent**: no other dependencies required
* **Standards-compliant**: following existing conventions of CSS/HTML5
* **Multi-format**: add multiple video URLs for cross-broser support

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

Initialize the classes that's saved in the global namespace manually, usually after all the have markup has been rendered.
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


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Originally inspired by the jQuery plugin [videoBG](https://github.com/sydlawrence/jquery.videoBG) by Syd Lawrence

Distributed through [Makesites.org](http://makesites.org/)

### License

Released under the [Apache License v2.0](http://www.makesites.org/licenses/APACHE-2.0)
