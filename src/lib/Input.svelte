<script>
  export let value = "";
  export let id = "";
  export let label;
  export let type = "text";
  export let name = "";
  export let required = false;
  export let onChange = null;
  export let onInput = null;

  export let inputRef = null;

  function setType(node) {
    node.type = type;
  }
</script>

<div class={$$props.class}>
  <label for={id} class="block text-sm font-medium text-black drop-shadow-lg">
    {label}
  </label>
  <div class="my-1">
    <input
      use:setType
      {name}
      {id}
      {required}
      step="0.1"
      bind:value
      on:change={onChange}
      on:input={onInput}
      bind:this={inputRef}
      class="shadow-sm focus:ring-yellow-400 focus:border-yellow-400 block w-full sm:text-sm rounded-md py-3 outline-none p-2.5 border border-blue-700"
    />
  </div>
</div>
