import { writable, type Readable, type Writable, derived, readable } from "svelte/store"
import { Socket, io } from "socket.io-client";
import { ConsoleLogger } from "./console";

const ENDPOINT = 'http://localhost:3000';

export interface ManagerData {
    bots: Writable<string[]>,
    current: Writable<string>,
    sections: Map<string,BotSection>
}
export class BotManager{
    private bots: Writable<string[]>
    private sections: Map<string,BotSection> = new Map()
    private currentSection: Writable<string>
    constructor(){
        this.bots = writable(["funayd", "fbot", "demo"])
        this.currentSection = writable("funayd")
    }

    add(username: string){
        this.bots.update(current=>[...current, username])
    }
    remove(username: string){
        this.bots.update(current=>current.slice(current.indexOf(username), 1))
    }
    section(username: string){
        console.log("get section "+username)
        if (!this.sections.has(username))
        this.sections.set(username, new BotSection(username))
        return this.sections.get(username)!
    }

    getData(){
        return {
            bots: this.bots,
            current: this.currentSection,
            sections: this.sections
        } as ManagerData
    }
}
export interface SectionData{
    host: Writable<string>,
    port: Writable<string>
}
export interface Position{
    x: number,
    y: number,
    z: number
}
export const p0 = {x:0,y:0,z:0} as Position
export class BotSection{
    io: Socket;
    host: Writable<string> = writable("");
    port: Writable<string> = writable("");
    isOnline: Writable<boolean> = writable(false)
    position: Writable<Position> = writable(p0)
    logger: ConsoleLogger = new ConsoleLogger()
    sendhistory: string[] = []
    constructor(username: string){
        this.io = io(ENDPOINT, {query:{name:username}})
        this.load()
        this.host.subscribe(r =>{this.execute("setHost", [r])})
        this.port.subscribe(r =>{this.execute("setPort", [r])})
        this.io.on("login", ()=>{
            this.isOnline.set(true)
            this.load()
            console.log(`${username} is online`)
        })
        this.io.on("end", ()=>{
            this.isOnline.set(false)
            this.load()
            console.log(`${username} is offline`)
        })
        this.io.on("move", async ()=>{
            const query = await this.io.emitWithAck("get-data",["location"])
            this.position.set(query[0])
        })
        this.io.on('message', (json, position, html)=>{
            if (position == 'system' || position == 'chat'){
                this.logger.log(html)
            }
        })
    }
    async load(){
        const query = await this.io.emitWithAck("get-data", 
            ["host", "port", "isOnline", "location"]
        )
        this.host.set(query[0])
        this.port.set(query[1])
        this.isOnline.set(query[2])
        this.position.set(query[3])
    }
    execute(method: string, arg:any[]=[]){
        return this.io.emitWithAck("execute", method, arg)
    }
    chat(msg: string){
        this.execute("chat", [msg])
        if (msg!=this.sendhistory[this.sendhistory.length-1])
        this.sendhistory.push(msg)
    }
    start(){
        this.execute("start")
    }
    end(){
        this.execute("end")
    }
    async tab(msg: string){
        return await this.execute("tabComplete", [msg])
    }
}