var util                      = require('util');
var castv2Cli                 = require('castv2-client');
var RequestResponseController = castv2Cli.RequestResponseController;

function CastdeckController(client, sourceId, destinationId) {
  RequestResponseController.call(this, client, sourceId, destinationId, 'urn:x-cast:org.firstlegoleague.castDeck');
  
  this.currentSession = null;

  this.once('close', onclose);
  this.on('message',onmessage)
  
  var self = this;
  
  function onclose() {
    self.removeListener('message', onmessage);
    self.stop();
  }
  
  function onmessage(data, broadcast) {
    debug(util.inspect(data))
    if(data.type === 'MEDIA_STATUS' && broadcast) {
      var status = data.status[0];
      // Sometimes an empty status array can come through; if so don't emit it
      if (!status) return;
      self.currentSession = status;
      self.emit('status', status);
    }
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

CastdeckController.prototype.getStatus = function(callback) {
  var self = this;

  this.request({ type: 'GET_STATUS' }, function(err, response) {
    if(err) return callback(err);
    var status = response.status[0];
    self.currentSession = status;
    callback(null, status);
  });
};


module.exports = CastdeckController;
