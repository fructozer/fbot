<script lang="ts">
    import { derived, writable } from "svelte/store";
    import type { BotSection } from "../script/bots";
    import { InventoryMeta } from "../script/inventory";
    import ItemSlot from "./ItemSlot.svelte";

    export let section: BotSection;
    const inv = section.inventory
    const meta = derived(inv, $i=>new InventoryMeta($i.type))
    const invProp = derived(meta, async $i=>{
        return {
            style: `background: url(${await $i.url}); 
            background-repeat: no-repeat;
            image-rendering: pixelated;
            background-size: calc(100% /  ${$i.width/256});
            padding-top: calc(100% / ${$i.width/$i.height});`,
        }
    }) 
</script>
{#await $invProp}{:then prop}
{#key inv}
<div class="inv" style={prop.style}>
    {#each $meta.slots as slot}
        <span style={`
            display: block;
            position: absolute;
            width: calc(100% / ${$meta.width} * ${slot.size.w});
            height: calc(100% / ${$meta.height} * ${slot.size.h});
            top: calc(100% / ${$meta.height} * ${slot.pos.y});;
            left: calc(100% / ${$meta.width} * ${slot.pos.x});
        `}>
        <ItemSlot data={$inv.getItem(slot.id)} slot={slot.id} inventory={$inv}/>
        </span>
    {/each}
</div>
{/key}
{/await}

<style lang='stylus'>
    .inv{
        width 100%
        position relative
    }
</style>