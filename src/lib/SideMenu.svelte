<script>
  import Icon from "./Icon.svelte";
  let open = false;
</script>

{#if open}
  <div class="flex flex-col border-r border-r-black bg-gray-200 w-72">
    <div class="flex h-10 bg-gray-400 items-center justify-end">
      <button
        on:click={() => {
          open = !open;
        }}
      >
        <Icon name="menu" size={2} />
      </button>
    </div>
    <slot />
  </div>
{:else}
  <div class="flex flex-col border-r border-r-black bg-gray-200 w-8">
    <div class="flex h-10 bg-gray-400 items-center justify-end">
      <button
        on:click={() => {
          open = !open;
        }}
      >
        <Icon name="menu" size={2} />
      </button>
    </div>
    <Icon name="devices" size={2} />
    <Icon name="user" size={2} />
  </div>
{/if}
