import { io, type Socket } from "socket.io-client";

const ENDPOINT = 'http://localhost:3000';

export class CookieHandler{
    cookie_id: string;
    io: Socket | undefined;
    constructor (cookie_id: string){
        this.cookie_id = cookie_id
        this.io = io(ENDPOINT, {query:{name:"api-cookie", id: cookie_id}})
    }
    async getRaw(field: string){
        const result: string = await this.io?.emitWithAck("get-data", field)
        return result
    }
    setRaw(field: string, value: string){
        console.log("set "+field+" to "+value)
        return this.io?.emit("set-data", field, value)
    }

    
    async getArray(field: string): Promise<string[]> {
        const result = await this.getRaw(field)
        if (result == null || result== '') return []
        return (JSON.parse(result))
    }
    setArray(field: string, value: string[]): void {
        if (value.length == 0) {
            this.setRaw(field, "")
            return
        }
        this.setRaw(field, JSON.stringify(value))
    }
    async getString(field: string): Promise<string> {
        const result = this.getRaw(field)
        if (result == null) return ""
        else return result
    }
    setString(field: string, value: string): void {
        if (value == null) value = ""
        this.setRaw(field, value)
    }
}