---
title: Domino & BlackBerry Java Applications - Part 2
description: 
date: 2009-09-13
headerImage: 
categories: [BlackBerry]
tags: post
---

## Introduction

In the previous installment in this series, I showed how to build a simple Domino Web Service that performed a lookup against a contact database built from the standard public Domino Directory template (pubnames.ntf)

## First a Little Background

I should probably explain that the BlackBerry Platform added support for JSR 172 with the release of BlackBerry Device Software 4.3. It's JSR 172, the [J2ME Web Services Specification](https://jcp.org/en/jsr/detail?id=172){target="_blank"}, which gives BlackBerry Java applications the ability to easily consume web services. You could do the work without using JSR 172, using something like [kSOAP 2](https://ksoap2.sourceforge.net/){target="_blank"}, but then you:

*   Wouldn't be using a standard
*   Would be relying upon an ancillary library to do the work
*   Would have a larger application to deploy since your application needs access to all those extra library classes

Anyway, if you ask about this topic on the BlackBerry forums, you'll receive responses that say JSR 172 is junk and you should use kSOAP 2 and others (like me) who will tell you it's pretty easy and you should just use the stuff baked into the BlackBerry platform. Use the stuff that's baked into the BlackBerry platform – it's going to be much easier for you all around.

So, the way this JSR 172 stuff works is you download the [Sun Java Wireless Toolkit for CLDC](https://java.sun.com/products/sjwtoolkit/){target="_blank"} and use a little utility that comes with it to analyze your web service's WSDL (web service description language) file and build a Java  stub class your Java application can call to consume the web service. Building the stub takes just a few minutes and calling the stub from your Java application is very easy as well.

## Getting Started

To get this process rolling, go to Sun's web site and download the Sun Java Wireless Toolkit for CLDC – the link is provided in the previous paragraph. After you have downloaded the package, run its installation program to install it on your local hard drive. As someone complained on the forums last week, it's a whole lot of stuff for that one little utility. Unfortunately that's true – the toolkit has a whole bunch of tools and utilities in it, we're only using a very small part of it. I don't know of any other way to get this to work than to just install the whole thing and live with it. After you install it, you'll find a folder for the toolkit off the root of your system's hard drive as shown in the following figure.

![Figure 1](/images/2009/dbja2-1.jpg)
Figure 1

Fortunately it also puts the shortcuts you need onto the Windows Start menu right where you expect them to be as shown in Figure 2.  
   
![Figure 2](/images/2009/dbja2-2.jpg)
Figure 2

## Generating the Java Stub

Now that you have the toolkit installed, it's time to build the Java stub you need to consume the service. For this part of the process, you must make sure that the database containing the web service is on a Domino server and the ACL is set correctly. You will also need to make sure that the Programming Model and SOAP Message format are set correctly in your web service. Refer to Figure 4 in the first installment in this series for information on how the service should be configured.  
To make sure your service is working, you should open the service's WSDL in the browser using the following URL:

```text
https://server-name/db-name.nsf/domdirlookup?wsdl
```

Be sure to use the correct server name, database file name and service name for your implementation of the service. For my test environment, the WSDL URL looks like this:

```text
https://jwargo1/bb\_names.nsf/domdirlookup?wsdl
```

When I paste this URL into the browser, I will see the following page (or something similar):  
   
![Figure 3](/images/2009/dbja2-3.jpg)
Figure 3

Note that some browsers such as Google Chrome don't know how to render WSDL files. When I opened the same URL in the Chrome browser, all I got was a blank page.

Once you have a working WSDL URL, you're ready to generate your stubs. In the Start menu folder for the Sun Java Wireless Toolkit (shown in Figure 2) select the 'Utilities' shortcut. Windows will open a screen similar to the one shown below:  
   
![Figure 4](/images/2009/dbja2-4.jpg)
Figure 4

Scroll down and select the item labeled 'Stub Generator' and click the 'Launch' button. The stub generator program will open as shown below:

![Figure 5](/images/2009/dbja2-5.jpg)
Figure 5

In the dialog, paste the Domino WSDL file URL into the 'WSDL Filename or URL' field on the form. You DO NOT want to navigate to a folder where you have exported the WSDL from the database – an exported WSDL does not contain the destination information the stub program will need to locate the server and database file name containing the web service. 

For the 'Output Path', specify a folder location on your hard drive where you want the stub class files created. For 'Output Package' specify the package name you want to use for the stub class. In this case, I'm saving the output to c:\dev\java and the program will create the necessary subfolders to match the output package (com.johnwargo.domdirlookup).  
   
![Figure 6](/images/2009/dbja2-6.jpg)
Figure 6

The program will gyrate for a few seconds and inform you that the process completed. When you open Windows Explorer and look at the output path, What you'll find is a complete folder structure shown below:  
   
![Figure 7](/images/2009/dbja2-7.jpg)
Figure 7

Notice that the stub files were created in c:\dev\java\com\johnwargo\domdirlookup – the concatenation of the output folder and the output package name.

What you have here are four class files that implement all of the technology you need to consume the web service described by the WSDL you passed to the Stub Generator. Let's tear into the files…

The USERLIST.java file contains the code that implements the UserList class (it's an array of string, remember?) that's returned by the web service when you pass in a search string and call the GetUserList method. All the stub generator does here is create the string array and the appropriate setters and getters for the class. Here's the code:

```java
// This class was generated by the JAXRPC SI, do not edit.  
// Contents subject to change without notice.  
// JSR-172 Reference Implementation wscompile 1.0, using: JAX-RPC Standard Implementation (1.1, build R59)  
  
package com.johnwargo.domdirlookup;  
  
public class USERLIST {  
    protected java.lang.String\[\] USERS;  
      
    public USERLIST() {  
    }  
      
    public USERLIST(java.lang.String\[\] USERS) {  
        this.USERS = USERS;  
    }  
      
    public java.lang.String\[\] getUSERS() {  
        return USERS;  
    }  
      
    public void setUSERS(java.lang.String\[\] USERS) {  
        this.USERS = USERS;  
    }  
}
```

The USERINFO.java file does the same thing, but for the UserInfo class defined in the web service. In this case, it's not as simple as a string array, it's a class that contains string values for each of the fields of the contact record (it's a person document, remember?) the web service returns when the GetUserInfo method is called and passed a contact name in the search string. It contains the class definition and the setters and getters for each of the fields we're returning for the selected contact name. Here's the code:

```java
// This class was generated by the JAXRPC SI, do not edit.  
// Contents subject to change without notice.  
// JSR-172 Reference Implementation wscompile 1.0, using: JAX-RPC Standard Implementation (1.1, build R59)  
  
package com.johnwargo.domdirlookup;  
  
public class USERINFO {  
    protected java.lang.String FIRSTNAME;  
    protected java.lang.String LASTNAME;  
    protected java.lang.String FULLNAME;  
    protected java.lang.String EMAILADDRESS;  
    protected java.lang.String OFFICEPHONE;  
    protected java.lang.String MOBILEPHONE;  
      
    public USERINFO() {  
    }  
      
    public USERINFO(java.lang.String FIRSTNAME, java.lang.String LASTNAME, java.lang.String FULLNAME, java.lang.String EMAILADDRESS, java.lang.String OFFICEPHONE, java.lang.String MOBILEPHONE) {  
        this.FIRSTNAME = FIRSTNAME;  
        this.LASTNAME = LASTNAME;  
        this.FULLNAME = FULLNAME;  
        this.EMAILADDRESS = EMAILADDRESS;  
        this.OFFICEPHONE = OFFICEPHONE;  
        this.MOBILEPHONE = MOBILEPHONE;  
    }  
      
    public java.lang.String getFIRSTNAME() {  
        return FIRSTNAME;  
    }  
      
    public void setFIRSTNAME(java.lang.String FIRSTNAME) {  
        this.FIRSTNAME = FIRSTNAME;  
    }  
      
    public java.lang.String getLASTNAME() {  
        return LASTNAME;  
    }  
      
    public void setLASTNAME(java.lang.String LASTNAME) {  
        this.LASTNAME = LASTNAME;  
    }  
      
    public java.lang.String getFULLNAME() {  
        return FULLNAME;  
    }  
      
    public void setFULLNAME(java.lang.String FULLNAME) {  
        this.FULLNAME = FULLNAME;  
    }  
      
    public java.lang.String getEMAILADDRESS() {  
        return EMAILADDRESS;  
    }  
      
    public void setEMAILADDRESS(java.lang.String EMAILADDRESS) {  
        this.EMAILADDRESS = EMAILADDRESS;  
    }  
      
    public java.lang.String getOFFICEPHONE() {  
        return OFFICEPHONE;  
    }  
      
    public void setOFFICEPHONE(java.lang.String OFFICEPHONE) {  
        this.OFFICEPHONE = OFFICEPHONE;  
    }  
      
    public java.lang.String getMOBILEPHONE() {  
        return MOBILEPHONE;  
    }  
      
    public void setMOBILEPHONE(java.lang.String MOBILEPHONE) {  
        this.MOBILEPHONE = MOBILEPHONE;  
    }  
}
```

The interface your Java program will use to consume the web service is defined in the DomDirLookup.java file.  The interface extends java.rim.Remote (which is how it can connect to the web service) and defines the two methods that are called by the Java application. It defines GetUserList and GetUserInfo – remember them? They're the two functions defined in the Domino web service we're calling. Here's the code:

```java
// This class was generated by 172 StubGenerator.  
// Contents subject to change without notice.  
// @generated  
  
package com.johnwargo.domdirlookup;  
  
public interface DomDirLookup extends java.rmi.Remote {  
  public java.lang.String\[\] GETUSERLIST(java.lang.String SEARCHSTR) throws java.rmi.RemoteException;  
  
  public com.johnwargo.domdirlookup.USERINFO GETUSERDETAILS(java.lang.String SEARCHSTR) throws java.rmi.RemoteException;  
  
}
```

The final file is called DomDirLookup\_Stub.java and it contains the implementation of the two methods defined in the DomDirLookup.java file. This is where all of the work is done to connect to the Domino server and consume the web service. Here's the code:

```java
// This class was generated by 172 StubGenerator.  
// Contents subject to change without notice.  
// @generated  
  
package com.johnwargo.domdirlookup;  
  
import javax.xml.rpc.JAXRPCException;  
import javax.xml.namespace.QName;  
import javax.microedition.xml.rpc.Operation;  
import javax.microedition.xml.rpc.Type;  
import javax.microedition.xml.rpc.ComplexType;  
import javax.microedition.xml.rpc.Element;  
  
public class DomDirLookup\_Stub implements com.johnwargo.domdirlookup.DomDirLookup, javax.xml.rpc.Stub {  
  private String\[\] \_propertyNames;  
  private Object\[\] \_propertyValues;  
  
  public DomDirLookup\_Stub() {  
    \_propertyNames = new String\[\] {ENDPOINT\_ADDRESS\_PROPERTY};  
    \_propertyValues = new Object\[\] {"https://jwargo1:80/bb\_names.nsf/domdirlookup?OpenWebService"};  
  }  
  
  public void \_setProperty(String name, Object value) {  
    int size = \_propertyNames.length;  
    for (int i = 0; i < size; ++i) {  
      if (\_propertyNames\[i\].equals(name)) {  
        \_propertyValues\[i\] = value;  
        return;  
      }  
    }  
    // Need to expand our array for a new property  
    String\[\] newPropNames = new String\[size + 1\];  
    System.arraycopy(\_propertyNames, 0, newPropNames, 0, size);  
    \_propertyNames = newPropNames;  
    Object\[\] newPropValues = new Object\[size + 1\];  
    System.arraycopy(\_propertyValues, 0, newPropValues, 0, size);  
    \_propertyValues = newPropValues;  
  
    \_propertyNames\[size\] = name;  
    \_propertyValues\[size\] = value;  
  }  
  
  public Object \_getProperty(String name) {  
    for (int i = 0; i < \_propertyNames.length; ++i) {  
      if (\_propertyNames\[i\].equals(name)) {  
        return \_propertyValues\[i\];  
      }  
    }  
    if (ENDPOINT\_ADDRESS\_PROPERTY.equals(name) || USERNAME\_PROPERTY.equals(name) || PASSWORD\_PROPERTY.equals(name)) {  
      return null;  
    }  
    if (SESSION\_MAINTAIN\_PROPERTY.equals(name)) {  
      return new java.lang.Boolean(false);  
    }  
    throw new JAXRPCException("Stub does not recognize property: "+name);  
  }  
  
  protected void \_prepOperation(Operation op) {  
    for (int i = 0; i < \_propertyNames.length; ++i) {  
      op.setProperty(\_propertyNames\[i\], \_propertyValues\[i\].toString());  
    }  
  }  
  
  //  
  //  Begin user methods  
  //  
  
  public java.lang.String\[\] GETUSERLIST(java.lang.String SEARCHSTR) throws java.rmi.RemoteException {  
    // Copy the incoming values into an Object array if needed.  
  
    Operation op = Operation.newInstance(\_qname\_GETUSERLIST, \_type\_SEARCHSTR, \_type\_GETUSERLISTReturn);  
    \_prepOperation(op);  
    op.setProperty(Operation.SOAPACTION\_URI\_PROPERTY, "GETUSERLIST");  
    Object resultObj;  
    try {  
      resultObj = op.invoke(SEARCHSTR);  
    } catch (JAXRPCException e) {  
      Throwable cause = e.getLinkedCause();  
      if (cause instanceof java.rmi.RemoteException) {  
        throw (java.rmi.RemoteException) cause;  
      }  
      throw e;  
    }  
    java.lang.String\[\] result;  
    // Convert the result into the right Java type.  
    // Unwrapped return value  
    Object USERSObj = ((Object\[\])resultObj)\[0\];  
    // Even if return type of remote method is String\[\],  
    // Object\[\] is expected according to the spec.  
    Object\[\] USERSObjArray = (Object\[\]) USERSObj;  
    result = new java.lang.String\[USERSObjArray.length\];  
    java.lang.System.arraycopy(USERSObjArray, 0, result, 0, USERSObjArray.length);  
    return result;  
  }  
  
  public com.johnwargo.domdirlookup.USERINFO GETUSERDETAILS(java.lang.String SEARCHSTR) throws java.rmi.RemoteException {  
    // Copy the incoming values into an Object array if needed.  
  
    Operation op = Operation.newInstance(\_qname\_GETUSERDETAILS, \_type\_SEARCHSTR, \_type\_GETUSERDETAILSReturn);  
    \_prepOperation(op);  
    op.setProperty(Operation.SOAPACTION\_URI\_PROPERTY, "GETUSERDETAILS");  
    Object resultObj;  
    try {  
      resultObj = op.invoke(SEARCHSTR);  
    } catch (JAXRPCException e) {  
      Throwable cause = e.getLinkedCause();  
      if (cause instanceof java.rmi.RemoteException) {  
        throw (java.rmi.RemoteException) cause;  
      }  
      throw e;  
    }  
    com.johnwargo.domdirlookup.USERINFO result;  
    // Convert the result into the right Java type.  
    if (resultObj == null) {  
      result = null;  
    } else {  
      result = new com.johnwargo.domdirlookup.USERINFO();  
      java.lang.String string;  
      Object FIRSTNAMEObj = ((Object\[\])resultObj)\[0\];  
      string = (java.lang.String)FIRSTNAMEObj;  
      result.setFIRSTNAME(string);  
      java.lang.String string2;  
      Object LASTNAMEObj = ((Object\[\])resultObj)\[1\];  
      string2 = (java.lang.String)LASTNAMEObj;  
      result.setLASTNAME(string2);  
      java.lang.String string3;  
      Object FULLNAMEObj = ((Object\[\])resultObj)\[2\];  
      string3 = (java.lang.String)FULLNAMEObj;  
      result.setFULLNAME(string3);  
      java.lang.String string4;  
      Object EMAILADDRESSObj = ((Object\[\])resultObj)\[3\];  
      string4 = (java.lang.String)EMAILADDRESSObj;  
      result.setEMAILADDRESS(string4);  
      java.lang.String string5;  
      Object OFFICEPHONEObj = ((Object\[\])resultObj)\[4\];  
      string5 = (java.lang.String)OFFICEPHONEObj;  
      result.setOFFICEPHONE(string5);  
      java.lang.String string6;  
      Object MOBILEPHONEObj = ((Object\[\])resultObj)\[5\];  
      string6 = (java.lang.String)MOBILEPHONEObj;  
      result.setMOBILEPHONE(string6);  
    }  
    return result;  
  }  
  //  
  //  End user methods  
  //  
  
  protected static final QName \_qname\_EMAILADDRESS = new QName("", "EMAILADDRESS");  
  protected static final QName \_qname\_FIRSTNAME = new QName("", "FIRSTNAME");  
  protected static final QName \_qname\_FULLNAME = new QName("", "FULLNAME");  
  protected static final QName \_qname\_LASTNAME = new QName("", "LASTNAME");  
  protected static final QName \_qname\_MOBILEPHONE = new QName("", "MOBILEPHONE");  
  protected static final QName \_qname\_OFFICEPHONE = new QName("", "OFFICEPHONE");  
  protected static final QName \_qname\_USERS = new QName("", "USERS");  
  protected static final QName \_qname\_GETUSERDETAILS = new QName("urn:DefaultNamespace", "GETUSERDETAILS");  
  protected static final QName \_qname\_GETUSERDETAILSReturn = new QName("urn:DefaultNamespace", "GETUSERDETAILSReturn");  
  protected static final QName \_qname\_GETUSERLIST = new QName("urn:DefaultNamespace", "GETUSERLIST");  
  protected static final QName \_qname\_GETUSERLISTReturn = new QName("urn:DefaultNamespace", "GETUSERLISTReturn");  
  protected static final QName \_qname\_SEARCHSTR = new QName("urn:DefaultNamespace", "SEARCHSTR");  
  protected static final Element \_type\_SEARCHSTR;  
  protected static final Element \_type\_GETUSERLISTReturn;  
  protected static final Element \_type\_GETUSERDETAILSReturn;  
  static {  
    // Create all of the Type's that this stub uses, once.  
    \_type\_SEARCHSTR = new Element(\_qname\_SEARCHSTR, Type.STRING);  
    Element \_type\_USERS;  
    \_type\_USERS = new Element(\_qname\_USERS, Type.STRING, 0, -1, false);  
    ComplexType \_complexType\_USERLIST;  
    \_complexType\_USERLIST = new ComplexType();  
    \_complexType\_USERLIST.elements = new Element\[1\];  
    \_complexType\_USERLIST.elements\[0\] = \_type\_USERS;  
    \_type\_GETUSERLISTReturn = new Element(\_qname\_GETUSERLISTReturn, \_complexType\_USERLIST);  
    Element \_type\_FIRSTNAME;  
    \_type\_FIRSTNAME = new Element(\_qname\_FIRSTNAME, Type.STRING);  
    Element \_type\_LASTNAME;  
    \_type\_LASTNAME = new Element(\_qname\_LASTNAME, Type.STRING);  
    Element \_type\_FULLNAME;  
    \_type\_FULLNAME = new Element(\_qname\_FULLNAME, Type.STRING);  
    Element \_type\_EMAILADDRESS;  
    \_type\_EMAILADDRESS = new Element(\_qname\_EMAILADDRESS, Type.STRING);  
    Element \_type\_OFFICEPHONE;  
    \_type\_OFFICEPHONE = new Element(\_qname\_OFFICEPHONE, Type.STRING);  
    Element \_type\_MOBILEPHONE;  
    \_type\_MOBILEPHONE = new Element(\_qname\_MOBILEPHONE, Type.STRING);  
    ComplexType \_complexType\_USERINFO;  
    \_complexType\_USERINFO = new ComplexType();  
    \_complexType\_USERINFO.elements = new Element\[6\];  
    \_complexType\_USERINFO.elements\[0\] = \_type\_FIRSTNAME;  
    \_complexType\_USERINFO.elements\[1\] = \_type\_LASTNAME;  
    \_complexType\_USERINFO.elements\[2\] = \_type\_FULLNAME;  
    \_complexType\_USERINFO.elements\[3\] = \_type\_EMAILADDRESS;  
    \_complexType\_USERINFO.elements\[4\] = \_type\_OFFICEPHONE;  
    \_complexType\_USERINFO.elements\[5\] = \_type\_MOBILEPHONE;  
    \_type\_GETUSERDETAILSReturn = new Element(\_qname\_GETUSERDETAILSReturn, \_complexType\_USERINFO);  
  }  
  
}
```
  
I'm not going to explain everything that's happening in the code – the easiest thing to do is assume it works and ignore the details. However, if you're like me and you have a bunch of spare time on your hands it would probably be fun to dig through the code to see what it's doing.  As far as we're concerned, it's a black box we're going to use to provide the plumbing we need to talk to the service.

## In the Next Installment

In the next installment in this series I'll demonstrate how to write the Java application that talks to the Domino Web Service.

Here are links to all of the articles in the series:

* [Domino & BlackBerry Java Applications - Part 1](/posts/2009/domino-&-blackberry-java-applications-part-1/)
* [Domino & BlackBerry Java Applications - Part 2](/posts/2009/domino-&-blackberry-java-applications-part-2/)
* [Domino & BlackBerry Java Applications Part 2.5](/posts/2009/domino-&-blackberry-java-applications-part-2.5/)
* [Domino & BlackBerry Java Applications Part 3](/posts/2009/domino-&-blackberry-java-applications-part-3/)