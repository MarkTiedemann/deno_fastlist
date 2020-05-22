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
  for (let i = 0; i < res.length; ) {
    /*
     *  Offset | Bytes | Description
     *  -------|-------|----------------------
     *  0      | 4     | process ID
     *  4      | 4     | parent process ID
     *  8      | 2     | executable length (n)
     *  10     | n     | executable
     * */
    let pid = view.getUint32(i);
    let ppid = view.getUint32(i + 4);
    let exe_len = view.getUint16(i + 8);
    let exe_start = i + 10;
    let exe_end = exe_start + exe_len;
    let exe = res.subarray(exe_start, exe_end);
    tasks.push([pid, ppid, exe]);
    i = exe_end;
  }
  return tasks;
}
