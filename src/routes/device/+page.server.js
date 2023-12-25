import { dev } from "$app/environment";
import { RegisterDevice } from "$lib/server/database";
import { redirect } from "@sveltejs/kit";

/** @param {import("@sveltejs/kit").ServerLoadEvent} event */
export function load(event) {
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
    if (userType != "device")
      redirect(302, "./");
  }
  let deviceId = "";
  if (event.cookies.get("device-id")) {
    deviceId = event.cookies.get("device-id")
  }
  return {
    deviceId: deviceId,
  }
}
export const actions = {
  /** @param {import("@sveltejs/kit").ServerLoadEvent} event */
  switch: async (event) => {
    console.log("switching to user")
    event.cookies.set('user-type', 'user', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 30
    });
  },
  /** @param {import("@sveltejs/kit").ServerLoadEvent} event */
  set: async (event) => {
    let deviceId = event.url.searchParams.get("device-id");
    let longitude = event.url.searchParams.get("longitude");
    let latitude = event.url.searchParams.get("latitude");
    if (deviceId == "")
      deviceId = "0";
    console.log("setting device id", deviceId)
    event.cookies.set('device-id', deviceId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 30
    });
    await RegisterDevice(deviceId, longitude, latitude);
  },
}
