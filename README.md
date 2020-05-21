# fastlist

**List all running processes on Windows.**

For each process, fastlist returns (1) the **process ID**, (2) the **parent process ID**, and (3) the name of the **executable file**.

Like [`fastlist`](https://github.com/MarkTiedemann/fastlist), but for [Deno](https://deno.land).

## Quickstart

1. Download the [`fastlist-0.1.0.dll`](fastlist-0.1.0.dll) plugin:

```batch
> curl -O https://raw.githubusercontent.com/MarkTiedemann/deno_fastlist/0.1.0/fastlist-0.1.0.dll
```

2. Run the [`example.ts`](example.ts) code:

```batch
> deno run --unstable --allow-plugin https://raw.githubusercontent.com/MarkTiedemann/deno_fastlist/0.1.0/example.ts
:: fictional example output:
:: exe           | pid | ppid
[System Process]   0     0
cmd.exe            1     0
deno.exe           2     1
```

## Development

- Install [Microsoft C++ Build Tools
](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- Install [Rust](https://rustup.rs/)
- Run `make`

## License

MIT
