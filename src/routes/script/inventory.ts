import type { BotSection } from "./bots"
import { inventory_id } from "./data"
import { BotItem } from "./item"

export type InventoryType = (
     "inventory"
    |"anvil"
    |"beacon"
    |"blast_furnace"
    |"brewing_stand"
    |"cartography_table"
    |"generic_3x3"
    |"enchanting_table"
    |"furnace"
    |"grindstone"
    |"horse"
    |"legacy_smithing"
    |"shulker_box"
    |"smithing"
    |"smoker"
    |"stonecutter"
    |"hopper"
    |"crafting"
    |"generic_9x1"
    |"generic_9x2"
    |"generic_9x3"
    |"generic_9x4"
    |"generic_9x5"
    |"generic_9x6"
    )
const getUrl = (n:string)=>`./mcgui/${n}.png`
const genericGui:(h: number)=>Promise<string> = async (h: number)=>{
    return new Promise(resolve => {
        const url = getUrl("generic_54")
        const image = new Image()
        image.crossOrigin = "anonymous"
        image.onload = async ()=>{
            const canvas = new OffscreenCanvas(256, 256)
            const context = canvas.getContext("2d")!
            context.drawImage(image, 0, 0)
            const data = context.getImageData(0, 107, 176, 222)
            context.putImageData(data, 0, h-115)
            const blob = await canvas.convertToBlob({
                type: "image/png",
                quality: 1
            })
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = ()=>{
                //@ts-ignore
                resolve(reader.result)
            }
        }
        image.src = url
    })
}
export interface Meta{
    width: number
    height: number
    url: (type: string)=>string
    entry?: InventoryEntry[]
}
export class InventoryEntry{
    declare name: string
    declare id: number
    declare pos:{x: number, y: number}
    declare size: {w: number, h: number}
}
function slot(id: number, x:number, y:number, w?:number, h?:number){
    const result = new InventoryEntry()
    result.name = "slot"
    result.id = id
    result.pos = {x:x, y:y}
    result.size = {w:w==undefined?18:w, h:h==undefined?18:h}
    return result
}
function slots(id:number, count: number, x:number, y:number, l?:number){
    l = l==undefined?9:l
    const result = []
    for (let i = 0; i < count; i++)
    result.push(slot(id+i, x+18*(i%l), y+18*Math.floor(i/l)))
    return result
}
function vault(id:number, x:number = 7, y:number=83){
    return [
        ...slots(id, 3*9, x, y),
        ...slots(id+3*9, 9, x, y+58)
    ]
}


export class InventoryMeta{
    type: InventoryType
    constructor(type: InventoryType){
        this.type = type
    }
    get width(){
        switch (this.type){
            case "beacon": return 230 
            default: return 176;
        }
        return 176
    }
    get height(){
        switch (this.type){
            case "beacon": return 219
            case "hopper": return 133
            case "generic_9x1": return 132
            case "generic_9x2": return 150
            case "generic_9x3": return 168
            case "generic_9x4": return 186
            case "generic_9x5": return 204
            case "generic_9x6": return 222
            default: return 166
        }
    }
    get url(){
        switch (this.type){
            case "generic_9x1": return genericGui(132)
            case "generic_9x2": return genericGui(150)
            case "generic_9x3": return genericGui(168)
            case "generic_9x4": return genericGui(186)
            case "generic_9x5": return genericGui(204)
            case "generic_9x6": return getUrl("generic_54")
            case "generic_3x3": return getUrl('dispenser')
            case "crafting": return getUrl('crafting_table')
            default: return getUrl(this.type)
        }
    }
    get slots(){
        switch (this.type) {
            case "inventory": return [
                slot(0, 153, 27),
                ...slots(1, 4, 97, 17, 2),
                ...slots(5, 4, 7, 7, 1),
                ...vault(9),
                slot(45, 76, 61)
            ]
            case "anvil": return [
                slot(0, 26, 46),
                slot(0, 75, 46),
                slot(0, 133, 46),
                ...vault(3)
            ]
            case "beacon": return [
                slot(0, 135, 109),
                ...vault(1, 35, 136)
            ]
            case "smoker":
            case "furnace":
            case "blast_furnace": return [
                slot(0, 55, 16),
                slot(0, 55, 52),
                slot(0, 111, 30, 26, 26),
                ...vault(3)
            ]
            case "brewing_stand": return [
                slot(0, 55, 50),
                slot(1, 78, 57),
                slot(2, 101, 50),
                slot(3, 78, 16),
                slot(4, 16, 16),
                ...vault(5)
            ]
            case "cartography_table": return [
                slot(0, 14, 14),
                slot(1, 14, 51),
                slot(2, 140, 34, 26, 26),
                ...vault(3)
            ]
            case "generic_3x3": return [
                ...slots(0, 9, 61, 16, 3),
                ...vault(9)
            ]
            case "enchanting_table": return [
                slot(0, 14, 46),
                slot(1, 34, 46),
                ...vault(2)
            ]
            case "grindstone": return [
                slot(0, 48, 18),
                slot(1, 48, 39),
                slot(2, 128, 33),
                ...vault(3)
            ]
            case "smithing": return [
                ...slots(0, 3, 7, 47),
                slot(3, 97, 47),
                ...vault(4)
            ]
            case "stonecutter": return [
                slot(0, 19, 32),
                slot(1, 138, 28, 26, 26),
                ...vault(2)
            ]
            case "hopper": return [
                ...slots(0, 5, 43, 19),
                ...vault(5, 7, 50)
            ]
            case "crafting": return [
                slot(0, 119, 30, 26, 26),
                ...slots(1, 9, 29, 16, 3),
                ...vault(10)
            ]
            case "generic_9x1": return genericSlot(1)
            case "generic_9x2": return genericSlot(2)
            case "generic_9x3": 
            case "shulker_box": return genericSlot(3)
            case "generic_9x4": return genericSlot(4)
            case "generic_9x5": return genericSlot(5)
            case "generic_9x6": return genericSlot(6)
            default: return[]
        }
    }

}
function genericSlot(a:number){
    return [
        ...slots(1, 9*a, 7, 17),
        ...vault(10, 7, 31+a*18)
    ]
}
export class BotInventory{
    section: BotSection
    type: InventoryType = "inventory"
    title: string = ""
    slots: BotItem[] = []
    constructor(section: BotSection){
        this.section = section
        if (this.section.io==undefined) return
        console.log("inventory id loading...")
        this.section.io.on("inventory",(name: string, data: any)=>{
            switch (name){
                case "close_window": 
                    this.p_closeWindow()
                    break;
                case "open_window": 
                    this.p_openWindow(data)
                    break;
                case "window_items": 
                    this.p_setContext(data)
                    break;
                case "craft_progress_bar": 
                    break;
                case "set_slot": 
                    this.p_setItem(data)
                    break;
            }
        })
    }
    getItem(index: number){
        if (index>=this.slots.length) return new BotItem({present: false})
        return this.slots[index]
    }

    private p_setItem(data:{item:any, slot:number}) {
        if (data.slot>=this.slots.length) return
        this.slots[data.slot] = new BotItem(data.item, this.section.version)
        this.update()
    }
    private p_setContext(data:{items:any[]}) {
        this.slots = data.items.map(d=>new BotItem(d, this.section.version))
        this.update()
    }
    private p_openWindow(data:{inventoryType: number, windowTitle: string}) {
            //@ts-ignore
            this.type = inventory_id[data.inventoryType]
            // this.title = loader("1,20").fromNotch(data.windowTitle).toHTML()
    }
    private p_closeWindow() {
        this.type = "inventory"
    }

    // update
    update(){
        this.section.inventory.set(this)
    }

}



