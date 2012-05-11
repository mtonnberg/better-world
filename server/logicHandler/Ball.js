exports.create = function(){
    return {
        "playgroundSize": 100,
        "_vel": {
            "x": Math.random()*2,
            "y": Math.random()*2
        },
        "_pos": {
            "x": Math.random()*100,
            "y": Math.random()*100
        },
        "updateState": function(){
            this._pos.x += this._vel.x;
            if(this._pos.x > this.playgroundSize || this._pos.x < 0){
                this._pos.x -= this._vel.x; //go back
                this._vel.x = -1 * this._vel.x;
            }
            
            this._pos.y += this._vel.y;
            if(this._pos.y > this.playgroundSize || this._pos.y < 0){
                this._pos.y -= this._vel.y; //go back
                this._vel.y = -1 * this._vel.y;
            }
        },
        "getState": function(){
            return this._pos;
        },
        "setPos": function(point){
            this._pos.x = point.x;
            this._pos.y = point.y;
        }
    }
}