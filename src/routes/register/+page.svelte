<script>
  import SignUpForm from "$lib/SignUpForm.svelte";
  import LOGO from "$res/logo.png";
  import BANNER from "$res/banner.jpg";
  import { page } from "$app/stores";
</script>

{#if $page.url.searchParams.get("success") === "false"}
  <dev
    class="mx-0 bg-red-700 grid grid-rows-1 text-center text-white transition ease-in delay-100"
    >fail</dev
  >
{/if}
<div class="w-full h-full bg-black">
  <img src={BANNER} class="absolute w-full h-full"/>
  <div class="flex flex-col items-center justify-center z-10">
    <img src={LOGO} />
    <SignUpForm
      class="max-w-xl w-full m-auto px-2 bg-white rounded-lg p-4 grow"
    >
      <p class="text-white">
        <a class="text-blue-300 font-bold" href="/">Sign-in</a>?
      </p>
    </SignUpForm>
  </div>
</div>
