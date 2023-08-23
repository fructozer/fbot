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
    
    export let data: any
    const currentPage:Writable<PageName> = writable("home")
</script>

<section class="app">
    <Workspace current={currentPage} data={data}/>
    <Sidebar current={currentPage}/>
    <Infobar />
</section>

<style>
</style>