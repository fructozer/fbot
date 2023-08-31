<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { item_id } from "../script/data";
import type { BotItem } from "../script/item";
    import { ids } from "../script/itemdata";

    export let data: BotItem;
    let icon: string;
    beforeUpdate(()=>{
        icon = "./mcicon/"+ids(data.version)[data.itemId]+".png"
    })
</script>

<span style={`
    background: url(${icon}) center center no-repeat;
    background-size: 88.87%
`}> {#if data.itemCount>0}
    <p>{data.itemCount}</p>
    {/if}
</span>

<style lang='stylus'>  
    span
        display block
        position relative
        width 100%
        height 100%
        p 
            font-size: 0.8rem 
            position absolute
            bottom 5%
            right 5%
            margin 0
</style>