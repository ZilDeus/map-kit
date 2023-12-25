<script>
  import Input from "$lib/Input.svelte";
  import Button from "$lib/Button.svelte";
  import LOGO from "$res/logo-fixed-full.svg";
  let email = "";
  let password = "";
  let confirmPassword = "";

  function validatePassword(password, confirmPassword) {
    return password.length <= 0 || confirmPassword !== password;
  }
</script>

<form method="post" class="space-y-5 {$$props.class}" action="?/register">
<img src={LOGO} alt="" class="w-4/5 self-center" />
  <Input label="Name" id="name" name="name" type="name" />
  <Input
    label="Email"
    id="email"
    name="email"
    type="email"
    bind:value={email}
  />
  <Input
    label="Password"
    id="password"
    name="password"
    type="password"
    bind:value={password}
  />
  <Input
    label="Confirm Password"
    id="confirm-password"
    name="confirm-password"
    type="password"
    bind:value={confirmPassword}
  />
  {#if confirmPassword !== "" && confirmPassword !== password}
    <p class="text-red-600 text-sm font-semibold">Password not match</p>
  {/if}
  <div class="flex flex-row justify-around md:flex-col">
    <Button type="submit" disabled={validatePassword(password, confirmPassword)}
      >Sign up</Button
    >
    <Button type="submit" formAction="?/login" disabled={password.length <= 0 || email.length <= 0}
      >Sign In</Button
    >
  </div>
</form>
