extern crate winapi;
use deno_core::plugin_api::Buf;
use deno_core::plugin_api::Interface;
use deno_core::plugin_api::Op;
use deno_core::plugin_api::ZeroCopyBuf;
use std::mem::{size_of, transmute};
use winapi::shared::minwindef::FALSE;
use winapi::um::handleapi::{CloseHandle, INVALID_HANDLE_VALUE};
use winapi::um::tlhelp32::{
  CreateToolhelp32Snapshot, Process32First, Process32Next, PROCESSENTRY32, TH32CS_SNAPPROCESS,
};

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
  interface.register_op("fastlist", op_test_async);
}

fn op_test_async(
  _interface: &mut dyn Interface,
  _data: &[u8],
  _zero_copy: Option<ZeroCopyBuf>,
) -> Op {
  unsafe {
    let mut vec: Vec<u8> = Vec::new();
    let snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if snap == INVALID_HANDLE_VALUE {
      let res: Buf = vec.into_boxed_slice();
      return Op::Sync(res);
    }
    let mut entry = PROCESSENTRY32 {
      dwSize: size_of::<PROCESSENTRY32>() as u32,
      cntUsage: 0,
      th32ProcessID: 0,
      th32DefaultHeapID: 0,
      th32ModuleID: 0,
      cntThreads: 0,
      th32ParentProcessID: 0,
      pcPriClassBase: 0,
      dwFlags: 0,
      szExeFile: [0; 260],
    };
    if Process32First(snap, &mut entry) == FALSE {
      CloseHandle(snap);
      let res: Buf = vec.into_boxed_slice();
      return Op::Sync(res);
    }
    loop {
      let pid: [u8; 4] = transmute(entry.th32ProcessID.to_be());
      let ppid: [u8; 4] = transmute(entry.th32ParentProcessID.to_be());
      let exe: [u8; 260] = transmute(entry.szExeFile);
      let len_exe: [u8; 2] =
        transmute((exe.iter().rev().position(|&c| c != 0).unwrap_or(0) as u16).to_be());
      vec.extend(pid.iter());
      vec.extend(ppid.iter());
      vec.extend(len_exe.iter());
      vec.extend(exe.iter());
      entry.szExeFile = [0; 260];
      if Process32Next(snap, &mut entry) == FALSE {
        break;
      }
    }
    CloseHandle(snap);
    let res: Buf = vec.into_boxed_slice();
    Op::Sync(res)
  }
}
