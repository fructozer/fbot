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
}

export class BotTaskList{
    public tasks: BotTask[];
    constructor(tasks: BotTask[]){
        this.tasks = tasks;
    }
    //create task
    public createTask(task: BotTask){
        this.tasks.push(task);
    }
}