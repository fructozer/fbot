<script lang='ts'>
    export let title: string = ""
    export let disable: boolean = false
</script>
<div class={disable?"disable":""}>
    <p>{title}</p>
    <slot></slot>   
</div>
<style lang='stylus'>
    div {
        display: block
        width: -webkit-fill-available
        background: #3a3a3a
        border-top:    4px #4a4a4a solid
        border-left:   4px #4a4a4a solid
        border-bottom: 4px #1e1e1e solid
        border-right:  4px #1e1e1e solid
        cursor: default
        p {
            display: block
            margin: 1em
            font-size: 1.2em
        }
        &:hover{
            outline: solid white 4px
            border-radius: 3px
            p {
                color: #ffd9b3
            }
        }
        &.disable{
            filter: brightness(0.4)
            pointer-events: none
        }
    }
</style>