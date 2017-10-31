function FunGame(){
    this.calculater = "+";
    this.addendContainer = null;
    this.addend = [];
}
FunGame.prototype.getRandomNum = function(){
    var self = this;
    var len = this.addendContainer.length;
    for(var i = 0; i < len; i++){
        Array.prototype.push.call(this.addend, self.randomNum());
    }
};
FunGame.prototype.randomNum = function(){
    return Math.floor(Math.random() * 100);
};
FunGame.prototype.getAddendContainer = function(){
    this.addendContainer = document.querySelectorAll(".fun-addend");
    return this.addendContainer;
};
FunGame.prototype.displayAddend = function(){
    this.getAddendContainer();
    this.getRandomNum();
    for(var i = 0, j = 0; i < this.addend.length, j < this.addendContainer.length;){
        this.addendContainer[j++].textContent = this.addend[i++];
    }
};
FunGame.prototype.calculate = function(){
    var result;
    result = this.addend[0];
    // console.log("calculate:" + this.addend);
    for(var i = 1; i < this.addend.length; i++){
        result += this.calculater + this.addend[i];
    }
    try {
        eval(result);
        return eval(result);
    }
    catch(error){
        return "error input";
    }
};
function FunGameManager(aboveGame){
    this.funGame = new aboveGame();
    this.funGame.displayAddend();
    this.funContainer = document.querySelector(".fun-container");
    this.funGameMessage = document.querySelector(".fun-won");
    this.funGameSubmit = document.querySelector(".fun-submit");
    this.oInput = this.funGameSubmit.querySelector("input:first-child");
    this.oSubmit = this.funGameSubmit.querySelector("input:last-child");
    this.result = false;// whether the state of FumGame is hidden
};
FunGameManager.prototype.displayMessage = function(res){
    if(this.checkEqual(res)){
        this.funContainer.classList.add("fun-hidden");
        this.funGameMessage.classList.remove("fun-hidden");
    }else{
        alert("error, need to enter again");
        this.funGame.addend = [];
        this.funGame.displayAddend();//restart the randomNum()
    }
};
FunGameManager.prototype.clearMessage = function(){
    this.funGameMessage.classList.add("fun-hidden");
};
FunGameManager.prototype.checkEqual = function(res){
    if(res == this.funGame.calculate()) {
        this.result = true;
        return true;
    }else return false;
};
