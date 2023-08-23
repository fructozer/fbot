<script lang="ts">
    import { writable } from "svelte/store";
import Container from "../component/Container.svelte";
    import InputText from "../component/InputText.svelte";
    import Button from "../component/Button.svelte";
    import InputSet from "../component/InputSet.svelte";
    import Switch from "../component/Switch.svelte";

    export let data: any

    const host = writable("example.com")
    const port = writable(25565)
    const x = data.x
    const y = data.y
    const z = data.z
    const active = ()=> alert(`Process login to ${$host}:${$port}`)
</script>
<div class="home">
    <Container title="Server login">
        <InputText name="host" value={host}>Host</InputText>
        <InputText name="port" value={port}>Port</InputText>
        <Button active={active}>Connect</Button>
    </Container>

    <Container title="Infomation">
        <InputSet value={[x,y,z]} inline disable>Position: </InputSet>
    </Container>
</div>
<style lang='stylus'>
    .home{
        // background: blue
        display: grid
        padding: 5px
        gap: 5px
        align-items: start
        grid-template-columns: 1fr
        @media screen and (min-width: 800px) {
            grid-template-columns: 1fr 1fr
        }
        @media screen and (min-width: 1600px) {
            grid-template-columns: 1fr 1fr 1fr
        }
    }
</style>
