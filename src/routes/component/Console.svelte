<script lang="ts">
    import type { Action } from "svelte/action";
    import type { ConsoleLogger } from "../script/console";

    export let logger: ConsoleLogger;
    const output = logger.output;
    const update: Action<HTMLElement, string[]> = (node, bar) => {
    return {
      update(bar) {
        let h = node.scrollHeight - node.clientHeight
        if (h - node.scrollTop < 64) {
          node.scrollTo(0, h)
        }
      },
  
      destroy() {},
    };
  };
</script>

<div use:update={$output}>
    {#each $output as msg}
        <p>{msg}</p>
    {/each}
</div>

<style lang='stylus'>
    div{
        margin: 1em
        margin-right: 0
        margin-bottom: -1em
        max-height: -webkit-fill-available
        overflow-y: scroll

        &::-webkit-scrollbar {
          width: 10px;
        }
        &::-webkit-scrollbar-track {
          background: transparent; 
        }
        &::-webkit-scrollbar-thumb {
          background: #888; 
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
    }
</style>

