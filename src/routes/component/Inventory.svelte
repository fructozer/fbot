<script lang="ts">
    import { derived, writable, type Writable } from "svelte/store";
    import type { BotSection } from "../script/bots";
    import { InventoryMeta, type InventoryType } from "../script/inventory";
    import ItemSlot from "./ItemSlot.svelte";

    export let section: BotSection;
    const inv = section.inventory
    const meta = derived(inv, $i=>new InventoryMeta($i.type))
    let url = writable("")
    meta.subscribe(async m=>{
        url.set(await m.url)
    })
    const invProp = derived(meta, $i=>{
        return {
            style: `background: url(${$url}); 
            background-repeat: no-repeat;
            image-rendering: pixelated;
            background-size: calc(100% /  ${$i.width/256});
            padding-top: calc(100% / ${$i.width/$i.height});`,
        }
    }) 
</script>

<div class="inv" style={$invProp.style}>
    {#each $meta.slots as slot}
        <span style={`
            display: block;
            position: absolute;
            width: calc(100% / ${$meta.width} * ${slot.size.w});
            height: calc(100% / ${$meta.height} * ${slot.size.h});
            top: calc(100% / ${$meta.height} * ${slot.pos.y});;
            left: calc(100% / ${$meta.width} * ${slot.pos.x});
        `}>
        <ItemSlot data={$inv.getItem(slot.id)}/>
        </span>
    {/each}
</div>

<style lang='stylus'>
    .inv{
        width 100%
        position relative
    }
</style>