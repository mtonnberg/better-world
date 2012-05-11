var http = require("http");

function startExpress(){
    
    var fileSystem = require('fs');
    var webServer = require('express').createServer();
    var io = require('socket.io').listen(webServer, { log: false });
    
    io.sockets.on('connection', function (socket) {       
        setInterval(function(){
            socket.emit('updateClient', {data: targetFile}); 
            }, 15);
    });
    
    var logicHandler = require('./logicHandler');
    webServer.get('/user/:id/view', function(req, res){
        try{
            fileSystem.readFile(__dirname+'/state' +req.params.id +'_' + targetFile + '.png', function(err,data){
                if(err) {
                    console.error("Could not open file: %s", err);
                    process.exit(1);
                }
                res.header('Content-Type', 'image/png');
                res.header('Access-Control-Allow-Origin', '*');
                res.send(data);
            });
        }catch(err){};
        });
        webServer.get('/user/:id/view/id', function(req, res){
                res.header('Content-Type', 'application/json');
                res.header('Access-Control-Allow-Origin', '*');
                res.send('{"src": "http://127.0.0.1:8888/user/' +req.params.id +'/view"}');
        });
        webServer.get('/user/:id/events/mouseClicked', function(req, res){
                ball.velocity.x = Math.random()*20-10;//;-1* ball.velocity.x;
                ball.velocity.y = Math.random()*20-10;//-1* ball.velocity.y
                res.header('Content-Type', 'application/json');
                res.header('Access-Control-Allow-Origin', '*');
                res.send('{}');
        });
        webServer.listen(8888);
}
exports.start = startExpress;//start


var fs = require('fs');
bufferSize = 10;
bufferFile = 1;
targetFile = 0;


    var Canvas = require('canvas')
    , canvas = new Canvas(320, 320)
    , ctx = canvas.getContext('2d');

var ball = {
    pos: {x: 50, y:10},
    velocity: {x: 1, y: 1},
    move: function(){
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
}
function update(ctx){
    ball.move();
    var velocityChange = false;
    if(ball.pos.x > canvas.width || ball.pos.x < 0){
        ball.velocity.x = -1* ball.velocity.x;
        velocityChange = true;
    }
    if(ball.pos.y > canvas.height || ball.pos.y < 0){
        ball.velocity.y = -1* ball.velocity.y;
        velocityChange = true;
    }
    if(velocityChange){
        ball.move();
    }
    
    ctx.fillStyle = '#F00';
    ctx.strokeStyle = '#325FA2';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(ball.pos.x, ball.pos.y, 10, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
}
function redraw(){
    update(ctx);
    targetFile = canvas.toDataURL("image/png");
    setTimeout(redraw, 15);
};
redraw();