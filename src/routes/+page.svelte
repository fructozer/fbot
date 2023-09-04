<svelte:head>
    <link rel="stylesheet" href="font.css">
</svelte:head>
<script lang='ts'>
    import Sidebar from "./Sidebar.svelte";
    import "./+page.stylus"
    import Infobar from "./Infobar.svelte";
    import Workspace from "./Workspace.svelte";
    import { writable, type Writable } from "svelte/store";
    import type { PageName } from "./script/workspace";
    import { BotSection, type ManagerData } from "./script/bots";
    import { createEventDispatcher, setContext } from "svelte";
    import { BotTask } from "./script/task";
    const currentPage:Writable<PageName> = writable("home")
    export let data: ManagerData
    const bots = data.bots
    const currentBot = data.current
    const dispatch = createEventDispatcher()
    currentPage.subscribe(tab => {dispatch("tab-change", tab)})
    setContext("currentBot", currentBot)
    setContext("bots", bots)
    setContext("tasks", data.tasks)
</script>

<section class="app">
    {#each $bots as bot}
        <Workspace hiden={$currentBot != bot} current={currentPage} section={new BotSection(bot)}/>
    {/each}
    <Sidebar current={currentPage}/>
    <Infobar data={data}/>

</section>

<style>
    .overlay{
        position: fixed;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 100;
    }
    .content{
        position: absolute;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 1em;
        border-radius: 0.5em;
    }
</style>