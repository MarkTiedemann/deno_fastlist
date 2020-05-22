import { fastlist } from "./mod.ts";

let decoder = new TextDecoder();
let plugin = Deno.openPlugin("fastlist-0.3.0.dll");
for (let [pid, ppid, exe] of fastlist(plugin)) {
  console.log(pid + "\t" + ppid + "\t" + decoder.decode(exe));
}
Deno.close(plugin);
