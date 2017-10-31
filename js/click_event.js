function ClickEvent (){
    this.restartButton = document.querySelector(".restart-button");
    this.retryButton = document.querySelector(".retry-button");
    this.gridButton = document.querySelectorAll(".grid-cell");
    this.events = [];
    this.restartListener(this.restartButton, this.retryButton);
    this.previousTime = 0;
}

ClickEvent.prototype.on = function(type, callback){//register
    if(!this.events[type]) this.events[type] = [];
    this.events[type].push(callback);
    // console.log(type + " is registered")
};
ClickEvent.prototype.trigger = function(type, data) {
    var callbacks = this.events[type];
    if(callbacks){
        callbacks.forEach(function(callback){
            callback(data);
            // console.log(callbacks + " is triggereds")
        })
    }
};
ClickEvent.prototype.listen = function(grid){
    var self = this;
    for(var i = 0; i < grid.cells.length; i++){
        for(var j = 0; j < grid.cells[i].length; j++){
            if(!grid.cells[i][j]){
                this.gridButton[ i * grid.size + j].addEventListener("click", function(event){
                    event.preventDefault();
                    var currTime = new Date().getTime();
                    if(currTime - self.previousTime > 500){
                        self.previousTime = currTime;
                        var posX = /[\d](?=\-\d)/g.exec(this.classList[1]);//exec return array["", index, length]
                        var posY = /[\d]$/g.exec(this.classList[1]);
                        self.trigger("match", {x : posX[0], y : posY[0]});
                    }
                });
            }
        }
    }
};
ClickEvent.prototype.restartListener = function(){
    var self = this;
    for(var i in arguments){
        arguments[i].addEventListener("click", function(event){
            event.preventDefault();
            self.trigger("restart");
        });
    }
};
