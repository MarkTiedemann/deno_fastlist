# fastlist

**List all running processes on Windows.**

Like [`fastlist`](https://github.com/MarkTiedemann/fastlist), but for [Deno](https://deno.land/). A faster alternative to [`tasklist`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/tasklist).

For each process, fastlist returns (1) the **process ID**, (2) the **parent process ID**, and (3) the name of the **executable file**.

## Quickstart

1. Download the [`fastlist-0.2.0.dll`](fastlist-0.2.0.dll) plugin:

```batch
> curl -O https://raw.githubusercontent.com/MarkTiedemann/deno_fastlist/0.2.0/fastlist-0.2.0.dll
```

2. Run the [`example.ts`](example.ts) code:

```typescript
// example.ts
import { fastlist } from "https://deno.land/x/fastlist@0.2.0/mod.ts";

let decoder = new TextDecoder();
let plugin = Deno.openPlugin("fastlist-0.2.0.dll");
for (let [pid, ppid, exe] of fastlist(plugin)) {
  console.log(pid + "\t" + ppid + "\t" + decoder.decode(exe));
}
Deno.close(plugin);
```

```batch
> deno run --unstable --allow-plugin https://deno.land/x/fastlist@0.2.0/example.ts
0       0       [System Process]
4       0       System
72      4       Secure System
128     4       Registry
520     4       smss.exe
740     632     csrss.exe
828     632     wininit.exe
...
```

## Development

- Install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- Install [Rust](https://rustup.rs/)
- Run [`make`](make.cmd)

## License

MIT
