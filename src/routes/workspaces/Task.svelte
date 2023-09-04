<script lang="ts">
    import { getContext, setContext } from "svelte";
    import InputText from "../component/InputText.svelte";
    import Button from "../component/Button.svelte";
    import type { BotSection } from "../script/bots";

    export let section: BotSection = getContext("section");
    export let hiden: boolean
    setContext("section", section)
</script>
<div style={hiden?"display: none":""} class="toolbar">
    <span class="search"><InputText placeholder="Search" /></span>
    <Button active={()=>{}} color={100} inline>Create</Button>
</div>
<div class="tab" style={hiden?"display: none":""}>
    
    <div class="content">
        hmm
    </div>
</div>

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
        display: block
        margin-top: 3em
        width: 100%
        height: calc(100% - 5em)
        div
            display: block
            width: 100%
            height: 100%
</style>