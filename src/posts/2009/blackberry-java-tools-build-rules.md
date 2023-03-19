---
title: BlackBerry Java Tools Build Rules
date: 2009-06-22
categories: [BlackBerry]
tags: post
---

While writing book chapters  on the BlackBerry Java Development Environment (JDE) and the BlackBerry JDE Plug-in for Eclipse (eJDE) I came across a feature that just wasn't documented anywhere. Both tools support definition of 'Build Rules' but the online help, the knowledge base and the internet as a whole doesn't have anything about them. RIM was kind enough to explain it to me:

A build rule is a command string which is executed even before the "Pre-build" command. It can be any command which can be executed in the DOS console. Developers usually use it to manipulate files:  
  
copy \*.e1 to \*.e2  
  
delete \*.e1  
  
Developer can define multiple build rules.