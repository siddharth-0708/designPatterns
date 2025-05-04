//A component that facilitates communication between other components without them neccessarily being aware of each other or having direct (references) access to each other.

//Maybe do after observer?

class Event {
    constructor(){
        this.handlers = new Map();    
        this.count = 0; // for unsubscribe
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
        this.handlers.forEach((v,k)=>{
            v(source,params);
        })
    }
}

class GoalMediator {
    constructor(){
        this.goalEvent = new Event();
        this.subId = -1;
    }
    goalScored(source, params){
        this.goalEvent.fire(source, params);
    }
    goalListener(handler){
        this.subId = this.goalEvent.subscribe(handler);
    }
    goalListenCancel(){
        this.goalEvent.unsubscribe(this.subId);
    }
}
class Player {
    constructor(name, club, goalMediator){
        this.name = name;
        this.club = club;
        this.goalSender = goalMediator;
        /*
        This is the property we need to listen for a change. so fire event after this changes.
        But to attain mediator pattern we need to have a mediator for the events and dont create event instance here itself.
        */
        this.goals = 0;
    }
    scoredGoal(param){
        //fire event
        this.goals++;
        this.goalSender.goalScored(this, param);
    }
}

class Coach{
    constructor(name, goalMediator){
        this.name = name;
        goalMediator.goalListener(this.goalScored.bind(this))
        //coach wants to listen if his student scored goal
    }
    goalScored(source, params){
        console.log("coach says my player has score the goal ", source.name , " of club ", source.club , " In place ", params.location);
    }
}

class Club {
    constructor(name, goalMediator){
        this.name = name;
        goalMediator.goalListener(this.goalScored.bind(this))
        //club wants to listen of the player of its club is eligibile for captaincy
    }
    goalScored(source, params){
        if(source.club === this.name){            
            if(source.goals > 2){
                console.log(`player ${source.name} is eligible for captaincy with goals `, source.goals);
                
            }
        }
    }
}

//Q) check what if we have multiple players then we want shared event or for every player new goal mediator:
//Ans: No, each player will have seperate event instance because the event fire does not care about who fired the event. So it will throw 2 times for same instance (suppose 2 instance of player uses same goal mediator). Because handler will have 2 callback function and we just pass source of the first instance on entire loop. so its of no use.
const goalMediator1 = new GoalMediator();
const goalMediator2 = new GoalMediator();

const player1 = new Player("siddharth", "Hyderabad", goalMediator1);
const player2 = new Player("Rohit", "chennai", goalMediator2);

const coach1 = new Coach("cashew", goalMediator1);

const club1 = new Club("Hyderabad", goalMediator1);
const club2 = new Club("chennai", goalMediator2);

// player --> mediator --> coach, club- there is no link between player and coach, club and the event

player1.scoredGoal({location: "spain"});
player1.scoredGoal({location: "italy"});
player1.scoredGoal({location: "spain"});
player1.scoredGoal({location: "India"});
player1.scoredGoal({location: "USA"});


player2.scoredGoal({location: "germany"});
player2.scoredGoal({location: "antartica"});
player2.scoredGoal({location: "australia"});
player2.scoredGoal({location: "china"});