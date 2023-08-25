<script lang="ts">
    import ChatInput from "../component/ChatInput.svelte";
    import Console from "../component/Console.svelte";
    import type { BotSection } from "../script/bots";
    export let section: BotSection
    export let hiden: boolean
</script>

<div style={hiden?"display: none":""}>
    <Console logger={section.logger}/>
    <ChatInput section={section}/>
</div>

<style lang='stylus'>
    div {
        height: 100%
        display: flex
        flex-direction: column
        justify-content: flex-end
    }
</style>

