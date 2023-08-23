<script lang='ts'>
    import type { Writable } from "svelte/store";
    import type { PageName } from "./script/workspace";
    import Home from "./workspaces/Home.svelte";
    import Chat from "./workspaces/Chat.svelte";
    import Task from "./workspaces/Task.svelte";
    import State from "./workspaces/State.svelte";
    import Setting from "./workspaces/Setting.svelte";

    export let current: Writable<PageName>
    export let data: any
</script>
<div class="workspace">
    <div class="context">
        {#if $current=="home"}      <Home data={data}/>
        {:else if $current=="chat"} <Chat data={data}/>
        {:else if $current=="task"} <Task data={data}/>
        {:else if $current=="state"}<State data={data}/>
        {:else}                     <Setting data={data}/>
        {/if}
    </div>
</div>
<style lang="stylus">
    .workspace{
        background: #c6c6c6
        display: flex
        position: relative
        z-index: 0
        width: calc(100% - 20px)
        height: calc(100% - 20px)
        margin: 5px
        border-top:     5px #f7f7f7 solid
        border-left:    5px #f7f7f7 solid
        border-bottom:  5px #626262 solid
        border-right:   5px #626262 solid
        outline: 5px solid black
        border-radius: 15px
        .context{
            display: inline-block
            background: #111
            margin: 15px
            border-radius: 10px
            width: calc(100% - 10px - 30px)
            height: calc(100% - 10px - 30px)
            border-top:     5px #626262 solid
            border-left:    5px #626262 solid
            border-bottom:  5px #f7f7f7 solid
            border-right:   5px #f7f7f7 solid
            overflow: auto 
        }
    }
</style>