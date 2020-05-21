/**
 * List all running processes on Windows.
 */
export function fastlist(plugin: number) {
  // @ts-ignore
  let ops = Deno.core.ops();
  // @ts-ignore
  let res: Uint8Array = Deno.core.dispatch(ops.fastlist);
  let view = new DataView(res.buffer);
  let tasks: Array<[number, number, Uint8Array]> = [];
  let task_size = 270;
  for (let i = 0; i < res.length; i += task_size) {
    tasks.push([
      view.getUint32(i),
      view.getUint32(i + 4),
      res.subarray(i + 10, i + task_size - view.getUint16(i + 8)),
    ]);
  }
  return tasks;
}
