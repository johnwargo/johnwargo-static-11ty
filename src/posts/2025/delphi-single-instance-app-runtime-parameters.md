---
title: Delphi Single Instance App With Runtime Parameters
description: 
date: 2025-06-15
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Delphi
  - Microsoft Windows
timestamp: 2025-06-15T19:58:01.490Z
---

After I published Subdirectory Copy version 1.1 (v1.1.1.1), I realized that I should probably update the application so users can launch the application by double-clicking on one of the application project in Windows File Explorer (or its alternatives). I quickly added support for a single runtime parameter (the full path pointing to the project file):

``` pascal
procedure TfrmMain.FormCreate(Sender: TObject);
var
  tmpPath, tmpStr: String;
begin
  // if we have a command-line parameter and the specified file exists
  // then launch it
  if ParamCount > 0 then begin
    // Grab the first parameter
    tmpPath := ParamStr(1);
    if FileExists(tmpPath) then begin
      ProjectPath := tmpPath;
      OpenProject;
      Exit;
    end;
  end;

  // otherwise launch the last project opened
  tmpPath := ReadRegistryString(HKEY_CURRENT_USER, AppRegistryKey,
    keyProjectPath, '');
  if not tmpPath.IsEmpty then begin
    if FileExists(tmpPath) then begin
      ProjectPath := tmpPath;
      OpenProject;
    end;
  end;
end;
```

Next, I modified the [Inno Setup installer](https://jrsoftware.org/isinfo.php){target="_blank"} installer to register the file extension handler for the project file (`*.scpy`):

``` text
[Registry]

Root: HKCR; Subkey: ".scpy"; ValueType: string; ValueData: "SubdirectoryCopy"; Flags: uninsdeletevalue
Root: HKCR; Subkey: "SubdirectoryCopy"; ValueType: string; ValueData: "Program Subdirectory Copy"; Flags: uninsdeletekey
Root: HKCR; Subkey: "SubdirectoryCopy\DefaultIcon"; ValueType: string; ValueData: "{app}\subcopy.exe,0"
Root: HKCR; Subkey: "SubdirectoryCopy\shell\open\command"; ValueType: string; ValueData: """{app}\subcopy.exe"" ""%1"""
```

That all works (although I haven't published that version of the app yet), but then I realized I had a potential issue. What if the user ran two instances of the application at the same time? Thinking through it, it would actually work. I started thinking through it and realized that wouldn't be too much of a problem since even though multiple versions of the app could be copying the same files to different drives or copying multiple filesets to the same drive, since TeraCOpy was doing all of the work, I didn't have to worry about it. TeraCopy would succeed or crash and it wasn't my responsibility (I don't expect TeraCopy to crash, I expect it would handle it just fine).

To avoid any confusion, I decided to modify the application so only a single instance can run at any time. Doing that required being able to handle both launching a second instance by itself or launching a second instance with a runtime parameter (the path the project file to open).

{% sidebar "Excellent Source Article" %}
As I tried to figure this out on my own, I discovered <a href="https://delphidabbler.com/articles/article-13" target="_blank">How to run a single instance of an application</a> on the <a href="https://delphidabbler.com/" target="_blank">Delphi Dabbler</a> site. The article does a great job of explaining the process and is chock full of source code and I learned how to make it work using that article. Kudos to <a href="https://github.com/delphidabbler" target="_blank">@delphidabbler</a> for all  his work on the article.  

I published a complete sample project from that article's code, you can find it at <a href="https://github.com/johnwargo/delphi-single-instance-demo" target="_blank">Delphi Single Instance Demo</a>.
{% endsidebar %}

## Blocking a Second Application Instance

Blocking a second Delphi application instance from running is easy to implement in Delphi. 

First of all, you define a unique name for your application:

``` pascal
const
  AppWindowName = 'SingleInstance.johnwargo.com';
```

Next, on application launch, assign that name to your application in the application's main form code, overriding the form's `CreateParams` procedure:

``` pascal
procedure TfrmMain.CreateParams(var Params: TCreateParams);
begin
  inherited;
  StrCopy(Params.WinClassName, AppWindowName);
end;
```

**Note:** Refer to the full implementation of this in [Delphi Single Instance Demo](https://github.com/johnwargo/delphi-single-instance-demo){target="_blank"}; there's a little more to this than what I show here. The sample app has complete context and code.

Next, in the application project code (the project's `.dpr` file), check to see if that window (with the assigned name) already exists before initializing and launching a new instance of the application:

```pascal
program SingleInstance;

uses
  Vcl.Forms,
  System.SysUtils,
  Windows,
  Messages,
  main in 'main.pas' {frmMain} ,

{$R *.res}

var
  AppWindow: HWND;

begin
  AppWindow := FindWindow(AppWindowName, nil);
  // if this is the only instance, AppWindow will be 0
  if AppWindow <> 0 then begin
    // this kills the second instance
    halt;
  end;

  // We didn't have another instance to switch to, so start one up.
  Application.Initialize;
  Application.CreateForm(TfrmMain, frmMain);
  Application.Run;
end.
```

Its really as simple as that.

## Passing Runtime Parameters to the Initial Instance

There are two things missing from the previous example:

1. Activating the existing instance (making it visible and bringing it to the forefront) before closing the second instance.
2. Passing any command-line parameters (runtime parameters) from the second instance to the existing instance.

The demo application I published (link above) shows the complete code for this and you'll find a complete description of what's happening in the code in the [Delphi Dabbler](https://delphidabbler.com/articles/article-13){target="_blank"} article.

### Activating the Existing Instance

Its all fine and dandy to kill a second instance when launched, but for the best experience, you should automatically switch to (Activate) the original instance when you do so. The sample project does this by sending a message to the initial instance instructing it to display its application window:

```pascal
SendMessage(Wdw, UM_ENSURERESTORED, 0, 0);
```

This is the code that responds to the message, located in the application's main form code:

```pascal
procedure TfrmMain.UMEnsureRestored(var Msg: TMessage);
begin
  if IsIconic(Application.Handle) then
    Application.Restore;
  if not Visible then
    Visible := True;
  Application.BringToFront;
  SetForegroundWindow(Self.Handle);
end;
```
Here's what the code does:

1. The `IsIconic` asks whether the application is minimized; if it is, it restores (opens) the application window. 
2. If the application is not visible, it makes it visible
3. Brings the application to the forefront

The result of this is the application window appears on the screen (no matter what its original state was) and, to the user, it feels like it launched just like the user expected.

### Passing Command-line Parameters

To pass command-line parameters between a second application instance to the initial instance, the application sends a message between the application instances passing the command-line parameters from the second instance in the body of the message. Here's the code that sends the message between application instances"

```pascal
function SendParamsToPrevInst(Wdw: HWND): Boolean;
var
  CopyData: TCopyDataStruct;
  idx: Integer;
  CharCount: Integer;
  Data: PChar;
  PData: PChar;
begin
  // Initialize this here so we have a determined result
  Result := False;
  CharCount := 0;
  for idx := 1 to ParamCount do
    Inc(CharCount, Length(ParamStr(idx)) + 1);
  Inc(CharCount);
  Data := StrAlloc(CharCount);
  try
    PData := Data;
    for idx := 1 to ParamCount do begin
      StrPCopy(PData, ParamStr(idx));
      Inc(PData, Length(ParamStr(idx)) + 1);
    end;
    PData^ := #0;
    CopyData.lpData := Data;
    CopyData.cbData := CharCount * SizeOf(Char);
    CopyData.dwData := cCopyDataWaterMark;
    Result := SendMessage(Wdw, WM_COPYDATA, 0, LPARAM(@CopyData)) = 1;
  finally
    StrDispose(Data);
  end;
end;
```

The code builds a data object containing the list of strings (command-line parameters) and sends it to the original instance using `SendMessage`. Here's a [Embarcadero/Delphi blog post](https://blogs.embarcadero.com/using-wm_5f00_copydata/){target="_blank"} that describes this process.

In the application's main form, you must implement code to respond to the message:

```pascal
procedure TfrmMain.WMCopyData(var Msg: TWMCopyData);
var
  PData: PChar;
  Param: string;
begin
  if Msg.CopyDataStruct.dwData <> cCopyDataWaterMark then
    raise Exception.Create('Invalid data structure passed in WM_COPYDATA');
  PData := Msg.CopyDataStruct.lpData;
  while PData^ <> #0 do begin
    Param := PData;
    ProcessParam(Param);
    Inc(PData, Length(Param) + 1);
  end;
  Msg.Result := 1;
end;
```

In this example, the `ProcessParam` function represents code in your app that does something with those parameters.

### Putting it All Together

All there's left to do is update the code that launches the application do:

1. Check to see if an instance is already running
2. Pass any command-line parameters from the second instance to the initial instance
3. Activate the initial instance
4. Shutdown the second instance.

Here's the full Delphi Project file (`.dpr`) code from the sample application I published:

```pascal
program SingleInstance;

uses
  Vcl.Forms,
  Vcl.Dialogs,
  System.SysUtils,
  Windows,
  Messages,
  main in 'main.pas' {frmMain},
  AppSingleInstance in 'AppSingleInstance.pas';

{$R *.res}

var
  AppWindow: HWND;

begin
  AppWindow := FindWindow(AppWindowName, nil);
  // if this is the only instance, AppWindow will be 0
  if AppWindow <> 0 then begin
    if not SwitchToPrevInst(AppWindow) then begin
      MessageDlg('Unable to activate existing application instance',
        mtInformation, [mbOk], 0, mbOk);
    end;
    // this kills the second instance
    halt;
  end;

  // We didn't have another instance to switch to, so start one up.
  Application.Initialize;
  Application.CreateForm(TfrmMain, frmMain);
  Application.Run;
end.
```

The `AppSingleInstance` is a unit in the project where I put the utility functions described here. In the original article the author called it `UStartup`. I think my name is more descriptive, so I changed it.

In that unit is the `SwitchToPrevInst` function that does all of the work in the numbered list above:

```pascal
function SwitchToPrevInst(Wdw: HWND): Boolean;
begin
  Assert(Wdw <> 0);
  // Initialize this here so we have a determined result
  Result := True;
  // Do we have any runtime parameters?
  if ParamCount > 0 then begin
    // then send them to the existing application instance
    Result := SendParamsToPrevInst(Wdw);
  end;
  if Result then begin
    // Switch to the existing app window
    // this skips only if sending parameters fails
    SendMessage(Wdw, UM_ENSURERESTORED, 0, 0);
  end;
end;
```

## Wrap-up

That's it, that's the complete solution. My apologies for skipping some of the details behind all of this. In my defense, the original [Delphi Dabbler](https://delphidabbler.com/articles/article-13){target="_blank"} article explains everything in detail. Don't forget to check out the a complete sample project I built from from that article's code, you can find it at <a href="https://github.com/johnwargo/delphi-single-instance-demo" target="_blank">Delphi Single Instance Demo</a>. It gives you a complete, working example you can run and then study how this all works.
