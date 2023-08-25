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
    import { createEventDispatcher } from "svelte";
    const currentPage:Writable<PageName> = writable("home")
    export let data: ManagerData
    const bots = data.bots
    const currentBot = data.current
    const dispatch = createEventDispatcher()
    currentPage.subscribe(tab => {dispatch("tab-change", tab)})
</script>

<section class="app">
    {#each $bots as bot}
        <Workspace hiden={$currentBot != bot} current={currentPage} section={new BotSection(bot)}/>
    {/each}
    <Sidebar current={currentPage}/>
    <Infobar data={data}/>
</section>

<style>
</style>