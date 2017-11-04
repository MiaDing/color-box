window.AudioContext = window.AudioContext || window.webkitAudioContext;
//reference: http://www.zhangxinxu.com/wordpress/2017/06/html5-web-audio-api-js-ux-voice/
function AudioManager(){
    this.audioCtx = new AudioContext();
    this.arrFrequency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
    this.start = 0;
    this.direction = 1;
}
AudioManager.prototype.init = function(){
    var self = this;
    this.oscillator = this.audioCtx.createOscillator();
    this.gainNode = this.audioCtx.createGain();
    this.oscillator.connect(self.gainNode);
    this.gainNode.connect(self.audioCtx.destination);
    this.oscillator.type = "sine";// square|triangle|sawtooth
}
AudioManager.prototype.playAudio = function(){
    var self = this;
    this.init();
    this.frequency = this.arrFrequency[this.start];
    this.start += this.direction;
    if(this.start >= this.arrFrequency.length || this.start < 0) {
        this.direction *= -1;
        this.start += this.direction;
    }
    this.oscillator.frequency.value = this.frequency;
    self.gainNode.gain.setValueAtTime(0, self.audioCtx.currentTime);
    self.gainNode.gain.linearRampToValueAtTime(1, self.audioCtx.currentTime + 0.001);
    self.oscillator.start(self.audioCtx.currentTime);
    self.gainNode.gain.exponentialRampToValueAtTime(0.001, self.audioCtx.currentTime + 0.05);
    this.oscillator.stop(self.audioCtx.currentTime + 0.05);
};
AudioManager.prototype.sleep = function(sleepTime){
    var currentTime = new Date().getTime();
    while(new Date().getTime() < currentTime + sleepTime);
};
