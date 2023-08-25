<script lang='ts'>
    import { writable, type Writable } from "svelte/store";
    import type { BotSection } from "../script/bots";
    export let value: Writable<string> = writable("")
    export let section: BotSection
    const online = section.isOnline
    const tabProcess = writable(false)
    const tabList = writable([])
    const tabIndex = writable(0)
    const enter = async (e: KeyboardEvent)=>{
        if (!$online) return
        if (e.key == "Enter") {
            if ($value.length==0) return
            section.chat($value)
            value.set("")
        }
        else if (e.key == 'Tab') {
            e.preventDefault()
            if (!$tabProcess) {
                tabList.set(await section.tab($value))
            }

        } 
        else if ($tabProcess) {
            tabProcess.set(false)
        }
    }
    const tabReplace = ()=>{
        
    }
    export let name:string|null = null;
    export let inline: boolean = false
</script>

<div class={inline?"inline":""}>
    <input 
        autocomplete="off"
        aria-autocomplete="both"
        class={$online.toString()} 
        type="text" name={name} id={name} 
        disabled={!$online} bind:value={$value}
        on:keydown={enter}>
</div>

<style lang='stylus'>
    div {
        margin: 1em
        &.inline {
            display: flex
            gap: 8px
        }
    }
    p {
        margin-bottom: 0.25em
    }
    input {
        height: 2.5em
        background: #5e5e5e
        margin: 0
        border: 0
        padding: 0
        border-top: 3px solid #3e3c3f
        border-bottom: 3px solid #b2b2b2
        font-family: mojang
        padding-inline: 0.5em
        font-size: 1em
        word-spacing: 0.5em
        color: white
        text-overflow: ellipsis
        width: calc( 100% - 1em )
        &:focus-visible {
            outline: none
            box-shadow: 0 0 10px black
        }
        &.false{
            border-bottom-color: #cc0000
            border-top-color: #330000
            background: #800000
            filter: brightness(1) saturate(0.2)
        }
    }
</style>