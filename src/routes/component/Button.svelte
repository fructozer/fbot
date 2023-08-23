<script lang='ts'>
    export let active: ()=>any;

</script>

<button on:click={active}>
    <slot></slot>
</button>

<style lang='stylus'>
    button {
        z-index: 0
        display: block
        cursor: default
        background: #c6c6c6
        height: 3em
        margin: 1em
        // width: calc(var(--size) * 7)
        // padding-left calc(var(--size) / 2)
        line-height: 2em
        border-top: 2px #f7f7f7 solid
        border-left: 2px #f7f7f7 solid
        border-bottom: 2px #626262 solid
        border-right: 2px #626262 solid
        outline: 2px solid black
        font-family: mojang
        font-size: 16px
        color: #4c4c4c
        transition-duration: 0.2s
        width: calc( 100% - 2em)
        padding-inline: 1em
        &:hover{
            background: #208305
            border-top: 2px #13d10a solid
            border-left: 2px #13d10a solid
            border-bottom: 2px #034c00 solid
            border-right: 2px #034c00 solid
            outline: 2px solid white
            color: white

            &:active{
                border-top:     2px #034c00 solid
                border-left:    2px #034c00 solid
                border-bottom:  2px #13d10a solid
                border-right:   2px #13d10a solid
            }
        }
    }
</style>