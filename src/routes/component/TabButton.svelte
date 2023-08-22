<script lang="ts">
    export let icon: string
    export let name: string
    export let enable: boolean
    export let active: ()=>any
</script>

<span class={enable.toString()} role={"button"} on:click={active}>
    <img src={icon} alt={name}>
</span>
<style lang="stylus">
    span {
        background: #c6c6c6
        display: block
        width: 50px
        padding: 5px
        border-top: solid 5px #f7f7f7
        border-left: solid 5px #f7f7f7
        border-bottom: solid 5px #626262
        margin-left: 5px
        border-radius: 5px 0 0 5px
        margin-top: 3px
        margin-bottom: 3px
        transition-duration: 0.1s
        img {
            width: 32px
            image-rendering: pixelated
            transition-duration: 0.3s
        }
        &.false{
            width: 35px
            margin-left: 10px
            background: #626262
            border-top-color: #c4c5c5
            border-left-color: #c4c5c5
            border-bottom-color: #2c2c2c
            img{
                filter: invert(0.7)
            }
        }
    }

</style>