function minl(input: string, len: number){
    while (input.length<len) input = `_${input}`
    return input
}

export function log(message: string){
    const time = new Date()
    const h = minl(time.getHours().toString(),2)
    const m = minl(time.getMinutes().toString(),2)
    const s = minl(time.getSeconds().toString(),2)
    const n = minl(time.getMilliseconds().toString(),3)
    const t = `${h}:${m}:${s}.${n}`
    console.log( `[${t}] ${message}`)
}

export function err(message: string){
    log(`[ERROR] ${message}`)
}

export function randomID(length: number = 8, prefix: string = ''){
    const charSet = 
        '0123456789'+
        'abcdefghijkelmopqrstuvwxyz'+
        'abcdefghijkelmopqrstuvwxyz'
        .toUpperCase()
    let result = prefix;
    for (let i=0; i<length; i++){
        result+=charSet.charAt(Math.floor(Math.random()*charSet.length))
    }
    return result;
}