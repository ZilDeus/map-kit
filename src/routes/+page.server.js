import { dev } from "$app/environment";
import { AddDeviceToUser, GetUser, GetUserDevies, GetUserId, RegisterUser, device } from "$lib/server/database";
import { redirect } from "@sveltejs/kit";

/**
  * @param {import("@sveltejs/kit").ServerLoadEvent} event 
  */
export async function load(event) {
  if (!event.cookies.get("user-type")) {
    console.log("user type cookie not found, creating cookie");
    event.cookies.set('user-type', 'user', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 30
    });
    console.log("user type cookie has been set to type user");
  }
  else {
    const userType = event.cookies.get('user-type');
    console.log("the value of user-type cookie is", userType);
    if (userType != "user")
      redirect(302, "./device");
  }
  let userId = "";
  let userName = "";
  let devices = [];
  if (event.cookies.get("user-id")) {
    userId = event.cookies.get("user-id");
    userName = (await GetUser(userId)).name;
    devices = await GetUserDevies(userId);
  }
  console.log(userId);
  console.table(devices);
  return {
    userId: userId,
    userName: userName,
    devices: devices,
  };
}
export const actions = {
  /** @param {import("@sveltejs/kit").ServerLoadEvent} event */
  switch: async (event) => {
    console.log("switching to device")
    event.cookies.set('user-type', 'device', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 30
    });
  },
  /** @param {import("@sveltejs/kit").ServerLoadEvent} event */
  login: async (event) => {
    console.log("loging-in")
    const form = await event.request.formData();
    const email = form.get("email");
    const password = form.get("password");
    let user_id = await GetUserId(email, password);
    event.cookies.set('user-id', user_id, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 30
    });
  },
  /** @param {import("@sveltejs/kit").ServerLoadEvent} event */
  register: async (event) => {
    console.log("register")
    const form = await event.request.formData();
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    RegisterUser(name, email, password);
  },
  /** @param {import("@sveltejs/kit").ServerLoadEvent} event */
  addDevice: async (event) => {
    console.log("adding a device")
    const form = await event.request.formData();
    const device = form.get("device");
    const user = event.cookies.get("user-id");
    console.log(device, user);
    AddDeviceToUser(user, device);
  },
};
