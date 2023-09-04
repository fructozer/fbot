<script lang='ts'>
    import { writable, type Writable } from "svelte/store";
    export let value: Writable<any> = writable("")
    export let submit:(input: string)=>void = (e)=>{}
    export let disable: boolean = false
    export let placeholder: string = ""
    export let name:string|null = null;
    export let inline: boolean = false
</script>

<div class={inline?"inline":""}>
    {#if name!=null}
    <p><slot></slot></p>
    {/if}
    <textarea 
        placeholder={placeholder}
        autocomplete="off"
        aria-autocomplete="both"
        class={(name!=null).toString()} 
        name={name} id={name} 
        disabled={disable} bind:value={$value}/>
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
    textarea {
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
        max-height: 25em
        resize: vertical
        cursor: default
        &:focus-visible {
            outline: none
            box-shadow: 0 0 10px black
        }
        &::-webkit-scrollbar {
            width: 10px;
            cursor: pointer;
        }
        &::-webkit-scrollbar-track {background: transparent;}
        &::-webkit-scrollbar-thumb {background: #888;}
        &::-webkit-scrollbar-thumb:hover {background: white;}
    }
</style>