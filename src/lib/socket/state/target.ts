import type { Vec3 } from 'vec3'
import type { StateHandler } from './state.handler'
import type { Entity } from 'prismarine-entity'
import type { Player } from 'mineflayer'

export abstract class Target{
    isLocable(): this is Locable {return "getPosition" in this}
}

// Interface
export interface Locable{getPosition: ()=>Vec3}

// Class
export class EmptyTarget extends Target{}
export class TargetEntity extends Target implements Locable{
    readonly entityTarget: Entity
    constructor(entity: Entity){super(); this.entityTarget = entity}
    getPosition(){return this.entityTarget.position}
}

export class TargetPlayer extends TargetEntity{
    readonly player: Player
    constructor(player: Player){
        super(player.entity)
        this.player = player
    }
}


export class TargetPlayerByName extends TargetPlayer{
    constructor(handler: StateHandler, username: string){
        const players = handler.bot.players
        for (const name of Object.keys(players)) {
            if (name != username) continue;
            super(players[name])
        }
    }
}