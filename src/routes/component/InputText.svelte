<script lang='ts'>
    import type { Writable } from "svelte/store";

    export let name:string;
    export let value: Writable<string>
</script>

<div>
    <p><slot></slot></p>
    <input type="text" name={name} id={name} bind:value={$value}>
</div>

<style lang='stylus'>
    div {
        margin: 1em
    }
    p {
        margin-bottom: 0.25em
    }
    input {
        height: 2.5em
        background: #5e5e5e
        margin-top: 0em
        border-top: 3px solid #3e3c3f
        border-bottom: 3px solid #b2b2b2
        font-family: mojang
        padding-inline: 0.5em
        font-size: 1em
        color: white
        text-overflow: ellipsis
        &:focus-visible {
            outline: none
        }
    }
</style>