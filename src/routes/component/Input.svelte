<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    export let value: Writable<any> = writable("")
    export let submit:(input: string)=>void = (e)=>{}
    export let disable: boolean
    const enter = (e: KeyboardEvent)=>{
        if (e.key == "Enter") {
            submit($value)
            value.set("")
        }
    }
</script>

<input type="text" disabled={disable} autocomplete="off" bind:value={$value} on:keypress={enter}>

<style lang='stylus'>
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
        color: white
        text-overflow: ellipsis
        width: calc( 100% - 1em )
        text-align: center
        &:focus-visible {
            outline: none
            box-shadow: 0 0 10px black
        }
    }
</style>