---
title: Delphi Passing Data Between Forms
date: 2024-01-22
categories:
  - Delphi
  - Microsoft Windows
tags: post
---

I'm building a Windows application using Delphi and I needed the ability to access data on the main form from another form (a form invoked by the main form). I poked around on the Internet and found different ways to do it. 

I assume the Embarcadero web site has knowledge base articles on how to do this, but they apparently had hardware failures in their data center (who has their own data center anymore?) so most of their sites are down and have been for most of a week.

## My Research

The first example I found showed how to pass a data object when creating a form, then accessing that passed data object in the target form. I couldn't get it to work, but to be honest I didn't spend too much time trying.

Back to Stack Overflow, I found a question posted called [Delphi - passing variables to another form (without global variables)](https://stackoverflow.com/questions/65701313/delphi-passing-variables-to-another-form-without-global-variables){target="_blank"}. This article explains that I could create the target form, then set VCL component properties in the target form using data from the source form. That looked like a truly elegant solution and I immediately tried it out in my app. On the surface, this looked like a great solution. However, what the author failed to mention is that once you set those properties on the target form, any time you try to access the passed data from code on the target form the application crashes with an access violation. You can apparently use the data in a component (like a drop-down field or a text box) and change the value in it from the form, but as soon as I accessed the data in code, the app crashed.

For my particular application, what I'm trying to pass to the target form is a String List (`TStringList`) that I intend to access in code on the target form to manipulate the data (in this case, I'm generating a report from the data and saving it to file).

Alright, back to Stack Overflow (again) and it looks like I'm going to have to create a Global data value for my string list and access it everywhere in my app. 

Yes, I know that Delphi creates a Global variable for the main form in a Delphi application (and other forms too automatically); I've been a Delphi developer since v1 and a Turbo Pascal developer since the mid 80's. I can easily reference components on the source form from the target form's code. But that tightly couples the forms and even though I know now that the source form's data will always be available, I just don't like that approach. Having a globals file helps organize things as it's really easy to tell what's a global and what isn't when all globals are in the same file.

What I saw next on Stack Overflow suggested making a separate `globals` unit and use that unit wherever I needed.  Ok, that works for me and I can easily add other data values to it so I set about implementing it.
## Creating a Globals Unit

When I added a `globals` unit to the application, the IDE generated this:

```pascal
unit globals;

interface
  
implementation

end.
```

I know how to use this when I'm working with a form, but how do I build global data values in this thing? None of the articles I found showed me how, and of course the Embarcadero web sites are down.

Lets use my string list as an example. I know I want to expose my list to other parts of the app, so I need to put my variable declaration in the `interface` section.

```pascal
interface

var
  mystringList: TStringList;
```

But that doesn't work because `TStringList` is part of the `System.Classes` unit and this unit doesn't have a reference to it.  That code as I showed above won't compile.

I'm used to adding uses clause to the `implementation` section, but just for grins I moved what I needed to the `interface` section and it worked:

```pascal
interface

uses
  System.Classes;

var
  mystringList: TStringList;
```

Alright, my string list is defined, but it's not an `Integer` or `String` that I can use without initializing, so I have to find a way to `Create` the resource in the unit.

Not included in the generated unit file is an `initialization` section that I quickly added to the file:

```pascal
initialization

begin
  mystringList := TStringList.Create;
end;
```

With this in place, when the unit loads, it initializes the variable so it can be easily used by any part of the app that loads the unit.

Being an experienced Windows/Delphi developer, I know that I could get away with not disposing of my global variable when I'm done with it. Theoretically the app would clean up the allocated memory automatically when I close the application. Just to make sure though, I used the `finalization` option in the unit file to `free` up the variable:

```pascal
Finalization

begin
  mystringList.Free;
end;
```

When the app closes, Delphi calls the `finalization` code for every unit and the app releases the memory allocated for `myStringList`. 

With this in place, everything worked as expected. I loaded the `globals` unit in each form's `uses` clause and it worked like a champ. Here's the complete `globals` unit code:

```pascal
unit globals;

interface

uses
  System.Classes;

var
  mystringList: TStringList;
  
implementation

initialization

begin
  mystringList := TStringList.Create;
end;

finalization

begin
  mystringList.Free;
end;

end.
```
