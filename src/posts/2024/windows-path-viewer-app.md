---
title: Windows Path Viewer App
description: 
date: 2024-01-21
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Delphi
  - Microsoft Windows
---

A while back I had a problem with my Windows Path that I wrote about in [Windows Path Items Not Available in Visual Studio Code](https://randomerrors.dev/posts/2023/windows-path-items/){target="_blank"}. I was thinking about that problem recently and decided to build my own tooling for managing my system path. I didn't do this because I needed to, but I wanted to write some Windows code (Using Delphi) and this topic is interesting.

As I was playing around with the code, I ran into an issue that I simply couldn't figure out. It turned out to be a Stupid User Problem (me), you can read about it here: [Delphi Read Windows 11 System Path](https://stackoverflow.com/questions/77849168/delphi-read-windows-11-system-path){target="_blank"}. Anyway, in order to ask that question, I needed to build a sample app that demonstrated the problem. My current project  has a lot of other code in it and I use some VCL components many other people won't have, so I decided to build a limited scope sample application and share the link to that project in the Stack Overflow question. 

Windows stores the User Path in `HKEY_CURRENT_USER\Environment` and the System Path in `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`, so the code has to pull the values from different parts of the Registry. 

Windows stores the path as a string, so to display it in the Listboxes, the app splits the string into an array using:

```pascal
if Length(pathStr) > 0 then begin
  pathArray := pathStr.Split([';'], TStringSplitOptions.ExcludeEmpty);
  pathList.Items.AddStrings(pathArray);
end;
```

## The Code

Here's the core of the application's code.

```pascal
procedure PopulateList(pathList: TListBox; theHKey: HKEY;
  regKey, regProperty: String);
var
  Reg: TRegistry;
  pathArray: Tarray<String>;
  pathStr: String;
begin
  Reg := TRegistry.Create(KEY_READ);

  Reg.rootKey := theHKey;
  if Reg.KeyExists(regKey) then begin
    if Reg.OpenKey(regKey, false) then begin
      if Reg.ValueExists(regProperty) then begin
        pathStr := Reg.Readstring(regProperty);
        if Length(pathStr) > 0 then begin
          pathArray := pathStr.Split([';'], TStringSplitOptions.ExcludeEmpty);
          pathList.Items.AddStrings(pathArray);
        end;
      end else begin
        ShowMessage(Format('Property "%s" does not exist.', [regProperty]));
      end;
      Reg.CloseKey;
    end else begin
      ShowMessage(Format('Path and cannot open open: %s', [regKey]));
    end;
  end;

end;

procedure TfrmMain.FormActivate(Sender: TObject);
begin
  PopulateList(UserPathList, HKEY_CURRENT_USER, 'Environment', pathProperty);
  PopulateList(SystemPathList, HKEY_LOCAL_MACHINE,
    '\SYSTEM\CurrentControlSet\Control\Session Manager\Environment',
    pathProperty);
end;

procedure TfrmMain.FormCreate(Sender: TObject);
begin
  PanelMain.Align := alClient;
  UserGroupBox.Height :=
    (PanelMain.Height - (UserGroupBox.Padding.Top +
    UserGroupBox.Padding.Bottom)) div 2;
  UserGroupBox.Align := alTop;
  SystemGroupBox.Align := alClient;
end;
```

Here's a screen shot of the application:

{% image "src/images/2024/windows-path-viewer-app.png", "Windows Path View App", "image-full" %}

## Changing the Path

The application opens the Registry for read-only access, so it can't make any changes to the Path (or any other part of the registry for that matter). In order to make changes to the Path values, you must do three things. 

First, in your code, you must open the Registry for write access:

```pascal
Reg := TRegistry.Create(KEY_ALL_ACCESS);
```

Next, you must run the application with Administrator access. This is because an everyday Windows user doesn't have access to modify the System Path. Users can modify their User path all day long, but as soon as you try to change the System Path, the app will crash. To enable admin mode in the Delphi IDE, open **Projects** -> **Options** and select the **Manifest** section. Set **Execution Level** to **Require Administrator** and save your changes. 

{% image "src/images/2024/delphi-project-options-manifest.png", "Delphi Project Settings Manifest Settings dialog", "image-full" %}

Finally, you must run Delphi with administrator privileges, otherwise you won't be able to test write access to the System Path. If you forget to do this and you launch a project that requires administrator access, Delphi will display an error indicating "The requested operation requires elevation."

{% image "src/images/2024/delphi-requires-elevation.png", "Delphi Error Requires Elevation", "image-full" %}

## Source Code

I published all the code into a stand-alone Delphi app called [Windows Path Viewer Delphi](https://github.com/johnwargo/windows-path-viewer-delphi){target="_blank"}

