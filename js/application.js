window.requestAnimationFrame(function(){
    this.fun_game_manager = new FunGameManager(FunGame);
    var fun_self = this.fun_game_manager;
    this.fun_game_manager.oSubmit.onclick = function(){
        fun_self.displayMessage(fun_self.oInput.value);
        if(fun_self.result){
            var msgTimer = setTimeout(function(){
                fun_self.clearMessage();
                fun_self.game_manager = new GameManager(16, HTMLActuator, LocalStorageManager, ClickEvent, AudioManager);
            }, 2000);
        }
    };
});
