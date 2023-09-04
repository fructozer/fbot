<script lang="ts">
    import { beforeUpdate, getContext, setContext } from "svelte";
    import InputText from "../component/InputText.svelte";
    import Button from "../component/Button.svelte";
    import type { BotSection } from "../script/bots";
    import TaskCard from "../component/TaskCard.svelte";
    import Container from "../component/Container.svelte";
    import InputArea from "../component/InputArea.svelte";
    import { writable, type Writable } from "svelte/store";
    import { BotTask, type BotTaskList } from "../script/task";

    export let hiden: boolean = false
    const section: BotSection = getContext("section");
    const tasks: Writable<BotTaskList> = getContext("tasks");
    const filter: Writable<string> = writable("");
    const editor: Writable<BotTask|null> = writable(null)
    setContext("task-editor", editor)
    let edit_name: Writable<string> = writable("");
    edit_name.subscribe((name)=>{if($editor!=null){$editor.name = name; $tasks.update()}})
    let edit_des: Writable<string> = writable("");
    edit_des.subscribe((des)=>{if($editor!=null){$editor.description = des; $tasks.update()}})
    let edit_cmd: Writable<string> = writable("");
    edit_cmd.subscribe((cmd)=>{if($editor!=null){$editor.script = cmd; $tasks.update()}})
    editor.subscribe((task)=>{
        if(task!=null){
            edit_name.set(task.name)
            edit_des.set(task.description)
            edit_cmd.set(task.script)
        }
    })

</script>
<div style={hiden?"display: none":""} class="toolbar">
    <span class="search"><InputText placeholder="Search" value={filter} name={"search"}/></span>
    <Button active={()=>{
        const newTask = new BotTask("", "", "", "ok");
        $tasks.createTask(newTask)
        $editor = newTask
        }} color={100} inline>Create</Button>
</div>
<div class="tab" style={hiden?"display: none":""}>
    <div class="content">
        {#each $tasks.tasks as t}
            {#if $filter=="" || t.name.includes($filter)}
                <TaskCard task={t}></TaskCard>
            {/if}
        {/each}
    </div>
</div>

{#if $editor!=null}
<div class="editor" role={"none"} on:click={()=>{$editor = null}}>
    <div class="overlay" role={"none"} on:click={(e)=>{e.stopPropagation()}}>
        <Container name={"editor"}>
        <InputText name="name" value={edit_name}>Name</InputText>
        <InputText name="des" value={edit_des}>Description</InputText>
        <InputArea name="cmd" value={edit_cmd}>Command</InputArea>
        </Container>
    </div>
</div>
{/if}

<style lang='stylus'>
    .tab
        position: relative
    .toolbar
        display: inline-flex
        position: absolute
        left: -0.05em; top: -0.05em
        width: 100%
        .search
            width: -webkit-fill-available
    
    .content
        display: grid
        grid-template-columns: 1fr 1fr
        margin-top: 3em
        margin-inline: 0.5em
        width: calc(100% - 1em)
        @media (max-width: 800px)
            grid-template-columns: 1fr
        div
            display: block
            width: 100%
            height: 100%
    .editor
        position: absolute
        left: calc(1rem - 1px); top: calc(1em - 4px)
        width: calc(100% - 2rem + 2px) 
        height: calc(100% - 2em + 5px) 
        border-radius: 0 0 0.5em 0.5em
        z-index: 100
        background: rgba(0,0,0,0.7)
        .overlay
            position: absolute
            left: 50%; top: 50%
            transform: translate(-50%, -50%)
            // background: #5e5e5e
            padding: 1em
            border-radius: 0.5em
            width: 75%
</style>