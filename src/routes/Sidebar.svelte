<script lang="ts">
    import home      from "$lib/assets/home.png"
    import chat      from "$lib/assets/chat.png"
    import task      from "$lib/assets/task.png"
    import scheduler from "$lib/assets/scheduler.png"
    import settings  from "$lib/assets/settings.png"
    import TabButton from "./component/TabButton.svelte";
    import { writable } from "svelte/store";

    const tabs = {  
        "home": home,
        "chat": chat,
        "scheduler": scheduler,
        "task": task,
        "settings": settings}
    const current = writable("home")

</script>

<div class="sidebar">
    {#each Object.keys(tabs) as tab}
        <TabButton icon={tabs[tab]} name={tab} active={()=>{current.set(tab)}} enable={$current==tab}/>
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