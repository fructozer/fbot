<script lang="ts">
    import { beforeUpdate } from "svelte";
    import type { BotItem } from "../script/item";
    import { ids } from "../script/itemdata";
    import type { BotInventory } from "../script/inventory";

    export let data: BotItem;
    export let slot: number;
    export let inventory: BotInventory;
    let icon: string;
    beforeUpdate(()=>{
        icon = "./mcicon/"+ids(data.version)[data.itemId]+".png"
    })
    const click = async ()=>{
        await inventory.click(slot)
        inventory.reload()
    }
</script>

<span role={"button"} on:click={click}
    style={`
    background: url(${icon}) center center no-repeat;
    background-size: 88.87%
`}> {#if data.itemCount>1}
    <p>{data.itemCount}</p>
    {/if}
    {#if data.itemCount>0}
    <div class="lore">
        {#await data.getName()}{:then name}{@html name}{/await}
        {#await data.getLore()}{:then lore}
        {#each lore as line}
        <span>{@html line}</span>
        {/each}{/await}
    </div>
    {/if}
</span>

<style lang='stylus'>  
    span
        display block
        position relative
        width 100%
        height 100%
        &>p 
            font-size: 0.8rem 
            position absolute
            bottom 5%
            right 5%
            margin 0
        &:hover .lore 
                display: block
        .lore 
            overflow: hidden
            $m = 2;
            display: none;
            position: absolute;
            pointer-events: none;
            bottom: 100%;
            left: 100%;
            background: #1b0c1b;
            border: 2px*$m solid #290560;
            outline: 2px*$m solid #1b0c1b;
            padding: 4px*$m;
            color: #aaaaaa;
            font-size: 1rem;
            text-wrap: nowrap
            &>span 
                display: block;
                &:nth-child(2)
                    margin-top: 7px*$m;
            
        
</style>