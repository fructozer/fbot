<script lang='ts'>
    import { writable, type Writable } from "svelte/store";
    import type { BotSection } from "../script/bots";;
    import type { Action } from "svelte/action";
    export let value: Writable<string> = writable("")
    export let section: BotSection
    const online = section.isOnline
    const tabProcess = writable(false)
    const tabList = writable([])
    const tabIndex = writable(0)
    const hisIndex = writable(-1)
    const enter = async (e: KeyboardEvent)=>{
        if (!$online) return
        if (e.key == "Enter") {
            if ($value.length==0) return
            section.chat($value)
            value.set("")
        }
        if (e.key == 'Tab') {
            e.preventDefault()
            if (!$tabProcess) {
                tabList.set(await section.tab($value))
                tabIndex.set(0)
                tabProcess.set(true)
                tabReplace()
            } else {
                $tabIndex = ($tabIndex + 1) % $tabList.length
                tabReplace()
            }
        }
        else if (e.key=="ArrowUp" || e.key=="ArrowDown") {}
        else if ($tabProcess) {
            tabProcess.set(false)
        }
        if (e.key=="ArrowUp"){
            e.preventDefault()
            if ($tabProcess) {
                $tabIndex = ($tabIndex + $tabList.length - 1) % $tabList.length
                tabReplace()
            }
            else {
                const l = section.sendhistory.length
                if ($hisIndex<l-1){
                    $hisIndex = Math.min(l-1, $hisIndex+1)
                    hisApply()
                }
            }
        }
        else if (e.key=="ArrowDown"){
            e.preventDefault()
            if ($tabProcess) {
                if ($tabIndex<$tabList.length-1){
                    $tabIndex = $tabIndex + 1
                    tabReplace()
                }
            }
            else {
                if ($hisIndex != -1) {
                    $hisIndex = $hisIndex-1
                    hisApply()
                }
            }
        }
        else {
            $hisIndex = -1
        }

    }
    const hisApply = ()=>{
        if ($hisIndex==-1) $value = ""
        else $value = section.sendhistory[section.sendhistory.length-1-$hisIndex]
    }
    const tabSelect = (index: number)=>{
        $tabIndex = index
        $tabProcess = false
        tabReplace()
    }
    const tabReplace = ()=>{
        const t = $value
        const splited = t.split(" ")
        splited[splited.length-1] = $tabList[$tabIndex]
        value.set((splited.join(" ")))
    }
    export let name:string|null = null;
    export let inline: boolean = false;
    let input: Node
    const rase: Action = (node)=>{input = node}


</script>

<form data-sveltekit-keepfocus class={inline?"inline":""}>
    {#if $tabProcess}
        <span class="tab">
            {#each $tabList as t, i}
                <p  class={($tabIndex == i).toString()} 
                    on:click={()=>{tabSelect(i)}} 
                    role={"button"}> {t} 
                </p>
            {/each}
        </span>
    {/if}
    <input use:rase
        maxlength="2000"
        autocomplete="off"
        aria-autocomplete="both"
        class={$online.toString()} 
        type="text" name={name} id={name} 
        disabled={!$online} bind:value={$value}
        placeholder={$online?"":"This bot is offline"}
        on:keydown={enter}>
</form>

<style lang='stylus'>
    form {
        margin: 1em
        &.inline {
            display: flex
            gap: 8px
        }
        .tab {
            position: absolute
            overflow: hidden
            background: black
            max-height: 30rem
            bottom: calc(5rem + 2px)
            cursor: pointer
            display: flex
            flex-direction: column
            flex-wrap: wrap
            p {
                margin: 0
                padding-inline: 1em
                padding-block: 0.5em
            }
            .true{
                color: #cbba5e
            }
            :hover{
                color: #1b6bf1
            }
        }
    }
    p {
        margin-bottom: 0.25em
    }
    input {
        height: 2.5em
        background: #5e5e5e
        margin: 0
        border: 0
        padding: 0
        border-top: 3px solid #3e3c3f
        border-bottom: 3px solid #b2b2b2
        font-family: mojang
        padding-inline: 0.5em
        font-size: 1em
        word-spacing: 0.5em
        color: white
        text-overflow: ellipsis
        width: calc( 100% - 1em )
        &:focus-visible {
            outline: none
            box-shadow: 0 0 10px black
        }
        &.false{
            border-bottom-color: #cc0000
            border-top-color: #330000
            background: #800000
            filter: brightness(1) saturate(0.2)
        }
    }
</style>