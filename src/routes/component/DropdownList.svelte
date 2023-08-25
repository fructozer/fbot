<script lang="ts">
    import { writable, type Writable } from "svelte/store"
    import angle from "$lib/assets/angle.png"
    import CheckBox from "./CheckBox.svelte"
    export let table: string[]
    export let current: Writable<string>
    
    const open = writable(false)
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
        z-index: 0
        display: block
        cursor: default
        background: #c6c6c6
        font-size: 1.3rem
        height: calc(3rem - 4px)
        width: 15rem
        margin: 1rem
        padding-left 1rem
        line-height: calc(3rem - 4px)
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
        width: 16rem
        padding: 0px
        padding-right: 0
        margin-left: calc(-1rem - 2px)
        margin-top: calc(-3rem + 2px)

        span{
            color: white
            width: calc(var(--size) * 7)
            padding-left: 1rem
            &.true{
                background: #4a484b
            }
        }
    }

</style>