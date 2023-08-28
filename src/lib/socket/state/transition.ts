import { BehaviorIdle, StateTransition, type StateTransitionParameters } from "mineflayer-statemachine";
import type { Preparing, Processing, State } from "./state";
import type { StateHandler } from "./state.handler";

export type Condition<P extends State,C extends State> = (global: Map<String, any>, parent: P, child: C) => boolean
export type Consumer<P extends State,C extends State>  = (global: Map<String, any>, parent: P, child: C) => void
export abstract class Transition<P extends State,C extends State> extends StateTransition{
    readonly name: string;
    declare parent: P;
    declare child: C;
    private handler: StateHandler;
    ShouldTransition: Condition<P,C> = (g,p,c)=>false;
    OnTransition: Consumer<P,C> = (g,p,c)=>{};
    constructor(name: string, handler: StateHandler){
        super({
            parent: new BehaviorIdle,
            child: new BehaviorIdle,
            shouldTransition: ()=>this.ShouldTransition(this.handler.data, this.parent, this.child),
            onTransition: ()=>this.OnTransition(this.handler.data, this.parent, this.child)
        })
        this.name = name;
        this.handler = handler
    }
}

class ParentDoneTransition extends Transition<State & Processing,State>{
    constructor(handler: StateHandler){
        super("ParentDone", handler);
        this.ShouldTransition = (g,p,c)=>p.isDone;
        this.OnTransition = (g,p,c)=>{p.isDone = false};
    }
}
class ChildReadyTransition extends Transition<State,State & Preparing>{
    constructor(handler: StateHandler){
        super("ChildReady", handler);
        this.ShouldTransition = (g,p,c)=>c.ready;
    }
}