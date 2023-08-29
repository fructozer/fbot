import Inventory from "../component/Inventory.svelte"

export type InventoryType = 
     "inventory"
    |"anvil"
    |"beacon"
    |"blast_furnace"
    |"brewing_stand"
    |"cartography_table"
    |"dispenser"
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
    |"generic_9x1"
    |"generic_9x2"
    |"generic_9x3"
    |"generic_9x4"
    |"generic_9x5"
    |"generic_9x6"
const getUrl = (n:string)=>`https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.1/assets/minecraft/textures/gui/container/${n}.png`
const genericGui = async (h: number)=>{
    return new Promise(resolve => {
        const url = getUrl("generic_54")
        const image = new Image()
        image.onload = async ()=>{
            const canvas = new OffscreenCanvas(256, h)
            const context = canvas.getContext("2d")!
            context.drawImage(image, 0, 0)
            const data = context.getImageData(0, 107, 176, 222)
            context.putImageData(data, 0, h-107)
            const blob = await canvas.convertToBlob({
                type: "image/png",
                quality: 1
            })
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            resolve(reader.result)
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
export type EntryType = "slot" | "text" 
export class InventoryEntry{
    declare type: EntryType
    declare pos:{x: number, y: number}
    declare source?:{x:number, y:number, w: number, h:number}
}
export class InventoryMeta{
    type: InventoryType
    constructor(type: InventoryType){
        this.type = type
    }
    get width(){
        return 176
    }
    get height(){
        switch (this.type){
            case "inventory":
            case "anvil":
            case "beacon":
            case "blast_furnace":
            case "brewing_stand":
            case "cartography_table":
            case "dispenser":
            case "enchanting_table":
            case "furnace":
            case "grindstone":
            case "horse":
            case "legacy_smithing":
            case "shulker_box":
            case "smithing":
            case "smoker":
            case "stonecutter": return 166
            case "hopper": return 133
            case "generic_9x1": return 132
            case "generic_9x2": return 150
            case "generic_9x3": return 168
            case "generic_9x4": return 186
            case "generic_9x5": return 204
            case "generic_9x6": return 222
        }
    }
    get url(){
        switch (this.type){
            case "inventory":
            case "anvil":
            case "beacon":
            case "blast_furnace":
            case "brewing_stand":
            case "cartography_table":
            case "dispenser":
            case "enchanting_table":
            case "furnace":
            case "grindstone":
            case "horse":
            case "legacy_smithing":
            case "shulker_box":
            case "smithing":
            case "smoker":
            case "stonecutter":
            case "hopper": return getUrl(this.type)
            case "generic_9x1": return genericGui(132)
            case "generic_9x2": return genericGui(150)
            case "generic_9x3": return genericGui(168)
            case "generic_9x4": return genericGui(186)
            case "generic_9x5": return genericGui(204)
            case "generic_9x6": return getUrl("generic_54")
        }
    }
}



