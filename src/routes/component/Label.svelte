<script lang='ts'>
    import type { Writable } from "svelte/store";
    import LabelEntry from "./LabelEntry.svelte";
    import { beforeUpdate } from "svelte";
    export let value: any[]
    export let inline: boolean = false
    // white red green blue
    const c = ["#ffffff", "#ff5050", "#33cc33", "#0099ff"]
    let color: string[] = []
    beforeUpdate(()=>{
        color = []
        value.forEach((v,i) =>{
        if (typeof v == 'boolean'){
            if (v) color.push(c[2])
            else color.push(c[1])
        } else if (typeof v == 'number') {
            color.push(c[1+ i%3])
        }
        else color.push(c[0])
    })
    })
</script>

<div class={inline?"inline":""}>
    <p><slot></slot></p>
    {#each value as v, i}
    <LabelEntry color={color[i]} value={v} />
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