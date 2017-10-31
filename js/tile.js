function Tile(position, color){
    this.x = position.x;
    this.y = position.y;
    this.color = color;
    this.match = false;
}
Tile.prototype.serialize = function(){
    return {
        position : {
            x : this.x,
            y : this.y
        },
        color : this.color
    };
};
