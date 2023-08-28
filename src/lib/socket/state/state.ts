import type { StateBehavior } from "mineflayer-statemachine";
import type { Transition } from "./transition";
import type { StateHandler } from "./state.handler";
import { TargetPlayer } from "./target";
import type { Player } from "mineflayer";


export abstract class State implements StateBehavior{
    // assets
    stateName: string;
    active: boolean = false;
    handler: StateHandler;

    // events
    onStateEntered?: (() => void) | undefined;
    onStateExited?: (() => void) | undefined;
    update?: (() => void) | undefined;
    constructor(name: string, handler: StateHandler){
        this.stateName = name
        this.handler = handler
    }
    connect(other: State, transition: Transition<any,any>){
        transition.parent = this
        transition.child = other
    }
}

// INTERFACE
export interface Processing{isDone: boolean}
export interface Preparing{get ready(): boolean}
export interface Targeting{target(): void}

// STATES
export class Idle extends State{
    constructor(handler: StateHandler){
        super("Idle", handler)
    }
}

export class TargetNearestPlayer extends State implements Preparing{
    
    constructor(handler: StateHandler){
        super("TargetNearestPlayer", handler);
        this.onStateEntered = ()=>{
            const players = this.handler.bot.players
            const names = Object.keys(players)
            const currentPos = handler.bot.entity.position
            let lim = handler.data.get("active-radius") | 256
            let sel: Player|undefined
            names.forEach(n=>{
                if (n == handler.bot.username) return
                const pos = players[n].entity.position
                const dis = pos.distanceTo(currentPos)
                if (dis<lim) sel = players[n] 
            })
            if (sel==undefined) return
            handler.target = new TargetPlayer(sel)
        }
    }
    get ready(): boolean {
        return Object.keys(this.handler.bot.players).length>0
    }
}

export class GotoTarget extends State implements Processing, Preparing{
    isDone: boolean = false;
    constructor(handler: StateHandler){
        super("goto", handler);
        this.onStateEntered = this.onEnter
    }
    get ready(): boolean {
        return this.handler.target.isLocable()
    }
    async onEnter(){
        const target = this.handler.target;
        if (!target.isLocable()) {
            this.isDone = true;
            return;
        }
        const pos = target.getPosition()
        await this.handler.manager.gotoVec(pos)
        this.isDone = true
    }
}
