<script lang="ts">
    import { setContext } from "svelte";
    import InputText from "../component/InputText.svelte";

    export let section: any
    export let hiden: boolean
    setContext("section", section)
</script>
<div style={hiden?"display: none":""}>
    <dev class="toolbar">
        <InputText placeholder="Search" />
    </dev>
</div>