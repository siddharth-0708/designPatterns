//Using observables - usecase of single event
//In this case what if we would have tajken different events for each player? It wont work because that event needs to be listened everywhere for all players. so I have 3 handlers with 3 callbacks but each point to different instance of class. There we check the instance and source.

class ChatEvent {
    constructor(){
        this.handlers = new Map();
        this.count = 0;
    }
    subscribe(handler){
        this.count++;
        this.handlers.set(this.count, handler);
        return this.count;
    }
    unsubscribe(id){
        this.handlers.delete(id);
    }
    fire(source, params){        
        this.handlers.forEach((v, k) => {
            v(source, params)
        });
    }
}

class ChatScreen {
    constructor(player){
        this.showMessage(`...${player} has joined the chat`);
    }
    showMessage(message){
        console.log(message);
    }   
}

class Player {
    constructor(player, chatEvent, ChatScreen){
        this.name = player;
        this.chatEvent = chatEvent;
        this.chatScreen = ChatScreen;
        this.id = this.chatEvent.subscribe(this.displayChatMessages.bind(this));
    }
    displayChatMessages(source, params){
        // console.log("...>> source is ", source.name, " current class is ", this.name);
        
        if(source.name !== this.name){
            this.chatScreen.showMessage(`chat screen of ${this.name}: ${params.message}`)
        }
    }
    sendChatMessage(message){ 
        this.chatScreen.showMessage(`...${this.name}: ${message}`)
        this.chatEvent.fire(this, {message: message});
    }
    stopChatMessages(){
        this.chatScreen.showMessage(`...${this.name}: ${"left the chat"}`)
        this.chatEvent.unsubscribe(this.id);
    }

}

const chatEvent  = new ChatEvent();
const player1 = new Player("siddharth", chatEvent, new ChatScreen("siddharth"));
const player2 = new Player("chaitanya", chatEvent, new ChatScreen("chaitanya"));
const player3 = new Player("cashew", chatEvent, new ChatScreen("cashew"));

player1.sendChatMessage("hey guys how are youu?");

player2.sendChatMessage("bhooki bhooki");

player3.sendChatMessage("bow boww");
player3.stopChatMessages();

player1.sendChatMessage("cashew snaks khane chala gaya");
