<script lang='ts'>
    import type { Writable } from "svelte/store";
    import Input from "./Input.svelte";

    export let value: Writable<any>[]
    export let disable: boolean = false
    export let inline: boolean = false
</script>

<div class={inline?"inline":""}>
    <p><slot></slot></p>
    {#each value as v}
    <Input disable={disable} value={v} />
    {/each}
</div>

<style lang='stylus'>
    div {
        margin: 1em
        gap: 8px
        &.inline{
            display: flex
        }
    }
    p {
        margin-bottom: 0.25em
    }
</style>