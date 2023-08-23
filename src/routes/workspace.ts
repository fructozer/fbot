import home      from "$lib/assets/home.png"
import chat      from "$lib/assets/chat.png"
import task      from "$lib/assets/task.png"
import state from "$lib/assets/state.png"
import setting  from "$lib/assets/settings.png"

export interface PageProperty {
    name: string
    icon: string
}
export interface Pages{
    home: PageProperty
    chat: PageProperty
    task: PageProperty
    state: PageProperty
    setting: PageProperty
}

export type PageName = keyof Pages

export const pages: Pages = {
    home: {    name: "home", icon: home},
    chat: {    name: "chat", icon: chat},
    task: {    name: "task", icon: task},
    state: {   name: "state", icon: state},
    setting: { name: "setting", icon: setting}
}
//@ts-ignore
export const keys: PageName[] = Object.keys(pages)