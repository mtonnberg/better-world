client.controllers.initer = {
    "init": function(){
        var _self = this;
        client.models.globals.frontBuffer = document.getElementById('c');
        var front = client.models.globals.frontBuffer;
        front.width = settings.width;
        front.height = settings.height;
        front.addEventListener('click', function(e){
            client.controllers.eventHandler.handleClick(e);
        });
        
        client.models.globals.frontContext = front.getContext('2d');
        /*
        this.pixelBuffer = this.frontContext.createImageData(1,1);
        this.pixelBufferData = this.pixelBuffer.data;*/
    }
}