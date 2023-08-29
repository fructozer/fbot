<script lang="ts">
    import type { Action } from "svelte/action";
    import type { ConsoleLogger } from "../script/console";
    import Button from "./Button.svelte";
    import { writable } from "svelte/store";
    import lock from '$lib/assets/lock.png'
    import unlock from '$lib/assets/unlock.png'

    export let logger: ConsoleLogger;
    const output = logger.output;
    const locked = writable(false)
    const update: Action<HTMLElement, string[]> = (node, bar) => {
    return {
      update(bar) {
        let h = node.scrollHeight - node.clientHeight
        if ($locked || h - node.scrollTop < 64) {
          node.scrollTo(0, h)
        }
      },
  
      destroy() {},
    };
  };
</script>

<div use:update={$output}>
    {#if $locked}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
      <img role="button" src={lock} alt="locked" on:click={()=>{locked.set(false)}}>
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
      <img role="button" src={unlock} alt="unlocked" on:click={()=>{locked.set(true)}}>
    {/if}
    {#each $output as msg}
        <p>{@html msg}</p>
    {/each}
</div>

<style lang='stylus'>
    div{
        margin: 1em
        margin-right: 0
        margin-bottom: -1em
        max-height: -webkit-fill-available
        overflow-y: scroll

        &::-webkit-scrollbar {width: 10px;}
        &::-webkit-scrollbar-track {background: transparent; }
        &::-webkit-scrollbar-thumb {background: #888; }
        &::-webkit-scrollbar-thumb:hover {background: #555; }
    }
    img {
      height: 1.5rem
      filter: invert(0.7)
      position: absolute
      top: 2rem
      right: 2rem
      &:hover{
        filter: invert(1)
      }
    }
</style>

