---
title: Domino & BlackBerry Java Applications Part 3
date: 2009-10-04
categories: [BlackBerry]
tags: post
---

Introduction
============

**Note:** removed obsolete attachments November 11, 2022

In [Part 1](index.php/Domino/dbja1.html) in this series, I showed how to build a simple Domino Web Service that performed a lookup against a contact database built from the standard public Domino Directory template (pubnames.ntf) and in [Part 2](index.php/BlackBerry/dbja2.html) and [Part 2.5](index.php/Miscellaneous/bbdja25.html) I demonstrated how to build the Java stub class that can be used to consume the web service. 

In this installment, I’ll demonstrate how to build a simple Java application that uses the generated code to access the web service. At this point, you’ll need:

1.  A Domino server hosting the database provided in Part 1. The server must be running the HTTP process and the database ACL must be configured with the appropriate access.
2.  The generated class files for the service. These files were generated in Part 2.
3.  A functioning BlackBerry Java Development environment configured on your system that includes the appropriate Sun Java Development Kit (JDK) plus the appropriate BlackBerry Java development tools (either the JDE or the JDE Plug-in for Eclipse and the appropriate JDE Component package installed). Refer to the BlackBerry Developer’s web site www.blackberry.com/developers for information on how to download and configure these tools. The ability to consume web services using JSR 172 was added in BlackBerry Device Software 4.3, so be sure you are using the right tools (version 4.3 or higher).

I’m going to assume you already know how to build a BlackBerry Java application – there’s no time to dig into all of that before getting into the meat of this article. If you haven’t worked with the BlackBerry Java development tools then you should either buy my book (www.bbdevfundamentals.com) or spend some time on the BlackBerry Developer’s web site getting up to speed before continuing.