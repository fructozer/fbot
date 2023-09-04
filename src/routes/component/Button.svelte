<script lang='ts'>
    export let active: ()=>any;
    export let inline:boolean = false
    export let color:number = 0
</script>

<button class={inline?"inline":""} style="--color:{color}" on:click={active}>
    <slot></slot>
</button>

<style lang='stylus'>
    button {
        --color: 0
        z-index: 0
        display: block
        cursor: pointer
        background: #c6c6c6
        height: 3rem
        margin: 1rem
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
        word-spacing: 0.3em
        padding-inline: 1em
        &:hover{
            background: #d64645
            border-top: 2px #e89696 solid
            border-left: 2px #e89696 solid
            border-bottom: 2px #7d1c1c solid
            border-right: 2px #7d1c1c solid
            outline: 2px solid white
            color: white
            filter: hue-rotate(calc(1deg * var(--color)))
            &:active{
                border-top:     2px #7d1c1c solid
                border-left:    2px #7d1c1c solid
                border-bottom:  2px #e89696 solid
                border-right:   2px #e89696 solid
            }
        }
        &.inline{
            margin-left: calc(-1rem + 4px)
            width: auto
        }
    }
</style>