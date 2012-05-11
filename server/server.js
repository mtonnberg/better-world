var server = {
    "logicHandler": require('./logicHandler').get(),
    "clients": 0,
    "bindSocketEvents": function(io){
        var _self = this;
        io.sockets.on('connection', function (socket) {
            var clientID = '' +_self.clients++;
            var client = {
                id: clientID
            }
            var loop = setInterval(function(){
                socket.emit('updateClient', {state: _self.logicHandler.getState()});
            }, 15);
            
            socket.on('mouseClicked', function (point) {
                console.log('client: ' +client.id + ' clicked');
                _self.logicHandler.onClick(client, point);
            });
            
            socket.on('disconnect', function () {
                clearInterval(loop);
            });
        });
    },
    "start": function(){
        var webServer = require('express').createServer();
        var io = require('socket.io').listen(webServer, { log: false });
        webServer.listen(8888);
        
        this.bindSocketEvents(io);
        this.logicHandler.init();
    }
}
server.start();