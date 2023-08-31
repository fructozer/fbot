export class BotItem{
    itemId = 0
    itemCount = 0
    nbtData = undefined
    version: string;
    constructor(data: {present:boolean, itemId?:number, itemCount?:number, nbtData?:any}, version="1.20"){
        this.version = version
        if (!data.present) return;
        this.itemId = data.itemId!;
        this.itemCount = data.itemCount!;
        this.nbtData = data.nbtData;
    }
}
