/**
 * List all running processes on Windows.
 * @param {number} plugin
 * @returns {[[number, number, Uint8Array]]}
 */
export function fastlist(plugin) {
  let ops = Deno.core.ops();
  let res = Deno.core.dispatch(ops.fastlist);
  let tasks = [];
  let view = new DataView(res.buffer);
  let task_size = 270;
  for (let i = 0; i < res.length; i += task_size) {
    tasks.push([
      view.getUint32(i),
      view.getUint32(i + 4),
      res.subarray(i + 10, i + (270 - view.getUint16(i + 8))),
    ]);
  }
  return tasks;
}
