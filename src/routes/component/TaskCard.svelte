<script lang="ts">
    import { getContext } from "svelte";
    import type { BotTask, BotTaskList } from "../script/task";
    import Button from "./Button.svelte";
    import type { Writable } from "svelte/store";
    import type { BotSection } from "../script/bots";
    export let task: BotTask
    const tasks: Writable<BotTaskList> = getContext("tasks")
    const editor:Writable<BotTask> = getContext("task-editor")
    const section:BotSection = getContext("section")
    const edit = () => {
        editor.set(task)
    }
    const remove = () => {
        $tasks.removeTask(task)
    }
    const play = () => {
        if (task.script != "")
        section.chat(task.script)
    }
</script>

<div class="card">
    <p class="name">{task.name}</p>
    <p class="description">{task.description}</p>
    <span class="del"><Button active={remove} color={0}>Remove</Button></span>
    <span class="play"><Button active={play} color={100}>Play</Button></span>
    <span class="edit"><Button active={edit} color={220}>Edit</Button></span>
</div>

<style lang='stylus'>
    .name
        font-size 1.2rem
        color #fff
        grid-area n
    .description
        font-size 0.8rem
        color #b2b2b2
        grid-area d
    .play
        grid-area p
        margin-block -1em
        margin-right -1em
    .edit
        grid-area e
        margin-block -1em
        margin-left -1em
    .del
        grid-area r
        margin-block -1em
    div
        padding 1rem
        display grid
        background #3a3a3a
        grid-template-areas "n n p e" "d d r r"
        grid-template-columns 1fr 1fr auto auto
        grid-template-rows 1fr 1fr
        border-top:    4px #4a4a4a solid
        border-left:   4px #4a4a4a solid
        border-bottom: 4px #1e1e1e solid
        border-right:  4px #1e1e1e solid
</style>