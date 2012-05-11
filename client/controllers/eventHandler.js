client.controllers.eventHandler = {
    "handleClick": function(ev){
        client.controllers.serverCommunicator.mouseClicked(this._getMousePos(ev));
    },
    "_getMousePos": function (event){
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;
        var currentElement = event.target;
    
        do{
            totalOffsetX += currentElement.offsetLeft;
            totalOffsetY += currentElement.offsetTop;
        }while(currentElement = currentElement.offsetParent);
        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;
    
        return {x:canvasX, y:canvasY}
    }
}