function Grid(size){
    this.size = size;
    this.cells = this.empty();
}
Grid.prototype.empty = function(){
    var cells = [];
    for (var x = 0; x < this.size; x++){
        var row = cells[x] = [];
        for (var y = 0; y < this.size; y++){
            row.push(null);
        }
    }
    return cells;
};
Grid.prototype.randomAvailableCell = function(){
    var cells = this.availableCells();
    if(cells.length){
        return cells[Math.floor(Math.random() * cells.length)];
    }
};
Grid.prototype.availableCells = function(){
    var cells = [];
    this.eachCell(function(x, y, tile){
        if(!tile) {
            cells.push({x: x, y: y});
        }
    });
    return cells;
};
Grid.prototype.eachCell = function(callback){
    for(var i = 0; i < this.size; i++){
        for(var j = 0; j < this.size; j++){
            callback(i, j, this.cells[i][j]);
        }
    }
};
Grid.prototype.cellAvailable = function(cell){
    return !this.cellContent(cell);
};
Grid.prototype.cellOccupied = function(cell){
    return !!this.cellContent(cell);
};
Grid.prototype.cellContent = function(cell){
    if(this.withinBounds(cell)){
        return this.cells[cell.x][cell.y];
    }else {
        return null;
    }
};
Grid.prototype.cellMatchedColor = function(first, second){
    return first.color === second.color;
}
Grid.prototype.withinBounds = function(position){
    return position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;
};
Grid.prototype.insertTile = function(tile){
    this.cells[tile.x][tile.y] = tile;
};
Grid.prototype.removeTile = function(tile){
    this.cells[tile.x][tile.y] = null;
};
