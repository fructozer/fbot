<script lang="ts">
    import type { Writable } from "svelte/store";
    import TabButton from "./component/TabButton.svelte";
    import { keys, pages, type Pages } from "./workspace";

    export let current: Writable<string>
</script>

<div class="sidebar">
    {#each keys as tab}
    <!-- svelte-ignore a11y-autofocus -->
    <TabButton icon={pages[tab].icon} name={tab} active={()=>{current.set(tab)}} enable={$current==tab}/>
    {/each}
</div>

<style lang="stylus">
    .sidebar{
        margin-top: 20px
        background: #313234
        position: relative
        z-index: 10
        .tab {
            display: block
            width: 32px
            margin: 10px
        }
    }
</style>