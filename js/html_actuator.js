function HTMLActuator(){
    this.gridContainer = document.querySelectorAll(".grid-cell");
    this.scoreContainer = document.querySelector(".score-container");
    this.bestContainer = document.querySelector(".best-container");
    this.messageContainer = document.querySelector(".game-message");
    this.progressContainer = document.querySelector(".progress-container");
    this.score = 0;
}
HTMLActuator.prototype.actuate = function(grid, metadata){
    var self = this;
    window.requestAnimationFrame(function(){
        for(var i = 0; i < self.gridContainer.length; i++){
            self.clearContainer(self.gridContainer[i]);
        }
        grid.cells.forEach(function(col){
            col.forEach(function(cell){
                if(cell) self.addTile(cell, grid.size);
             });
        });
        self.updateScore(metadata.score);
        self.updateBestScore(metadata.bestScore);
        if(metadata.over){
            self.message(metadata);
        }
    });
};
HTMLActuator.prototype.clearContainer = function(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
};
HTMLActuator.prototype.addTile = function(tile, size){
    var self = this;
    var wrapper = document.createElement("div");
    var position = {x: tile.x, y: tile.y};
    var classes = ["tile", "tile-" + tile.color, "position-" + position.x + "-" + position.y];
    if(tile.match){
        classes.push("tile-move");
    }
    this.applyClasses(wrapper, classes);
    this.gridContainer[position.x * size + position.y].appendChild(wrapper);
};
HTMLActuator.prototype.applyClasses = function(ele, classes){
    ele.setAttribute("class", classes.join(" "));
};
HTMLActuator.prototype.updateScore = function(score){
    this.clearContainer(this.scoreContainer);
    var different = score - this.score;
    this.score = score;
    this.scoreContainer.textContent = this.score;
    if(different > 0){
        var addition = document.createElement("div");
        addition.classList.add("score-addition");
        addition.textContent = "+" + different;
        this.scoreContainer.appendChild(addition);
    }
};
HTMLActuator.prototype.updateBestScore = function(bestScore){
    this.bestContainer.textContent = bestScore;
};
HTMLActuator.prototype.message = function(metadata){
    this.messageContainer.classList.remove("fun-hidden");
    this.messageContainer.getElementsByTagName("span")[0].textContent = metadata.score;
    this.messageContainer.getElementsByTagName("span")[1].textContent = metadata.bestScore;
};
HTMLActuator.prototype.clearMessage = function(){
    this.messageContainer.classList.add("fun-hidden");
};
HTMLActuator.prototype.progressAppear = function(){
    this.progressContainer.classList.remove("fun-hidden");
};
