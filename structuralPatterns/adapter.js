/*Adapter Design Pattern is a pattern that allows two incompatible interfaces to work together by creating a wrapper (adapter) that translates one interface into another.

Adapter = a bridge that makes old things work with new things.
*/

//legacy
class OldMusicPlayer{
    startPlay(){
        console.log("...the music player has started playing");
        
    }
}

class NewMusicPlayer{
    play(){
        console.log("...the new music player has started playing");
    }
}

class AdapterMusicPlayer {
    constructor(music){
        this.music = music;
    }
    play(){
        this.music.startPlay();
    }
}
const a = new NewMusicPlayer();
playMusic(a);

const b = new AdapterMusicPlayer(new OldMusicPlayer());
playMusic(b);

function playMusic(music){
    music.play();
}

/*
Adapter caching -> It is possible that multiple components use this adapter instance but this returns always one thing. So its better to cache which can be achieved using singleton pattern.
*/
class OldMusicPlayer1{
    startPlay(){
        console.log("...singleton the music player has started playing");
        
    }
}

class NewMusicPlayer1{
    play(){
        console.log("...singleton the new music player has started playing");
    }
}
class AdapterMusicPlayer1 {
    constructor(music){
        if(this.constructor.instance){
            return this.constructor.instance;
        }
        this.music = music;
        this.constructor.instance = this;
    }
    play(){
        this.music.startPlay();
    }
}

const a1 = new NewMusicPlayer1();
playMusic1(a1);

const b1 = new AdapterMusicPlayer1(new OldMusicPlayer1());
playMusic(b1);

const b2 = new AdapterMusicPlayer1(new OldMusicPlayer1());
playMusic(b2);

console.log("is b1 === b2", b1===b2);

function playMusic1(music){
    music.play();
}