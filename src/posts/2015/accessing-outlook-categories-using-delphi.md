---
title: Accessing Outlook Categories Using Delphi
description: 
date: 2015-09-27
headerImage: 
categories: [Miscellaneous]
tags: post
---

As I mentioned in my previous post, I'm helping a friend with some Microsoft Outlook integration and came across the need to access the list of meeting and email categories defined within Outlook. Microsoft has done a great job of [documenting the object model for Outlook](https://msdn.microsoft.com/en-us/library/microsoft.office.interop.outlook(v=office.14).aspx){target="_blank"}, so it's quick work in Delphi to open an OLE connection to Outlook and get a listing of the Categories. The code's below, but I also [posted the complete project to GitHub](https://github.com/johnwargo/Outlook-Get-Categories-Delphi{target="_blank"}).

Here's the code:

```pascal
var category, outlook, ns: OLEVariant;   
i, numItems: Integer;  
  
begin  
  // initialize a connection to Outlook  
  outlook := CreateOLEObject('Outlook.Application');  
  // get the MAPI namespace  
  ns := outlook.GetNamespace('MAPI');   
  numItems := ns.Categories.Count;   
  output.Lines.add(Format('Found %d items', [numItems]));
  if numItems > 0 then begin  
     for i := 1 to numItems do begin  
        category := ns.Categories.Item[i];  
        // category.Name is the name of the category  
        // category.CategoryID is an internal, unique ID for the category  
        output.Lines.add(Format('%d: %s: (%s)', [i, category.Name, category.CategoryID]));  
     end;  
  end;  
end;
```

The output object is a TMemo component on the app's main form, so it is used to list all of the categories when the app initializes. The app doesn't do anything with the categories, this is just an example of how to retrieve them.