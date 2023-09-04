import type { Writable } from "svelte/store";

export interface BotTask{
    name: string;
    description: string;
    script: string;
    status: string;
}
export class BotTask implements BotTask{
    constructor(name: string, description: string, script: string, status: string){
        this.name = name;
        this.description = description;
        this.script = script;
        this.status = status;
    }
    public toString(){
        return [this.name, this.description, this.script, this.status].join(";;;");
    }
    public static fromString(str: string){
        const plitted = str.split(";;;");
        return new BotTask(plitted[0], plitted[1], plitted[2], plitted[3]);
    }
}

export class BotTaskList{
    public tasks: BotTask[] = [];
    public writer: Writable<BotTaskList> | undefined;
    //create task
    public createTask(task: BotTask){
        this.tasks.push(task);
        this.update();
    }
    public removeTask(task: BotTask){
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.update();
    }
    public update(){
        this.writer?.set(this);
    }
}