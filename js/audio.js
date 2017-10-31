// window.AudioContext = window.AudioContext || window.webkitAudioContext;
function AudioManager(){
    this.audioCtx = new AudioContext();
    this.arrFrequencyTrue = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    this.arrFrequencyFalse = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50].reverse();
}
AudioManager.prototype.palyAudio = function(state){
    var self = this;
    this.startVolume = this.arrFrequencyTrue.length - 1;
    do {
        this.oscillator = this.audioCtx.createOscillator();// create yindiao; with property : frequency & type
        this.gainNode = this.audioCtx.createGain();//create sth to control volume
        this.oscillator.connect(self.gainNode);
        this.gainNode.connect(self.audioCtx.destination);//yangshengqi
        this.oscillator.type = "sine";// square|triangle|sawtooth

        this.frequency = state == true ? (this.arrFrequencyTrue[this.startVolume]) : (this.arrFrequencyFalse[this.startVolume]);
        this.startVolume = this.startVolume - 1;
        // console.log(this.frequency);
        this.oscillator.frequency.value = this.frequency;
        self.gainNode.gain.setValueAtTime(0, self.audioCtx.currentTime);
        self.gainNode.gain.linearRampToValueAtTime(1, self.audioCtx.currentTime + 0.001);
        self.oscillator.start(self.audioCtx.currentTime);
        self.gainNode.gain.exponentialRampToValueAtTime(0.001, self.audioCtx.currentTime);

        this.oscillator.stop(self.audioCtx.currentTime + 0.040);
        this.sleep(40);
        // console.log("timeout");

    }while(this.startVolume >= 0)
    self.gainNode.gain.setValueAtTime(0, self.audioCtx.currentTime);
    this.oscillator.stop(self.audioCtx.currentTime + 0.001);
    this.audioCtx.close();
};
AudioManager.prototype.sleep = function(sleepTime){
    var currentTime = new Date().getTime();
    while(new Date().getTime() < currentTime + sleepTime);
};
