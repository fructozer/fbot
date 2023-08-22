<script lang='ts'>
    export let active: ()=>any;

</script>

<button>
    <slot></slot>
</button>

<style lang='stylus'>
    button {
        --root: 60px
        --size: 35px
        z-index: 0
        display: block
        cursor: default
        background: #c6c6c6
        height: var(--size)
        margin: calc((var(--root) - var(--size)) / 2)
        // width: calc(var(--size) * 7)
        // padding-left calc(var(--size) / 2)
        line-height: var(--size)
        border-top: 2px #f7f7f7 solid
        border-left: 2px #f7f7f7 solid
        border-bottom: 2px #626262 solid
        border-right: 2px #626262 solid
        outline: 2px solid black
        font-family: mojang
        font-size: 16px
        color: #4c4c4c
        transition-duration: 0.2s
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