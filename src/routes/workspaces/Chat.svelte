<script lang="ts">
    import Console from "../component/Console.svelte";
    import Input from "../component/Input.svelte";
    import InputText from "../component/InputText.svelte";
import { ConsoleLogger } from "../script/console";

    export let data: any

    const logger = new ConsoleLogger()
    let count = 0
    setInterval(()=>{
        count++
        logger.log("Hello funayd! your logger is working #"+count)
    }, 1000)
</script>

<div>
    <Console logger={logger}/>
    <InputText />
</div>

<style lang='stylus'>
    div {
        height: 100%
        display: flex
        flex-direction: column
        justify-content: flex-end
    }
</style>

