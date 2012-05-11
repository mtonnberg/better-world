
exports.get = function(){
    var logicHandler = {
        "ball": null,
        "balls": [],
        "Classes": {
            "Ball": require('./logicHandler/Ball')
        },
        "init": function(){
            var _self = this;
            var ball = _self.Classes.Ball.create();
            _self.balls = [ball];
            function update(){
                _self.updateState();
            }
            var updateLoop = setInterval(update, 15);
        },
        "updateState": function(){
            for(var i = this.balls.length;i--;){
                this.balls[i].updateState();
            }
        },
        "getState": function(){
            return {
                balls: this._getBallsState()
            }
        },
        "onClick": function(client, point){
            var _self = this;
            var ball = _self.Classes.Ball.create();
            ball.setPos(point);
            _self.balls.push(ball);
        },
        "_getBallsState": function(){
            var ballsState = [];
            for(var i = this.balls.length;i--;){
                ballsState.push(this.balls[i].getState());
            }
            return ballsState;
        }
    }
    return logicHandler;
}