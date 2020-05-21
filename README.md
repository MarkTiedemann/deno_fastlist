# fastlist

**List all running processes on Windows.**

For each process, fastlist returns (1) the **process ID**, (2) the **parent process ID**, and (3) the name of the **executable file**.

Like [`fastlist`](https://github.com/MarkTiedemann/fastlist), but for [Deno](https://deno.land).

## Quickstart

1. Download the plugin:

```batch
> curl -Lo fastlist-0.1.0.dll https://raw.githubusercontent.com/MarkTiedemann/deno_fastlist/0.1.0/fastlist.dll
```

2. Run the example code:

```batch
> deno run --unstable --allow-plugin https://raw.githubusercontent.com/MarkTiedemann/deno_fastlist/0.1.0/example.ts
:: fictional example output:
:: exe           | pid | ppid
[System Process]   0     0
cmd.exe            0     1
deno.exe           1     2
```

## License

MIT
