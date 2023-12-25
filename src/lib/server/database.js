import { eq, and, param } from "drizzle-orm";
import { serial, text, pgTable, integer, primaryKey, numeric } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
const connectionString = "postgresql://postgres:zU6ukDl7BJuWxKlE@db.jwckdpabakzlwnejbbsd.supabase.co:5432/postgres";
const client = postgres(connectionString)
const db = drizzle(client);
export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const device = pgTable("device", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  longitude: numeric("longitude").notNull(),
  latitude: numeric("latitude").notNull(),
});

export const user_devices = pgTable("user_devices", {
  user: integer("user").notNull(),
  device: integer("device").notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.user, table.device] }),
  };
});
/** @param {string} name @param {string} email @param {string} password */
export async function RegisterUser(name, email, password) {
  await db.insert(user).values({ name: name, email: email, password: password });
}

export async function RegisterDevice(name, longitude, latitude) {
  const devices = await db.select({ id: device.id }).from(device).where(eq(device.name, name));
  if (devices[0])
    await db.update(device).set({ longitude: longitude, latitude: latitude }).where(eq(device.name, name));
  else
    await db.insert(device).values({ name: name, longitude: longitude, latitude: latitude });
}

export async function GetDeviceFromName(name) {
  return await db.select({ id: device.id, name: device.name }).from(device).where(eq(device.name, name))[0];
}
/** @param {[]} ids  */
export async function GetUserDevies(id) {
  const usersDevices = await db.select().from(user_devices);
  const devices = await db.select().from(device);
  let userDivces = [];
  usersDevices.forEach(d => {
    if (id == d.user) {
      const temp = devices.find((device) => device.id == d.device);
      userDivces.push(temp);
    }
  });
  return userDivces;
}
export async function AddDeviceToUser(user, deviceName) {
  const deviceId = await db.select({ id: device.id }).from(device).where(eq(deviceName, device.name));
  if (deviceId[0])
    await db.insert(user_devices).values({ user: user, device: deviceId[0].id });
}
/** @param {string} email @param {string} password */
/** @param {string} email @param {string} password */
export async function GetUserId(email, password) {
  let id = -1;
  const res = await db.select({ id: user.id }).from(user).where(and(eq(user.email, email), eq(user.password, password)));
  id = res[0].id;
  return id.toString();
}
export async function GetUser(id) {
  const res = await db.select().from(user).where(eq(user.id, id));
  return res[0];
}
