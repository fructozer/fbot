import * as mineflayer from "mineflayer"
import * as pf from "mineflayer-pathfinder"
import type { Server } from "socket.io"
import type { Vec3 } from 'vec3';
import type { BotEvents } from "mineflayer"
import type { ChatMessage } from "prismarine-chat"
import { StateHandler } from "./state/state.handler"

export default class BotManager{
    stateHandler: StateHandler|null = null;
    bot: mineflayer.Bot|null = null
    host: string = 'example.com'
    port: number = 25565
    username: string
    reject: string = ''
    io: Server

    constructor(flayer:string, io: Server){
        this.username = flayer
        this.io = io;
    }
    setHost(host: string){
        this.host = host
    }
    getHost(){
        return this.host
    }
    setPort(port: number){
        this.port = port
    }

    get client(){
        if (this.bot==null) return null;
        return this.bot._client;
    }
    get socket(){
        if (this.client==null) return null;
        return this.client.socket;
    }
    get isOnline(){
        return this.socket!=null && this.socket.writable;
    }
    get location(){
        if (!this.isOnline) return {x:0,y:0,z:0}
        const p = this.bot?.entity.position;
        return {x:p?.x, y:p?.y, z:p?.z}
    }
    get health(){
        if (!this.isOnline) return 0;
        return this.bot?.health;
    }
    get food(){
        if (!this.isOnline) return 0;
        return this.bot?.food;
    }

    get inventory(){
        if (!this.isOnline) return null;
    }

    /** @returns {Promise<boolean>}*/
    async start(){
        let target: mineflayer.Bot
        try {
         target = this.bot = mineflayer.createBot({
            username: this.username,
            host: this.host,
            port: this.port,
            chatLengthLimit: 2000
        } as mineflayer.BotOptions)
        } catch (e) {return false}
        createMidware(this)
        return new Promise(resolve=>{
            const success = async ()=>{
                target.off("end",failed)
                // target.once("message", async (j, p)=>{
                //     target._client.write('name_item', {'name': 's'})
                //     target.clickWindow(2,0,0)
                // })
                await target.waitForTicks(1)
                resolve(true)
            }
            const failed = (reason: string)=>{
                target.off("login",success)
                resolve(false)
            }
            target.once("login", success)
            target.once("end", failed)
        })
    }

    end(){
        if (this.isOnline) this.bot?.end()
    }
    gotoVec(vec: Vec3){
        return this.goto(vec.x, vec.y, vec.z)
    }
    goto(x: number, y: number, z: number){
        if (!this.isOnline) return new Promise((e)=>{});
        return this.bot?.pathfinder.goto(new pf.goals.GoalBlock(x,y,z))
    }
    
    chat(message: string){
        if (!this.isOnline) return;
        if (message.startsWith('@')) {
            try {
                eval(message.slice(1))
            } catch (e) {}
            return
        }
        this.bot?.chat(message);
    }

    async tabComplete(message: string){
        return await this.bot?.tabComplete(message)
    }

}

function createMidware(manager: BotManager){
    const bot  = manager.bot
    const io   = manager.io
    const name = manager.username
    if (bot==null) return
    pass(manager, "login")
    pass(manager, "end")
    pass(manager, "move", manager.location)

    bot.on('message', (json: ChatMessage, position)=>{
        io.to(name).emit('message', json.toString(), position, json.toHTML())
    })
    manager.stateHandler = new StateHandler(manager)
}
function pass(manager:BotManager, event: keyof BotEvents, ...data:any){
    manager.bot?.on(event, ()=>{manager.io.to(manager.bot!.username).emit(event, ...data)})
}