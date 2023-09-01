import { writable, type Writable } from "svelte/store";

export class ConsoleLogger{
    consoleLog: string[];
    output: Writable<string[]>;
    maxHistory: number;
    constructor(){
        this.consoleLog = []
        this.output = writable([])
        this.maxHistory = 100
    }
    log(message: string){
        message = message.replace(/§[0-9a-fk-or]/g,"")
        const l = this.consoleLog
        if (l.length+1 > this.maxHistory) l.splice(0,1)
        l.push(message)
        this.output.set(l)
    }
}