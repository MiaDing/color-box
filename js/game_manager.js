function GameManager(size, Actuator, StorageManager, ClickEvent,  AudioManager){
    this.size = size;
    this.actuator = new Actuator;
    this.storageManager = new StorageManager;
    // this.storageManager.clearBestScore();
    this.clickEvent = new ClickEvent;
    this.flag = false;//the state of click error
    this.speed = 30;
    this.during = 30000;
    this.startTiles = 30;// 5 colors * 6
    this.color = ["red", "orange", "green", "blue", "pink"];
    this.setup();
    this.clickEvent.on("restart", this.restart.bind(this));
    this.clickEvent.on("match", this.match.bind(this));
}
GameManager.prototype.restart = function(){
    this.actuator.clearMessage();
    this.setup();
};
GameManager.prototype.setup = function(){
    this.grid = new Grid(this.size);// 8 dimensions array
    this.score = 0;
    this.bestScore = this.storageManager.getBestScore();
    this.over = false;
    this.addStartTiles();
    this.actuate();// update
    this.showProgress();
};
GameManager.prototype.showProgress = function() {
    var self = this;
    this.progress = document.querySelector(".progress-container .progress-content");
    this.width = 100;
    this.progress.setAttribute("style", "width: 100%");
    // console.log(this.progress.style.width)
    var timer = setInterval(function(){
        self.width -= 100 / ( self.during / self.speed );
        if(self.flag == true){
            self.width -= 3;
            self.flag = false;
        }
        self.progress.style.width = self.width + "%";
        if(self.width <= 0){
            clearInterval(timer);
            self.over = true;
            self.actuate();
        }
    }, self.speed);
};
GameManager.prototype.addStartTiles = function(){
    for(var i = 0; i < this.color.length; i++){
        for(var j = 0; j < this.startTiles / this.color.length; j++){
            this.addRandomTile(this.color[i]);
        }
    }
};
GameManager.prototype.addRandomTile = function(color){
    // *************
    var tile = null;
    tile = new Tile(this.grid.randomAvailableCell(), color);//{x,y}
    this.grid.insertTile(tile);//this.grid.cells{[5,6]:{tile}}
};
GameManager.prototype.actuate = function(){
    this.clickEvent.listen(this.grid);
    if(this.bestScore < this.score){
        this.storageManager.setBestScore(this.score);
    }
    this.actuator.actuate(this.grid, {
        score: this.score,
        bestScore: this.storageManager.getBestScore(),
        over: this.over
    });
};
GameManager.prototype.match = function(pos){//position-x-y, pos => {x, y}
    //****************
    var matchedState = false;
    console.log("clicked cell posX: " + pos.x + ",poxY: " + pos.y);
    var matchedCells = this.findBoundCells(pos);
    if(matchedCells.length >= 2){
        for(var i = 0; i < matchedCells.length - 1; i++){
            for(var j = i + 1; j < matchedCells.length; j++){
                if(this.grid.cellMatchedColor(matchedCells[i], matchedCells[j])){
                    matchedState = true;
                    this.updateCellState(matchedCells[i], matchedCells[j]);
                }
            }
        }
    }else this.flag = true;
    if(matchedState){
        for(var i = 0; i < matchedCells.length; i++){
            if(this.grid.cells[matchedCells[i].x][matchedCells[i].y].match == true){
                this.grid.removeTile(matchedCells[i]);
            }
        }
        this.score = this.startTiles - (Math.pow(this.size, 2) - this.grid.availableCells().length);
        this.actuate();
    }else this.flag = true;
    self.audioManager = new AudioManager();
    self.audioManager.palyAudio(this.flag);

};
GameManager.prototype.updateCellState = function(){
    var self = this;
    for(var i = 0; i < arguments.length; i++) {
        self.grid.cells[arguments[i].x][arguments[i].y].match = true;
    }
};
GameManager.prototype.findBoundCells = function(cell){// cell => this.grid.cells[][] = null
    var matchedCells = [];
    var direction = [[0, 1], [1, 0], [0, -1], [-1,0]];// up, right, down, left
    var newPos;
    for(var i = 0; i < direction.length; i++){
        newPos = cell;
        do {
            newPos = {x: parseInt(newPos.x) + parseInt(direction[i][0]), y: parseInt(newPos.y) + parseInt(direction[i][1])};
            if(this.grid.cellOccupied(newPos)){
                newPos.color = this.grid.cells[newPos.x][newPos.y].color;
                matchedCells.push(newPos);
                break;
            }
        }while (this.grid.withinBounds(newPos))
    }
    return matchedCells;
};
