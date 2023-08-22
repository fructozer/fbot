<script lang="ts">
    export let value: Boolean
    export let name: string = ""
</script>
<div>
    {#if value}
    <span></span>
    {/if}
</div>

<style>
    div {
        --size: 16px;
        width: 16px;
        height: 16px;
        display: inline-block;
        background: #585659;
        border: 2px solid black;
    }
    span {
        margin: 2px;
        width: calc(var(--size) - 8px);
        height: calc(var(--size) - 8px);
        display: block;
        background: #c2c2c2;
        border-top: 2px #ffffff solid;
        border-left: 2px #8b8b8b solid;
        border-bottom: 2px #8b8b8b solid;
        border-right: 2px #ffffff solid;
    }
</style>