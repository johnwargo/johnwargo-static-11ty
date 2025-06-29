---
title: Install Windows DLL Using Inno Setup
description: 
date: 2025-06-28
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Delphi
timestamp: 2025-06-28T21:50:46.232Z
---

I recently wrote a Delphi application for Windows that implements a Windows Shell Extension which means I must distribute it as a DLL. I've used [Inno Setup](https://jrsoftware.org/isinfo.php){target="_blank"} for a while now to create and publish Windows installers, but I'd never created one before for a DLL. 

I recently started to trust Google Gemini more and more for answers when searching for technical solutions, but when it came to figuring out how to make a DLL installer using Inno Setup, Gemini failed me multiple times. It seemed to understand the question and showed me detailed code blocks that supposedly solved my problem, but none of them work. For the most part, the code wouldn't even compile and, after modifying it so it compiled, never successfully installed the DLL. 

I finally found articles (no AI-generated stuff) that pointed to the correct solution, so I thought I'd post my findings to help others in the same situation. 

The core of the solution is the following code in the project's `setup.iss` file:

``` pascal
[Setup]
UninstallDisplayIcon={app}\mydll.ico
ArchitecturesInstallIn64BitMode=x64Compatible
PrivilegesRequired=admin

[Files]
Source: "mydll.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "mydll.ico"; DestDir: "{app}"

[Run]
Filename: "{sysnative}\regsvr32.exe"; Parameters: """{app}\mydll.dll"""; Flags: runhidden waituntilterminated
 
[UninstallRun]
Filename: "{sysnative}\regsvr32.exe"; Parameters: "/u ""{app}\mydll.dll"""; RunOnceId: "My DLL"; Flags: runhidden waituntilterminated
```
There's a lot more to a complete Inno Setup file, but I want to focus on the things I had to change to install the DLL. Let me take you through the sections...

## Setup

+ `UninstallDisplayIcon`: The project doesn't install with an app executable, so I can't point the installer at the app executable for the uninstall icon. So, I found some representative icon and included its file in the installer (see the `Files` section below).
+ `ArchitecturesInstallIn64BitMode`: I compiled my DLL only for Windows 64, so this tells Inno Setup to support a 64 bit install.
+ `PrivilegesRequired`: I'm registering a DLL, so the installer must run with admin privileges. This enables Admin install and is the default, but I set it anyways just to make sure.

## Files

Source files:

+ `mydll.dll`: The compiled DLL
+ `mydll.ico`: The uninstaller icon for the project

## Run

Calls the 64-bit version of `RegSvr32.exe` and instructs it to execute the DLL's `UpdateRegistry` code. This code adds the entry for the DLL's shell extension in the Windows Registry.

```pascal
procedure TMyDll_Factory.UpdateRegistry(Register: Boolean);
const
  RegKey = '\*\ShellEx\ContextMenuHandlers\MyDLL';
var
  Reg: TRegistry;
begin
  inherited UpdateRegistry(Register);
  Reg := TRegistry.Create;
  Reg.RootKey := HKEY_CLASSES_ROOT;
  try
    if Register then
      if Reg.OpenKey(RegKey, True) then
        Reg.WriteString('', GUIDToString(Class_MyDLL));
    if not Register then
      if Reg.OpenKey(RegKey, False) then
        Reg.DeleteKey(RegKey);
  finally
    Reg.CloseKey;
    Reg.Free;
  end;
end;
```

## UninstallRun

When uninstalling the DLL, calls the code from the section above to delete the shell extension registration Registry key.
