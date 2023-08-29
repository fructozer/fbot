<script lang="ts">
    import { derived, writable, type Writable } from "svelte/store";
    import type { BotSection } from "../script/bots";
    import { InventoryMeta, type InventoryType } from "../script/inventory";

    export let section: BotSection;
    const invType: Writable<InventoryType> = writable("generic_9x2")
    const invMeta = derived(invType, $i=>new InventoryMeta($i))
    const invTURL = derived(invMeta, $i=>$i.url)
    const invProp = derived(invMeta, $i=>{
        return {
            style: `background: url(${$invTURL}); 
            background-repeat: no-repeat;
            image-rendering: pixelated;
            background-size: calc(100% /  ${$i.width/256});
            padding-top: calc(100% / ${$i.width/$i.height});`,
        }
    }) 
</script>

<div class="inv" style={$invProp.style}>
</div>

<style lang='stylus'>
    .inv{
        width: 100%
    }
</style>