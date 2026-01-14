---
title: Delphi ListBox Move Multiple Selected Items
description: I was working on a Windows application project in Delphi that required moving items around within a Delphi standard ListBox. It's pretty easy to swap list item position when only a single item is selected, but once you enable `multiselect` on the component, things become more difficult. As I poked around on the Internet for solutions, I couldn't find a complete example, so I decided to create and publish one.
date: 2024-03-23
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Delphi
---

I worked on a Windows application project in Delphi that required moving selected items around within a Delphi standard [ListBox](https://docwiki.embarcadero.com/Libraries/Alexandria/en/Vcl.StdCtrls.TListBox){target="_blank"}. It's pretty easy to swap single list item positions, but once you enable `multiselect` on the component, things become more difficult. As I poked around on the Internet for solutions, I couldn't find a complete example, so I decided to create and publish one. Here it is.

Here's an image of the application in action:

<img src="src/images/2024/delphi-listbox-move.png" alt="An image of the application running" />

When you run the app, it opens with a list of random words paired into 2, 3 or 4 word phrases in the list box. Select one or more items in the list, then click the buttons to move the selected items to the Top or Bottom of the list or to move them up or down.

Take a look at the source code to see how this works. I also published compiled executables just in case you need them. You can find all of the code in [Delphi ListBox Multiselect Item(s) Move Demo](https://github.com/johnwargo/Delphi-ListBox-Move-Demo){target="_blank"}. Let me know if you have any issues with the code.
