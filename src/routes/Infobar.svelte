<script lang='ts'>
    import favicon from "$lib/assets/favicon.png"
    import DropdownList from "./component/DropdownList.svelte";
    import Button from "./component/Button.svelte";
    import type { ManagerData } from "./script/bots";
    import { writable } from "svelte/store";
    import InfoInput from "./component/InfoInput.svelte";
    import { keys } from "./script/workspace";
    export let data: ManagerData
    const isCreateNewBot = writable(false)
    const sellectable = data.bots
    const sellected = data.current
    const newBot = ()=>{isCreateNewBot.set(!$isCreateNewBot)}
</script>

<div class="infobar">
    <div class="logo">
        <img src={favicon} alt="fbot">
        <span class="title">FBOT</span>
    </div>
    <div class="select">
        {#if $isCreateNewBot}
            <InfoInput submit={(e)=>{
                sellectable.set([...$sellectable, e])
                sellected.set(e)
            }} cancel={()=>{$isCreateNewBot = false}}/>
        {:else}
            {#if $sellectable.length == 0 && !$isCreateNewBot}
                <Button active={()=>{}} color={$isCreateNewBot?0:100} inline>
                    No bot was created!
                </Button>
            {:else}
                <DropdownList table={$sellectable} current={sellected} />
            {/if}
        {/if}
        <Button active={newBot} color={$isCreateNewBot?0:100} inline>
            {#if $isCreateNewBot}x{:else}+{/if}
        </Button>
    </div>
</div>


<style lang="stylus">
    .infobar{
        display: flex
        background: #313234
        justify-content: space-between
        .logo {
            display: flex
            height: 4rem
            margin: 0.25rem
        }
        .title {
            font-size: 1.5rem
            line-height: 4.5rem
            margin-left: 1rem
        }
        .select {
            display: flex
            margin-right: 0.5rem
        }
    }
</style>