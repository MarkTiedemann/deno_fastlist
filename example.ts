import { fastlist } from "./fastlist.js";

let decoder = new TextDecoder();
let plugin = Deno.openPlugin("fastlist-0.1.0.dll");
for (let [pid, ppid, exe] of fastlist(plugin)) {
  console.log(decoder.decode(exe) + "\t" + pid + "\t" + ppid);
}
Deno.close(plugin);
