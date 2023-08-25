<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    export let submit: (info: string)=>void = (e)=>{}
    export let cancel: ()=>void = ()=>{}
    const data = writable("")
    const enter = (e: KeyboardEvent)=>{
        console.log(e)
        if (e.key == "Enter") {
            submit($data)
            cancel()
        }
    }
</script>

<input type="text" autocomplete="off" bind:value={$data} on:keypress={enter}>

<style lang='stylus'>
    input {
        font-size: 1em
        height: calc(2.5em + 6px)
        background: #5e5e5e
        margin: calc(1rem - 2px)
        border: 0
        padding: 0
        border-top: 3px solid #3e3c3f
        border-bottom: 3px solid #b2b2b2
        font-family: mojang
        padding-inline: 0.5em
        color: white
        text-overflow: ellipsis
        width: 15rem
        text-align: left
        &:focus-visible {
            outline: none
            box-shadow: 0 0 10px black
        }
    }
</style>