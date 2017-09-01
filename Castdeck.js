var util              = require('util');
var castv2Cli         = require('castv2-client');
var Application       = castv2Cli.Application;
//var MediaController   = castv2Cli.MediaController;
var CastdeckController = require('./CastdeckController');


function Castdeck(client, session) {
  Application.apply(this, arguments);

  //this.media = this.createController(MediaController);
  this.castdeck = this.createController(CastdeckController);

  this.castdeck.on('status', onstatus);

  var self = this;

  function onstatus(status) {
    self.emit('status', status);
  }

}

Castdeck.APP_ID = '4EC978AD';

util.inherits(Castdeck, Application);

Castdeck.prototype.getStatus = function(callback) {
  this.media.getStatus.apply(this.media, arguments);
};

Castdeck.prototype.load = function(videoId) {
  this.castdeck.load.apply(this.castdeck, arguments);
};

Castdeck.prototype.play = function(callback) {
  this.media.play.apply(this.media, arguments);
};

Castdeck.prototype.pause = function(callback) {
  this.media.pause.apply(this.media, arguments);
};

Castdeck.prototype.stop = function(callback) {
  this.media.stop.apply(this.media, arguments);
};

Castdeck.prototype.seek = function(currentTime, callback) {
  this.media.seek.apply(this.media, arguments);
};

module.exports = Castdeck;
