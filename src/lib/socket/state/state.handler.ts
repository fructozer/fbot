import type { Bot } from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import type BotManager from "../bot.handler";
import { EmptyTarget, type Target } from "./target";
import { Idle, type State } from "./state";
import type { Transition } from "./transition";
import { 
    BotStateMachine, 
    NestedStateMachine
} from "mineflayer-statemachine";

export class StateHandler{
    private flayer: Bot;
    private botManager: BotManager;
    private stateMachine: BotStateMachine;
    private transitions: Transition<State,State>[] = [];
    private states: State[] = [];
    private nestedState: NestedStateMachine[] = [];
    private globalData: Map<string, any> = new Map()
    private currentTarget: Target = new EmptyTarget();
    private creator: Creator;
    constructor(manager: BotManager){
        this.creator = new Creator(this)
        this.botManager = manager
        this.flayer = manager.bot!;
        this.flayer.loadPlugin(pathfinder);
        const defaultBehavior = new Idle(this);
              defaultBehavior.stateName = "ROOT";
        this.states.push(defaultBehavior);
        this.nestedState.push(new NestedStateMachine(this.transitions, this.states[0]));
        this.stateMachine = new BotStateMachine(this.flayer, this.nestedState[0]);
        
        test(this)
    }
    get data(){return this.globalData}
    get bot(){return this.flayer}
    get manager(){return this.botManager}
    get target(){return this.currentTarget}
    get machine(){return this.stateMachine}
    set target(t){
        this.currentTarget = t
        this.stateMachine.emit("target-changed")
    }
}


function test(handler: StateHandler){
    handler.machine.rootStateMachine
}

class Creator{
    private handler: StateHandler;
    constructor(handler: StateHandler){
        this.handler = handler
    }
}




