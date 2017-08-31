var util                      = require('util');
var castv2Cli                 = require('castv2-client');
var RequestResponseController = castv2Cli.RequestResponseController;

function CastdeckController(client, sourceId, destinationId) {
  RequestResponseController.call(this, client, sourceId, destinationId, 'urn:x-cast:org.firstlegoleague.castDeck');
  this.once('close', onclose);
  var self = this;
  function onclose() {
    self.stop();
  }
}

util.inherits(CastdeckController, RequestResponseController);

CastdeckController.prototype.load = function(url) {
  // TODO: Implement Callback

  var data =   {
      url:url,
      rotation: 0,
      zoom: 1,
      aspect: "native",
      overscan: [0,0,0,0],
      transition: "fade",
      duration: 10
  };

  this.request(data);
};

module.exports = CastdeckController;
