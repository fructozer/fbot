import { writable, type Readable, type Writable, derived, readable } from "svelte/store"
import { Socket, io } from "socket.io-client";
import { ConsoleLogger } from "./console";
import { BotInventory } from "./inventory";
import type { CookieHandler } from "./cookie.handler";
import { BotTask, BotTaskList } from "./task";

const ENDPOINT = 'http://localhost:3000';

export interface ManagerData {
    bots: Writable<string[]>,
    current: Writable<string>,
    sections: Map<string,BotSection>,
    tasks: Writable<BotTaskList>
}
export class BotManager{
    private bots: Writable<string[]> = writable([])
    private sections: Map<string,BotSection> = new Map()
    private currentSection: Writable<string> = writable("")
    private taskList: Writable<BotTaskList> = writable(new BotTaskList());
    private cookie: CookieHandler;
    constructor(cookie: CookieHandler){
        this.taskList.update((current) => {
            current.writer = this.taskList;
            return current;
        })
        this.cookie = cookie
        this.load()
    }

    async load(){
        this.bots.set(await this.cookie.getArray('bots'))
        this.bots.subscribe(r => this.cookie.setArray('bots', r))
        this.currentSection.set(await this.cookie.getString('current'))
        this.currentSection.subscribe(r => this.cookie.setString('current', r))
        const tasks = (await this.cookie.getArray('tasks')).map(BotTask.fromString)
        this.taskList.update((current) => {
            current.tasks = tasks;
            return current;
        })
        this.taskList.subscribe(r => this.cookie.setArray('tasks', r.tasks.map(t => t.toString())))
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
            sections: this.sections,
            tasks: this.taskList
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
    version = '1.16.5'
    inventory = writable(new BotInventory(this))
    tasks: any;
    constructor(username: string){
        // SetCookie("username", username)
        this.io = io(ENDPOINT, {query:{
            name:username
        }})
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
            ["host", "port", "isOnline", "location", 'version', 'inventory']
        )
        this.host.set(query[0])
        this.port.set(query[1])
        this.isOnline.set(query[2])
        this.position.set(query[3])
        this.version = query[4]
        const inv = new BotInventory(this)
        inv.load(query[5])
        this.inventory.set(inv)

    }
    execute(method: string, arg:any[]=[]){
        return this.io.emitWithAck("execute", method, arg)
    }
    chat(msg: string){
        if (msg.startsWith("!")) {
            try {eval(msg.slice(1))}
            catch (e){}
            return
        }
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