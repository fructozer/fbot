import { ids, names } from "./itemdata";

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
    async getLore(){
        let version = this.version
        let lore = []
        try {//@ts-ignore
        lore = this.nbtData.value.display.value.Lore.value.value} catch (e) {}
        const result = lore.map(async (text:string)=>parse(version, text))
        return await Promise.all(result)
    }
    async getName(){
        let version = this.version
        let text = null
        try {//@ts-ignore
        text = this.nbtData.value.display.value.Name.value} catch (e) {}
        const id = ids(version)[this.itemId]
        text = text || names(version)[id] ||`id: ${this.itemId}`
        return await parse(version, text)
    }
}
async function parse(version:string, text:string){
    const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({text, version}),
        headers: {'Content-Type': 'application/json'}
    });
    const json = await response.json();
    return json.result;
}
