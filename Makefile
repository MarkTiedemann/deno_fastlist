SHELL := cmd.exe
DENO_VERSION := 1.0.1
PLUGIN_VERSION := 0.1.0

.PHONY: all
all: fastlist-$(PLUGIN_VERSION).dll fastlist.js deno-$(DENO_VERSION).exe
	deno-$(DENO_VERSION).exe run --unstable --allow-plugin example.ts

fastlist-$(PLUGIN_VERSION).dll: src\lib.rs
	cargo build --release --target x86_64-pc-windows-msvc
	move /y target\x86_64-pc-windows-msvc\release\fastlist.dll fastlist-$(PLUGIN_VERSION).dll

deno-$(DENO_VERSION).exe:
	curl -Lo deno.zip https://github.com/denoland/deno/releases/download/v$(DENO_VERSION)/deno-x86_64-pc-windows-msvc.zip
	powershell -c "Expand-Archive -Path deno.zip -DestinationPath ."
	del /q deno.zip
	ren deno.exe deno-$(DENO_VERSION).exe
