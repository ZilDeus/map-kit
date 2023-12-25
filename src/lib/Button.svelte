<script>
  export let type = "button";
  export let formAction = null;
  export let disabled = false;
  export let onClick = null;
</script>

<button
  {disabled}
  {type}
  on:click={onClick()}
  formaction={formAction || null}
  class="{disabled == true
    ? 'bg-blue-200 hover:bg-grey-700'
    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'} inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none"
>
  <slot />
</button>
