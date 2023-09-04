<script lang="ts">
    import { getContext } from "svelte";
    import type { BotSection } from "../script/bots";

    export let section: BotSection = getContext("section");
    export let hiden: boolean
</script>
<div style={hiden?"display: none":""}>
    State
</div>