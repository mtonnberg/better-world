client.controllers.updater = {
    "update": function(state){
        var _self = this;
        var canvas = client.models.globals.frontBuffer;
        var ctx = client.models.globals.frontContext;
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#325FA2';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#000';
            ctx.beginPath();
        for(var i = state.balls.length;i--;){
            var ball = state.balls[i];
            ctx.arc(ball.x, ball.y, 10, 0, Math.PI*2, true); 
        }
        
            ctx.closePath();
        ctx.fill();
        _self._updateFps();
    },
    "_updateFps": function(){
        var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
        fps += (thisFrameFPS - fps) / fpsFilter;
        lastUpdate = now;
    }
}