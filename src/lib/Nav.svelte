<script>
  import Icon from "./Icon.svelte";
  /**
   *@type {*}
   */
  export let isUser = true;
  const classActive = "bg-white fill-black";
  const classInactive = "bg-black fill-white";
</script>
<div class="flex items-center bg-blue-600 h-10">
  <div class="bg-white w-24 h-6 rounded-lg m-auto">
    <form action="?/switch" method="post">
      <div class="grid grid-cols-2">
        <button
          disabled={isUser}
          type="submit"
          class={"focus:outline-0 flex rounded-l-lg justify-center border-r " +
            (isUser ? classActive : classInactive)}
        >
          <Icon name="user" size={1.7} class="fill-inherit transition-colors" />
        </button>
        <button
          disabled={!isUser}
          type="submit"
          class={"focus:outline-0 flex rounded-r-lg justify-center " +
            (!isUser ? classActive : classInactive)}
        >
          <Icon
            name="device"
            size={1.7}
            class="fill-inherit transition-colors"
          />
        </button>
      </div>
    </form>
  </div>
</div>
