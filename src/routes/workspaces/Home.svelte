<script lang="ts">
    import { derived, writable } from "svelte/store";
    import Container from "../component/Container.svelte";
    import InputText from "../component/InputText.svelte";
    import Button from "../component/Button.svelte";
    import type { BotSection, ManagerData } from "../script/bots";
    import Label from "../component/Label.svelte";
    import Inventory from "../component/Inventory.svelte";
    import { getContext } from "svelte";
    export let section: BotSection = getContext("section");
    export let hiden: boolean
    let host =   section.host
    let port =   section.port
    let online = section.isOnline
    let position = section.position
    let pos = derived(position, $p=>[Math.round($p.x), Math.round($p.y), Math.round($p.z)])
    const connect = ()=> {
        section.start()
    }
    const disconnect = ()=> {
        section.end()
    }
</script>

<div class="home" style={hiden?"display: none":""}>
    <Container name="login" title="Server login">
        <InputText name="host" value={host}>Host</InputText>
        <InputText name="port" value={port}>Port</InputText>
        {#if $online}
        <Button color={0} active={disconnect}>Disconnect</Button>
        {:else}
        <Button color={100} active={connect}>Connect</Button>
        {/if}
    </Container>

    <Container name={"info"} title="Infomation">
        <Label value={[$online]} inline>Online: </Label>
        <Label value={$pos} inline>Position: </Label>
        <!-- <ScoreBoard section={section}/> -->
    </Container>
    <Container name="inv">
        <Inventory section={section}/>
    </Container>
    <!-- <Container name='sb'>
    </Container> -->
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
