<script lang="ts">
    import type { Writable } from "svelte/store";
    import TabButton from "./component/TabButton.svelte";
    import { keys, pages, type Pages } from "./script/workspace";
    import { getContext } from "svelte";

    export let current: Writable<string>
    const bots:Writable<string[]> = getContext("bots")
</script>

<div class="sidebar">
    {#if $bots.length!=0}
    {#each keys as tab}
    <!-- svelte-ignore a11y-autofocus -->
    <TabButton icon={pages[tab].icon} name={tab} active={()=>{current.set(tab)}} enable={$current==tab}/>
    {/each}
    {/if}
</div>

<style lang="stylus">
    .sidebar{
        margin-top: 20px
        background: #313234
        position: relative
        z-index: 10
    }
</style>