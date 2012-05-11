client.controllers.serverCommunicator = {
    "urlToImgData": null,
    "socket": null,
    "setup": function(){
        
        var _self = this;
        _self.socket = io.connect('http://localhost:8888');
        _self.socket.on('updateClient', function (response) {
            _self.updateClientView(response.state);
            //console.log(data);
            //
        });
    },
    "mouseClicked": function(point){
        var _self = this;
        _self.socket.emit('mouseClicked', point);
    },
    "updateClientView": function(data){
                client.controllers.updater.update(data);
    }
}
client.controllers.serverCommunicator.setup();//TODO move this somewhere