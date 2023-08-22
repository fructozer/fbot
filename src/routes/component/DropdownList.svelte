<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import angle from "$lib/assets/angle.png"
    import CheckBox from "./CheckBox.svelte";
    export let table: string[]
    export let current: Writable<string>
    
    const open = writable(false)
    const setCurrent = current.set
</script>
<div class="DropdownList" role={"combobox"} on:click={()=>{$open=!$open}}>
    <span class="current">{$current}
        <img src={angle} alt="angle"/>
    </span>
    
    {#if $open}
    <ul>
        {#each table as entry}
        <span class={($current==entry).toString()} role={"button"} on:click={()=>{$current=entry}}>
            <CheckBox value={$current==entry}/>
            {entry}
        </span>
        {/each}
    </ul>
    {/if}
</div>

<style lang="stylus">
    .DropdownList{
        --root: 60px
        --size: 30px
        z-index: 0
        display: block
        cursor: default
        background: #c6c6c6
        height: var(--size)
        width: calc(var(--size) * 7)
        margin: calc((var(--root) - var(--size)) / 2)
        padding-left calc(var(--size) / 2)
        font-size: calc(var(--size) / 1.5)
        line-height: var(--size)
        border-top: 2px #f7f7f7 solid
        border-left: 2px #f7f7f7 solid
        border-bottom: 2px #626262 solid
        border-right: 2px #626262 solid
        outline: 2px solid black
    }
    span {
        display: block
        z-index: 1
        color: #3c3c3c
    }
    .current {
        display: flex
        justify-content: space-between
        align-items: center
        img {
        width 22px
        height auto
        image-rendering: pixelated
        margin 10px
    }
    }
    ul {
        z-index: 2
        display: block
        position: relative
        background: #757575
        border-top: 2px #626262 solid
        border-left: 2px #626262 solid
        border-bottom: 2px #f7f7f7 solid
        border-right: 2px #f7f7f7 solid
        outline: 2px solid black
        width: calc(var(--size) * 7)
        padding: 0px
        padding-right: calc(var(--size) / 2)
        margin-left: calc((var(--size) / -2) - 2px)
        margin-top: calc((var(--size) / -1) - 4px)

        span{
            color: white
            width: calc(var(--size) * 7)
            padding-left: calc(var(--size) / 2)
            &.true{
                background: #4a484b
            }
        }
    }

</style>