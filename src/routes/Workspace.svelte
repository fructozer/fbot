<script>
    import { writable } from "svelte/store";
    import Switch from "./component/Switch.svelte"; 
    import Button from "./component/Button.svelte";
    const reconnect0 = writable(false)
    const confirm = ()=>{
        alert("Confirm success!")
    }
</script>
<div class="workspace">
    <div class="context">
        <br/>
        <Switch value={reconnect0}>Auto reconnect</Switch>
        <Button active={confirm}>Confirm</Button>
    </div>
</div>
<style lang="stylus">
    .workspace{
        background: #c6c6c6
        display: flex
        position: relative
        z-index: 0
        width: calc(100% - 20px)
        height: calc(100% - 20px)
        margin: 5px
        border-top:     5px #f7f7f7 solid
        border-left:    5px #f7f7f7 solid
        border-bottom:  5px #626262 solid
        border-right:   5px #626262 solid
        outline: 5px solid black
        border-radius: 15px
        .context{
            display: block
            background: #313234
            margin: 15px
            border-radius: 10px
            width: calc(100% - 10px - 30px)
            height: calc(100% - 10px - 30px)
            border-top:     5px #626262 solid
            border-left:    5px #626262 solid
            border-bottom:  5px #f7f7f7 solid
            border-right:   5px #f7f7f7 solid
            overflow: auto 
        }
    }
</style>