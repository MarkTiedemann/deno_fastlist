@echo off
if not exist make-4.2.exe curl -o make-4.2.exe https://raw.githubusercontent.com/MarkTiedemann/make-for-windows/master/make-4.2/64/make.exe
make-4.2.exe %*