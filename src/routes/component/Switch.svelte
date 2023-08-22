<script lang="ts">
    import type { Writable } from "svelte/store";

    export let value: Writable<boolean>;
</script>

<div>
    <span 
        role={"button"} 
        class={"switcher "+$value.toString()} 
        on:click={()=>{$value=!$value}}
    >
        <span class="node">
        </span>
    </span>
    <p><slot></slot></p>
</div>

<style lang="stylus">
    .switcher{
        display: inline-block;
        background: #3f4042
        height: 25px
        width: 50px
        margin-block: 8px
        margin-inline: 20px
        border: 3px solid black
        transition-duration: 0.2s
        &::before {
            content: ""
            display: block
            z-index: 2
            position: relative
            height: 15px
            width: 5px
            margin: 4.5px 0 0 25px
            position: absolute
            background: #8a8a8a
            transition-duration: 0.2s
        }
        .node {
            background: #c8c8c8
            display: block
            z-index: 3
            position: relative
            border-top:     5px #f7f7f7 solid
            border-left:    5px #f7f7f7 solid
            border-bottom:  5px #626262 solid
            border-right:   5px #626262 solid
            margin-top: -5px
            margin-left: -5px
            height: 25px
            width: 10px
            transition-duration: 0.2s
            outline: 3px solid black
        }
        &.true{
            background: #7d7e80
            &::before{
                background: #3a3a3a    
            }
            .node{
                margin-left: 40px
            }
        }
    }
    div {
        display: flex
        .switcher:hover{
            border-color: white
            background: #027300
            &:before{
                background: #014d00
            }
            &.false{
                background: #014d00
                &:before{
                    background: #013300
                }
            }
            .node{
                outline-color: white
                background: #42a01c
                border-top-color: #2dd415
                border-left-color: #2dd415
                border-bottom-color: #017405
                border-right-color: #017405
            }
        }
    }
</style>